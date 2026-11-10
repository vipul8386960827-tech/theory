/*
==========================================================================================
QUESTION 2: Mutating vs reassigning a function parameter
Topic: Objects and References   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

function change(person, count) {
  person.name = "Bob";
  person = { name: "Charlie" };
  person.name = "Dave";
  count = count + 1;
}

const p = { name: "Alice" };
let n = 10;
change(p, n);

console.log(p.name);
console.log(n);

function clear(arr) {
  arr.length = 0;
}
function replace(arr) {
  arr = [];
}
const list1 = [1, 2, 3];
const list2 = [1, 2, 3];
clear(list1);
replace(list2);
console.log(list1.length, list2.length);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
Bob
10
0 3

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
JavaScript is ALWAYS pass-by-value. For objects, the "value" that gets copied into the
parameter is the REFERENCE. (Sometimes called "pass by sharing".)

change(p, n):
  1. person receives a copy of the reference to p's object.
  2. person.name = "Bob"           -> MUTATES the shared object -> p.name is "Bob"
  3. person = { name: "Charlie" }  -> REASSIGNS the local parameter to a new object.
                                      This breaks the link; p is unaffected.
  4. person.name = "Dave"          -> mutates the NEW local object only.
  5. count = count + 1             -> count is a local copy of 10; n stays 10.

  -> p.name is "Bob", n is 10.

clear(list1)   -> arr.length = 0 mutates the shared array -> list1.length = 0
replace(list2) -> arr = [] only rebinds the local variable -> list2.length = 3

KEY RULE: Mutating through a parameter (obj.prop = ..., arr.push(...)) is visible to the caller; reassigning the parameter (obj = ...) is not.
COMMON MISTAKE: Answering "Dave" or "Charlie" (thinking the reassignment replaces the caller's object), or "Alice" (thinking objects are copied).
FOLLOW-UP: Would the result change if p were declared with let instead of const?  No. const only prevents reassigning p itself; it never affected what the function can mutate.
*/
