# Cool Methods

Usually appplied on some collection, like an array. Usually can be written/use lamda functions, so everything is done in one line and seems like magic.


## Map

Returns a new array, with each element of the array set to a particular value
depending on the original value of that index in the original array, and a "map" callback function, which takes in this original value, does an operation on it, and returns the calculated value to store in the new returned array.

So a map function, maps an output value according to a function, and does this for every input value. 

I guess basically a loop over, but more mathematical/functionally equivilant.
concise scene.

```
function halfDouble(input){
    return input.map( a => a%2 ? a*2 : a/2 );
}

```

## Filter

another lambda function, it iterates over an array, and returns
the elements in a new array, which meet the filter method.

```
    # would return all the elements in g that include the string "CAT".
    genes.filter(g => g.includes("CAT"));

```

## Reduce

Iterates over an array, yes, but ALSO, does this iteration while keeping a variable, usually called accumulater, recursively updated as we go through the array. So the result from the previous iteration is remembered and can be updated in the next iteration, and so on. 

What we get back is a single value from going over all the elements in an array. So Reduce the array elements to some value, which could be the sum of int values, or a concatanation of char values, etc.