/*
==========================================================================================
QUESTION 8: The delete operator
Topic: Objects and References   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const obj = { a: 1, b: 2 };
console.log(delete obj.a);
console.log(obj.a, "a" in obj);
console.log(delete obj.doesNotExist);

var x = 1;
console.log(delete x);
console.log(x);

const arr = [1, 2, 3];
delete arr[1];
console.log(arr.length, arr[1], 1 in arr);

const proto = { shared: "from proto" };
const child = Object.create(proto);
child.shared = "own";
delete child.shared;
console.log(child.shared);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
true
undefined false
true
false
1
3 undefined false
from proto

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
delete removes an OWN PROPERTY from an object and returns true if the property no longer
exists afterwards (false if it could not be deleted -- in sloppy mode; strict mode throws).

delete obj.a           -> removed -> true
obj.a, "a" in obj      -> undefined, false (the key is really gone, not just set to undefined)
delete obj.doesNotExist-> nothing to delete -> still returns true

var x = 1; delete x
  delete works on PROPERTIES, not on variables. Variables declared with var/let/const
  are non-configurable bindings -> false, and x is still 1.
  (In strict mode, "delete x" on an identifier is a SyntaxError.)

delete arr[1]
  Removes index 1 but does NOT shift elements or change length.
  It leaves a HOLE: length 3, arr[1] reads undefined, 1 in arr is false.
  -> Use arr.splice(1, 1) to actually remove an element.

delete child.shared
  Deletes only the OWN property. Reading child.shared now falls back to the
  prototype chain -> "from proto". delete never touches prototypes.

KEY RULE: delete removes own properties only, returns true even if the property didn't exist, can't delete variables, and leaves holes in arrays.
COMMON MISTAKE: Expecting delete arr[1] to give length 2, or child.shared to be undefined after delete.
FOLLOW-UP: What is delete Math.PI?  false -- it is non-configurable, and Math.PI is still 3.141592653589793.
*/
