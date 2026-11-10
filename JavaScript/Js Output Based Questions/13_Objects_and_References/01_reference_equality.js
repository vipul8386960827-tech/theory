/*
==========================================================================================
QUESTION 1: Reference equality
Topic: Objects and References   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

const a = { x: 1 };
const b = { x: 1 };
const c = a;

console.log(a == b);
console.log(a === b);
console.log(a === c);

c.x = 2;
console.log(a.x);

console.log({} === {});
console.log(JSON.stringify(a) === JSON.stringify({ x: 2 }));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
false
false
true
2
false
true

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
A variable holding an object does not hold the object itself -- it holds a REFERENCE
(think: an address) to the object in memory.

a and b are created by two separate object literals -> two different objects, even
though their contents look identical.
  a == b   -> both are objects, so == compares references -> false
  a === b  -> false

const c = a copies the REFERENCE, not the object. a and c point to the same object.
  a === c  -> true

c.x = 2
  Mutates the single shared object -> a.x is also 2.

{} === {}
  Each literal creates a brand-new object -> false.

JSON.stringify(a) === JSON.stringify({ x: 2 })
  Comparing the serialised STRINGS ('{"x":2}' vs '{"x":2}') -> true.
  (Works for simple data only; key order matters and functions/undefined are dropped.)

KEY RULE: == and === on objects check whether both sides are the SAME object, not whether they look the same.
COMMON MISTAKE: Answering true for a == b because "they have the same properties".
FOLLOW-UP: If you do const d = { ...a }, is d === a?  No -- spread creates a new object.
*/
