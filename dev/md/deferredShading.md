# Deferred shading

is a screen-space shading technique performed on a second rendering pass, after the vertex and pixel shaders are rendered. 
On first pass of deferred shader, only data required for shading computation is gathered. Positions, normals, and materals for each surface are rendered into geometry buffer using render to texture.
After this, a pixel shader computes the direct and indirect lighting at each pixel using the information of the texture buffers in screen space.

## Advantages

Primary advantage is the decoupling of scene geometry from lighting. Only one geometry pass is requried, and each light is only computed for those pixels that it actually affects. This gives the ability to render many lights in a scene without a significant performance hit. There are some other advantages claimed for the approach. These advantages may include simpler management of complex lighting resources, ease of managing other complex shader resources, and the simplification of the software rendering pipeline. 

## Disadvantages

- One key disadvantage of deferred rendering is the inability to handle transparency within the algorithm, although this problem is a generic one in Z-buffered scenes and it tends to be handled by delaying and sorting the rendering of transparent portions of the scene.

- Another serious disadvantage is the difficulty with using multiple materials. It's possible to use many different materials, but it requires more data to be stored in the G-buffer, which is already quite large and takes up a large amount of the memory bandwidth.

- One more disadvantage is that, due to separating the lighting stage from the geometric stage, hardware anti-aliasing does not produce correct results anymore since interpolated subsamples would result in nonsensical position, normal, and tangent attributes. One of the usual techniques to overcome this limitation is using edge detection on the final image and then applying blur over the edges,[8] however recently more advanced post-process edge-smoothing techniques have been developed.

# Deferred lighting

Deferred lighting (also known as Light Pre-Pass) is a modification of the Deferred Shading. This technique uses three passes, instead of two in deferred shading. On first pass over the scene geometry, only normals and specular spread factor are written to the color buffer. The screen-space, “deferred” pass then accumulates diffuse and specular lighting data separately, so a last pass must be made over the scene geometry to output final image with per-pixel shading. The apparent advantage of deferred lighting is a dramatic reduction in the size of the G-Buffer. The obvious cost is the need to render the scene geometry twice instead of once. An additional cost is that the deferred pass in deferred lighting must output diffuse and specular irradiance separately, whereas the deferred pass in deferred shading need only output a single combined radiance value.

Due to reduction of the size of the G-buffer this technique can partially overcome one serious disadvantage of the deferred shading - multiple materials. Another problem that can be solved is MSAA. Deferred lighting can be used with MSAA on DirectX 9 hardware.

## Drawbacks

- that it can take a lot of memory, especially with higher resolution outputs. If you’re rendering at 4K then the G buffer will suddenly be 236MB.

- The second and largest issue is that there’s no way to do transparency unless you store a deep G buffer with data for multiple fragments per pixel which makes the memory situation far worse. Most engines just do a forward pass after the deferred pass to render all of the transparent geometry, but it’s harder to shade the transparent geometry efficiently.

- Another issue is that it’s difficult to change the shading model on geometry, so if you want to shade most of the level using a standard microfacet BRDF, then render some characters with a subsurface scattering effect on their skin, then render their eyes, then render some cars with clearcoat surfaces it’s not going to work using just basic deferred shading. With these situations I’ve seen engines do one of two things; some go and build the shading model into the tiled differed shader and dynamic branch between the models depending on a value from the G buffer, other go and do a forward rendering pass with the alternate shading model.

- The final significant issue is that it’s difficult to do good quality anti-aliasing with decent performance. Most engines that use deferred shading pipelines use FXAA or some other screen space anti-aliasing solution. The problem with FXAA is that it can tend to blur details that shouldn’t be blurred. It is possible to do MSAA with deferred shading by rendering to a buffer with storage for multiple samples, and then finding the edges of objects in the G buffer and executing shading for all samples on the edges. However, this has a more significant performance hit with deferred shading than it does with forward shading because of the additional texture sampling.

## Myths from incorrect practices

- the current generation of games tries to load-balance most of the lighting work between the vertex and pixel pipelines.

When all the calculations are performed at pixel level (this is the only possible way to go with deferred shading), performance will be similar, because lighting pixel shaders for deferred renderers are not that much more complicated than those for forward renderers. The only added work is G-buffer sampling and, possibly, unpacking. But your application is much less likely to become bottlenecked by the CPU or the vertex pipe.

- Because deferred renderers process each object only once, conventional techniques for handling multiple material types (such as changing shaders per-object) do not translate well.

- However, by using DirectX 9 multiple render targets (MRT), we can render up to 16 material attributes during the G-buffer creation phase (four render targets of four floating-point numbers each). Ten are used to perform basic diffuse and specular lighting (three each for albedo, normal, and position, plus one for gloss), but this leaves six components for controlling the lighting functions. In S.T.A.L.K.E.R., we stored material and object IDs in the spare components and defined functions in each light shader (accelerated using 2D and 3D texture lookup tables) that depended on these values. This freed us from a specific material reflection model, while also allowing us to define a huge number of light shader primitives without the combinatorial increase in the number of shaders that affects forward renderers.

- This approach can be considered an inversion of the shaders in forward renderers: instead of using light properties to modify material shaders, we used material properties to modify light shaders. By adapting our material system to take advantage of the benefits of deferred shading and using textures to efficiently avoid some of the limitations, we created a deferred rendering engine in which the only limits on the types of materials were the artists' and programmers' imaginations.


## Optmisiations

- potentially restricted material system
- the lack of antialiasing

Given the structure of a deferred renderer, the obvious places that are likely to be performance bottlenecks are deferring, lighting, and post-processing.

- Because one of the primary features of the second renderer is real-time shadowing, shadow creation was a significant bottleneck; in fact, in some scenes it turned out to be the largest individual bottleneck. Given this, our optimization goals were obvious:

    Limit the number of lights drawn to just those that affect the rendered image.
    Convert shadow-casting lights to unshadowed lights where possible.
    Simplify the lighting shaders as much as possible.
    Optimize post-processing and deferring passes, but not at the expense of quality.

- The most important optimization for the lighting pass is to render only those lights that actually affect the final image, and for those lights, render only the affected pixels

For S.T.A.L.K.E.R., we used a hierarchical occlusion-culling system that utilized both the CPU and the GPU. Our coarsest test was sector-portal culling followed by CPU-based occlusion culling (similar to the hierarchical z-buffer [Greene et al. 1993]). In a typical closed-space frame, this reduced the number of lights by up to 30 to 50 percent. Then we used DirectX 9's occlusion query to eliminate the completely occluded lights. Finally, we used a stencil mask to tag affected pixels for each light. All together, these culling optimizations resulted in a twofold or even larger performance increase.

Even with perfect culling, though, lighting is still the most expensive aspect of a deferred renderer. Therefore, it is important to make sure that the shaders and artistic properties of the light sources are optimized as much as possible.

    Does the light need to cast shadows?

    – Many lights are needed only to mimic a global illumination-style look, and shadows just ruin the illusion.

    Does the light need a projective image?

    – If so, maybe the projection is the same as the shadow-map projection (which saves a few dp4s)?

    Does the light need to cast shadows from translucent surfaces? See Figure 9-3.
    09_deferred_shading_03.jpg

    Figure 9-3 Cast Shadows from Translucent Objects

    – If so, are there any translucent surfaces that exist in the light's frustum?

    – If both projective image and translucent color-modifier are required, maybe we can combine them into one image?

    Does the light need to contribute to glossy specular reflection?

    – Many lights in S.T.A.L.K.E.R. were added to mimic global illumination. For these lights, we used very simple diffuse-only lighting.

    Does the light move?

    – If it doesn't, we precomputed shadow-caster visibility to make shadow generation more efficient, by incrementally testing visibility for primitives that are found to be static to each other in a particular light configuration, thus forming a conservative potentially visible set (PVS) with a set of rules that can invalidate parts of it.

- Optimising single point directional lights, such as the sun.

- G-Buffer-Creation Optimisations



## References

https://developer.nvidia.com/gpugems/gpugems2/part-ii-shading-lighting-and-shadows/chapter-9-deferred-shading-stalker
https://leifnode.com/2015/05/tiled-deferred-shading/