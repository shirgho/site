# Syntax for defining functions in JS/TS etc.

So the normal function syntax is:

```
#addKeyboardListeners(){
        document.onkeydown = function(event){
            switch(event.key){
                case "ArrowLeft":
                    this.left=true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
            }
            console.table(this);
        }

}

```

What happens here is the "this" keyword is not talking about a pointer to the object/class instance itself. It is talking about the functions context. So this refers to the instance of the function.

This (no pun intended) comes about because of the way JS is designed. It is not the same OOP as C++, C# etc. The prototype object design, I think, allows for functions to be treated as first class citizens as well as objects.

So this can mean a lot of things depending on context.

```
#addKeyboardListeners(){
        document.onkeydown = (event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left=true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
            }
            console.table(this);
        }

}

```

With the arrow syntax above, we instead pass the context of the object instance to "this". Then we can assign variables belonging to the object itself, call functions defined in the object class, etc etc.

That's basically it.

Oh, and the # infront of the function name makes it private. By default, functions are public.