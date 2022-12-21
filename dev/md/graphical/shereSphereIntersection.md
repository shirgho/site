# Sphere Sphere Intersection

The intersection of two spheres would be a circle, or a curve. (The intersection of two circles would be a line.)
A nice formulation I found and understood, and one that follows nicely in code as well is:

We have two spheres, with centres (c_1 and c_2) and radius (r_1 and r_2). We say that their intersection has the centre c_i and r_i. 

First, we check if the spheres are placed in a way that intersection is not logically possible:

Distance between the spheres: d = ||c_2 - c_1||

So,  if r_1 + r_2 < d, then it cannot possibly be intersecting, as it has some separation between the spheres.

If r_1 + r_2 == d, then intersection is a single point, c_i = c_1 + (c_2 - c_1) * r_1/d.

If one sphere is bigger than the other, it is possible that one sphere is inside the other, but I leave the formulation out for this for now.

Our intersecting point c_is defined as  c_1 + h * (c_2 - c_1). (where h is some constant). Now we express r_1 and r_2 in terms of r_i, h and d using Pythagorean Theorem (we find the triangle that the intersection makes here), then solve the system of equations:

(h*d)² + r_i² = r_i² | ((1-h)*d²) + r_i² = r_2²
h² * d² - r_1² = -r_i² | (1 - 2*h + h²) * d² - r_2² = -r_i²

which gives us  h = 1/2 + (r_1 * r_1 - r_2 * r_2)/(2 * d*d)

Subbing this back into our earlier formula for c_i gives us the center of the circle of intersection. Then we can find the radius of the intersecting circle by r_i = sqrt(r_1*r_1 - h*h*d*d).

Now we use this radius and center to get our full circle of solutions, which lies in a plane perpendicular to the separating axis. We can take n_i = (c_2 - c_1)/d as the normal to this plane, and then further locate a point on this circle by choosing a tangent and bitangent perpendicular to this normal. 

p_i(theta) = c_i + r_i * (t_i * cos(theta) + b_i sin(theta))

Reference:
https://stackoverflow.com/questions/3349125/circle-circle-intersection-points
https://gamedev.stackexchange.com/questions/75756/sphere-sphere-intersection-and-circle-sphere-intersection
https://archive.lib.msu.edu/crcmath/math/math/c/c308.htm
https://archive.lib.msu.edu/crcmath/math/math/s/s563.htm
