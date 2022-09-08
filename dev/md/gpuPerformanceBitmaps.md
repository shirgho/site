# GPU Draw calls

- To display a mesh, the CPU issues a draw call which is simply a series of commands that tells the GPU what to draw and how to draw it. As the draw call goes through the GPU pipeline, it uses the various configurable settings specified in the draw call – mostly determined by the mesh’s material and its parameters – to decide how the mesh is rendered. These settings, called GPU state, affect all aspects of rendering, and consist of everything the GPU needs to know in order to render an object. Most significantly for us, GPU state includes the current vertex/index buffers, the current vertex/pixel shader programs, and all the shader inputs (eg. MaterialTexture or LightColor in the above shader code example).

- This means that to change a piece of GPU state (for example changing a texture or switching shaders), a new draw call must be issued. This matters because these draw calls are not free for the CPU. It costs a certain amount of time to set up the desired GPU state changes and then issue the draw call. Beyond whatever work the game engine needs to do for each call, extra error checking and bookkeeping cost is introduced by the graphics driver, an intermediate layer of code written by the GPU vendor (NVIDIA, AMD etc.) that translates the draw call into low-level hardware instructions. Too many draw calls can put too much of a burden on the CPU and cause serious performance problems.

- In practice, a very common source of state change – and therefore extra draw calls – is switching texture maps. Typically the whole mesh will use the same material (and therefore the same shaders), but different parts of the mesh will use different sets of albedo/normal/roughness maps. With a scene of hundreds or even thousands of objects, using many draw calls for each object will cost a considerable amount of CPU time and so will have a noticeable impact on the framerate of the game.

- To avoid this, a common solution is to combine all the different texture maps used on a mesh into a single big texture, often called an atlas. The UVs of the mesh are then adjusted to look up the right part of the atlas, and the entire mesh (or even multiple meshes) can be rendered in a single draw call. Care must be taken when constructing the atlas so that adjacent textures don’t bleed into each other at lower mips, but these problems are relatively minor compared to the gains that can be had in terms of performance.

## Common GPU bottlenecks

- The very first step in optimization is to identify the current bottleneck so you can take steps to reduce or eliminate it. A bottleneck refers to the section of the pipeline that is slowing everything else down.

