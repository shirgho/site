# Unions

https://en.cppreference.com/w/cpp/language/union

- A special class type that can only hold one of its non-static data members at a time. 
- Union is only as big as necessary to hold its largest data member.

# Variants

- std::variant is a class template that represents a type-safe union.
- That means, at a certain point in time, one type of the possibly many types in the variant/union is defined/used. 
- So it can let you use a variable like you use them in dynamically typed languages.

## Variants Examples

### State Machines

Very nice description of how to use variants instread of enum unions to make more customised state machines: https://www.cppstories.com/2019/06/fsm-variant-game/

### Godot Game Engine

https://docs.godotengine.org/en/stable/development/cpp/variant_class.html

So, variants are used everywhere in Godot. Not for storing data permenantly, but to hold them for communication, editing, serialization and generally moving them around in a generic container instead of statically typing everything.

HOWEVER, they don't use the std::variant, but use a class made up of enums.
