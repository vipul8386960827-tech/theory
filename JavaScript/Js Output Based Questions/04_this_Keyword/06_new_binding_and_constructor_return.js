/*
==========================================================================================
QUESTION 6: new binding and what a constructor returns
Topic: this Keyword   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

function Car(model) {
  this.model = model;
}

function ReturnsObject() {
  this.value = 1;
  return { value: 2 };
}

function ReturnsPrimitive() {
  this.value = 1;
  return 5;
}

const c = new Car("Tesla");
console.log(c.model);
console.log(new ReturnsObject().value);
console.log(new ReturnsPrimitive().value);

const notNew = Car("BMW");
console.log(notNew);
console.log(globalThis.model);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
Tesla
2
1
undefined
BMW

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
`new Fn()` does four things:
  1. creates a fresh empty object,
  2. links its prototype to Fn.prototype,
  3. calls Fn with `this` = that new object,
  4. returns the new object - UNLESS Fn explicitly returns an OBJECT, in which case
     that object is returned instead. Returned primitives are ignored.

1. new Car("Tesla") -> this.model set on the new object -> "Tesla".
2. ReturnsObject returns an object -> it replaces `this` -> value 2.
3. ReturnsPrimitive returns 5 (primitive) -> ignored, the new object is returned -> 1.
4. Car("BMW") WITHOUT new -> a plain function call: `this` is the global object
   (non-strict), so `this.model = "BMW"` creates a GLOBAL property. The function has
   no return -> notNew is undefined.
5. globalThis.model -> "BMW" (accidental global pollution).

KEY RULE: With `new`, `this` is the newly created object, which is returned unless the constructor returns another object.
COMMON MISTAKE: Answering 1 for ReturnsObject, or thinking Car("BMW") without new still returns an object.
*/
