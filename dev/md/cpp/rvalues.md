# rvalues (and lvalues)

References: 
[] https://devblogs.microsoft.com/cppblog/rvalue-references-c0x-features-in-vc10-part-2/
[] https://www.artima.com/articles/a-brief-introduction-to-rvalue-references
[] Effective Modern C++ by Scot Meyers

## Definition

C++03 3.10/1 says: “Every expression is either an lvalue or an rvalue.”  It’s important to remember that lvalueness versus rvalueness is a property of expressions, not of objects.

Lvalues name objects that persist beyond a single expression.  For example, obj , *ptr , ptr[index] , and ++x are all lvalues.

Rvalues are temporaries that evaporate at the end of the full-expression in which they live (“at the semicolon”).  For example, 1729 , x + y , std::string(“meow”) , and x++ are all rvalues.

C++11’s most pervasive feature is probably move semantics, and the foundation of
move semantics is distinguishing expressions that are rvalues from those that are lval‐
ues. That’s because rvalues indicate objects eligible for move operations, while lvalues
generally don’t. In concept (though not always in practice), rvalues correspond to
temporary objects returned from functions, while lvalues correspond to objects you
can refer to, either by name or by following a pointer or lvalue reference.

To confuse me further:

A useful heuristic to determine whether an expression is an lvalue is to ask if you can
take its address. If you can, it typically is. If you can’t, it’s usually an rvalue. A nice feature of this heuristic is that it helps you remember that the type of an expression is
independent of whether the expression is an lvalue or an rvalue. That is, given a type
T, you can have lvalues of type T as well as rvalues of type T. It’s especially important
to remember this when dealing with a parameter of rvalue reference type, because the
parameter itself is an lvalue:

```C++
class Widget {
public:
    Widget(Widget&& rhs); // rhs is an lvalue, though it has an rvalue reference type
};
```

Here, it’d be perfectly valid to take rhs’s address inside Widget’s move constructor,
so rhs is an lvalue, even though its type is an rvalue reference. (By similar reasoning,
all parameters are lvalues.)


### Difference between ++x and x++

int x = 0; the expression x is an lvalue, as it names a persistent object.
(of course, ofcourse)

the expression ++x is also an lvalue, it modifies and then names the persistent object.
(starting to get lost)

However, x++ is an rvalue. It copies the original value of the persistent object, modifies the persistent object, and then returns the copy. This copy is a temporary. 
(what? modifies the persistent object but then returns the copy that wasn't incremented? Or the copy is incremented and that is returned and thus the persistent original object is incremented?)

Both ++x and x++ increment x, but ++x returns the persistent object itself, while x++ returns a temporary copy.  That’s why ++x is an lvalue, while x++ is an rvalue.
(must be then the case)

Lvalueness versus rvalueness doesn’t care about what an expression does, it cares about what an expression names (something persistent or something temporary).


### Initialising Objects

When an object is initialized with another object of the same type, the new object is
said to be a copy of the initializing object, even if the copy was created via the move
constructor. Regrettably, there’s no terminology in C++ that distinguishes between
an object that’s a copy-constructed copy and one that’s a move-constructed copy:

```c++
void someFunc(Widget w);  // someFunc's parameter w
                          // is passed by value

Widget wid;               // wid is some Widget

someFunc(wid);            // in this call to someFunc,
                          // w is a copy of wid that's
                          // created via copy construction

someFunc(std::move(wid)); // in this call to SomeFunc,
                          // w is a copy of wid that's
                          // created via move construction

```

In a function call, the expressions passed at the call site are the function’s arguments.
The arguments are used to initialize the function’s parameters. In the first call to
someFunc above, the argument is wid. In the second call, the argument is
std::move(wid). In both calls, the parameter is w. The distinction between argu‐
ments and parameters is important, because parameters are lvalues, but the argu‐
ments with which they are initialized may be rvalues or lvalues. This is especially
relevant during the process of perfect forwarding, whereby an argument passed to a
function is passed to a second function such that the original argument’s rvalueness
or lvalueness is preserved.

