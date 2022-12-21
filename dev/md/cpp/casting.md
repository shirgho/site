# Casts

Casting a spell. Casting a void* pointer to an int* pointer. Same thing?

Many types of casts of course. No simple scene.

## "normal" casts

## static_cast

preserves the address when casting from one pointer type to another.

int* a = new int();
void* b = static_cast<void*>(a);
int* c = static_cast<int*>(b);

all pointers hold the same memory address.


## reinterpret_cast

guess should only be used when you don't know the details of some opaque class you have to work with. So you reinterpret your objects to the opaque class so functions can work with your actually different object, and then reinterpret_cast it back to work with your own object again.

To be honest, I don't really get the difference.


# References
https://stackoverflow.com/questions/573294/when-to-use-reinterpret-cast