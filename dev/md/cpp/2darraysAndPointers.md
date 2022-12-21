# Pointer to Pointers and 2d Arrays (and where do 2d vectors fit in)

Well, it's been a long time but I still get confused with basic stuff like this.
I think one just forgets the little details. Or everything.


## Pointers
So.

A pointer is a variable that holds a memory address.

int a = 5;

int* b = &a;

means b now points to a. We can get the value of a by dereferencing b.

cout << *b would be 5.

cout << b would be 0x92038427340 something. I.e. the memory address.

This is clear to me. 

## Pointers to pointers

Now

int** c = &b;

Here we need a double pointer. No, scratch that. A double pointer would be a pointer to a double.

Here we need a pointer to a pointer. c should hold a memory address of a variable that itself holds the memory address of another variable.

I guess we could also technically do int* c = &b. Because in the end, we want to store a memory address, and a pointer will let us do that.

However, then when we dereference c, we would just get the memory address of a. As this is the value stored at the memory address b. We can't access the
value of a until we dereference twice. And here I guess we need the pointer to a pointer.

Fine.

## 1D and 2D arrays

But how do c style arrays fit in here? And are things different for std::arrays, and for vectors? 

Yes. Because why would anyone want to make life easier. Why. That would mean we would have a lot more time to face life itself. No, no. We must distract ourselves by writing a 2000 page specification for a programmming language, which ensures that until we die, we will have plenty of material to keep ourselves busy in just trying to make sense of it.

### 1D array

int a[5]; // created an array of ints of length 5.

a[0] = 1; 

this is ok. We are assigning the value one at the int variable at a[0]. 

the name of our array, a, is viewed as a pointer to the first element of the array. We can get the value at this pointer by either doing a[0], or dereferencing pointers the non array way i.e. *(a+0) or just *a.

a[1] === *(a+1)

So don't need to add & to the a etc, a is already a pointer.

### 2D array

Now, a 2D array is also actually just an array of elements. I.e. a contiguous block of elements. It's not like it's actually arranged in memory like a 2d array:

``` code
0,0 0,1 0,2
1,0 1,1 1,2
2,0 2,1 2,2
```

No. It's still like:

``` code
0,0 0,1 0,2 1,0 1,1 1,2 2,0 2,1 2,2
```

So I guess it's just an abstraction to make our lives easier when trying to think about organising the elements and accessing the elements from the 2d array. Right? 

So my question is:

If so, we should be able to access a 2d array like a 1d array as well?
Or if not, because of language rules of working with 2d arrays, we should at least be able to convert a 2d array back to a 1d array, and then iterate/access over it like a 1d array, no?

Well, first going back to the definition of a 2d array. Yes, it's just an array.

But actually, it's better to say that it as an array of 1d arrays. Or atleast viewed this way. That is, each row (m), is a 1d array.

int A[m][n];

A[0] is address of row 0.

To find A[0][2], we could also do *(A[0] + 2).

In general, A[i][j] === *(A[i] + j);

So A[0] is again, *(A), like above in our 1d case.

So A[i][j] === *(*(A+i) + j);

So in the 2d array case, A is still a pointer, but actually, it is a pointer to a pointer. We are dereferencing twice to extract the value that is linked to A. The first dereference gives us another memory address(the address of row 0 e.g., or A[0], which gives us an int* pointer), and then a dereference (after or without some moving around arithmetically) gives us the actual value we want to access when we do A[i][j].

So it's an int** A variable that holds the start to the block of the 2d array.

a 1D int array can be thought of as const int*

a 2D int array can be thought of as const int**

#### Fixed Dimensions for 2d arrays??
Also, usually for 2d arrays, the sizes of the dimensions must be fixed at compile time. Or in some cases, one dimension. Or also can do without them in some way or the other.

Bit confusing.

### Array to Pointer decay

In the 1d case, and array and pointers can be used quite interchangebly. The compiler understands this, and converts between the syntaxes etc. Decays arrays to pointers.

This also extends to 2d arrays, however, NOT implicitely.

So T** pointer_to_pointer = T[i][j] Does not work! At least, not automatically.



```
int T[6][7];

int** p = new int*[6]; // p holds address of an array of length 6 of int pointers.

for (int i = 0; i < 6; i++ ){
    p[i] = T[i];
    // or *(p + i) = *(*(t + i) + 0)
}

delete[] p;

```

## Assignment

Arrays can't be assigned to each other.
Have to manually loop over and assign indiviual variables.

Or use std::copy.








# References

https://www.cs.cmu.edu/~ab/15-123S09/lectures/Lecture%2006%20-%20%20Pointer%20to%20a%20pointer.pdf

https://stackoverflow.com/questions/4810664/how-do-i-use-arrays-in-c