# Const

Const. As in constant. 

As in a keyword, that marks our variables and others types as a constant something.

It can get messy and confusing with all the consts everywhere. But in the end, it's not that bad. I think. It's bad, but it might be worse without it.

Suppose we want to pass a pointer to a function.
We do this because we want the function to directly change the value of the variable pointed to by the pointer, right?

Wrong. We don't know why we're doing this, and now that we're doing this, we are scared, and we don't want the function to actually change the value, we just want it to be accesible, but not changable.

int foo(const int* ptr){
    // *ptr cannot be changed
}

int foo(int* const ptr){
    // ptr cannot be changed
}

int foo(const int* const ptr){
    // *ptr and ptr cannot be changed
}

So, do you get it? We can make the value (i.e. the memory address) at ptr to be const, or can make the dereferenced value pointed to in ptr to be const, or we can make both const.

Can make the entire world const, if you want to.

Can have const functions
