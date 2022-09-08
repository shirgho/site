# Skeletal Animations

https://vladh.net/game-engine-skeletal-animation

Skeletal animation basically means a model has a set of bones alongside its regular vertex data. Each vertex can be influences by one or many bones. So when you move the bones around, the vertices linked to them also move around.

Is cool, is untuitive, but also expensive?
Because need to send a transformation matrix to the GPU for each bone each frame.
So each model will have a lot of bones, and a lot of models together make up a lot of bone animations

## How it works

- all animation data is relative to bind pose (funny looking T shaped position)
- Animation is basically set of keyframes that tell us how to transform each point for a set of keyframes. So at t=0.0 we’ll be in bind pose, at t = 0.2 we’ll move around a little bit, at t=0.4 we’ll move a little bit more, and so on.


## Structuring

Better and easier to have the bone data in an array than a tree, as traversing and remembering where you are in tree is harder, and also more difficult for CPU to cache data.

## Compressing

### Quantization
- process of contraining values from a continuous set of possibilities to a relatively small discrete set.
- Skeletal animations have position, rotation and scale data
- can easily quantize 3-d vectors for pos and scale by getting min/max range and uniformly partitioning across that range.
- (As described by riot games article) Quaternions, usually stored as floating point numbers requiring 100 bits or more, can be reduced to half the number of bits if we assume/convert to unit quaternions, and discard the largest component of the quat (by knowing we can get it back due to the rule x² + y² + z² + w² = 1). So each component of the quat can fit in 15 bits, instead of storing each component in a full float.

### Curve Fitting
if there is a key for each time position for each bone, and the animation tracks are exported at 30 fps. Instead of using each key and each time pos, we can use an approximation, and we can get a good enough approximation by fitting our data points to match around a curve/spline. 

There are many types of splines we could fit or match the data around. In my company, we approximate the lane changing of an object vehicle in our simulations by using a very basic spline curve, using the start and end positions of the object, a middle point, and then two middle points on either side.

In the riot games article linked below, they use Catmull-Romsplines, begin by choosing two keyframes that comprise the start and end of the animation, and then add more keyframes iteratively by identifying the section between keyframes with the largest error, and inserting the associated keyframe at this point. They compress 661 original frames to 90 frames after 88 iterations. 

So we can save a lot of memory in this way. However, all this has to be done in a pre processing stage, not at loadtime, as the memory saving in turn costs processing time.
