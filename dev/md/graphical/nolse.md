# Shaders

Shaders are the equivilant of the Gutenberg press for graphics.

They are small programs, but the intructions in those programs are exectued all at once for every single pixel on the screen. So the code has to behave differently depending on the position of the pixel on the screen.

This can be done because shaders run on the GPU, which can be thought of as consisting of many many small tiny microprocessers running in parallel, instead of just the 4 or 16 cores/threads in a modern CPU. So all these pixels are input in parallely to these tiny chips of the GPU, which also have the added advantage of special hardware powered math functions that work blazinfly fast with floats.

However, is hard, because every pixel is kind of like it's own thread in a shader/GPU. They are independant from other threads, blind. Cannot check results of other threads, don't even know what the other threads are doing.

They are also memoryless, as soon as they are free, they get another task and pixel to work with. Do not know what they worked on before or what they will work on next.


## Changing colour coordinates with mouse coordinates

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 mc = u_mouse.xy/u_resolution;

	//gl_FragColor = vec4(st.x,st.y,0.0,1.0);
    gl_FragColor = vec4(mc.x,mc.y,0.0,1.0);
}


The gl_FragCoord (0.0,0.0) is at the bottom left of the screen, where you'd expect 0,0 to be. It's black. 1.0,1.0 is at the top right, yellow. 0.0, 1.0 is top left, green, and 1.0,0.0 is bottom right, red.
 
## Noise

Noise is randomness, fluctuations. Is noise. Is nice? Is noice. Sometimes.
If you want it.

## Gradient noise

- commonly used as a procedural texture primitve in computer graphics.
- not the same as value noise
- creation of a lattice of random/pseudorandom gradients, dot products of which are then interpolated to obtain values in between the lattices. 
- first implementation was Perlin noise, credited to ken Perlin.
- later devs were Simplex noise/OpenSimplex noise

### Extending 2d gradient noise to 3d

To apply randomness to two dimensions, we need to transform a two dimensional vector into a one dimensional floating point value. (for example, using the dot product gives us a single float from the coordinates of two dimensional vector).

