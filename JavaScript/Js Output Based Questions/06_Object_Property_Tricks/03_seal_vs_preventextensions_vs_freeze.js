/*
==========================================================================================
QUESTION 3: preventExtensions vs seal vs freeze
Topic: Object Property Tricks   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const a = { x: 1 };
const b = { x: 1 };
const c = { x: 1 };

Object.preventExtensions(a);
Object.seal(b);
Object.freeze(c);

for (const obj of [a, b, c]) {
  obj.x = 2;     // modify
  obj.y = 3;     // add
  delete obj.x;  // delete
}

console.log(JSON.stringify(a));
console.log(JSON.stringify(b));
console.log(JSON.stringify(c));
console.log(Object.isSealed(c), Object.isFrozen(b));
console.log(Object.isFrozen(a));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
{}
{"x":2}
{"x":1}
true false
true

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
                       add new?   modify existing?   delete existing?
  preventExtensions      NO           YES                 YES
  seal                   NO           YES                 NO
  freeze                 NO           NO                  NO

Object a (preventExtensions):
  x = 2 works, y = 3 is ignored, delete x WORKS -> a becomes {}
Object b (seal):
  x = 2 works, y = 3 is ignored, delete x is ignored (returns false) -> {"x":2}
Object c (freeze):
  everything is ignored -> {"x":1}

Object.isSealed(c) -> true   (every frozen object is also sealed)
Object.isFrozen(b) -> false  (b.x is still writable)

The trick: Object.isFrozen(a) -> true!
  isFrozen checks "is it non-extensible AND are all own properties non-configurable and
  non-writable?". `a` is non-extensible and now has NO properties at all, so the condition is
  vacuously true. An empty non-extensible object is considered sealed AND frozen.

KEY RULE: preventExtensions < seal < freeze. preventExtensions only blocks ADDING, seal also
          blocks DELETING, freeze also blocks MODIFYING.
COMMON MISTAKE: Saying a is {"x":2} (forgetting that preventExtensions still allows delete) or
          saying Object.isFrozen(a) is false.
*/
