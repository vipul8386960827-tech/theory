/*
==========================================================================================
QUESTION 10: Objects as property keys
Topic: Object Property Tricks   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a[b]);
console.log(Object.keys(a).join(" | "));

const m = {};
m[1] = "number";
m["1"] = "string";
m[true] = "boolean";
console.log(m[1], Object.keys(m).length);

const k = {};
k[[1, 2]] = "array key";
console.log(k["1,2"]);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
456
[object Object]
string 2
array key

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Property keys of a plain object can only be STRINGS or SYMBOLS. Anything else is converted
to a string with String(value) first.

  a[b] = 123   -> String(b) is "[object Object]" -> a["[object Object]"] = 123
  a[c] = 456   -> String(c) is ALSO "[object Object]" -> overwrites the same key with 456
  a[b]         -> reads a["[object Object]"] -> 456
  Object.keys(a) -> just one key: "[object Object]"

  m[1], m["1"]   -> both become the key "1", so "string" overwrote "number"
  m[true]        -> key "true"
  m now has 2 keys ("1" and "true"); m[1] reads "1" -> "string"

  k[[1, 2]]      -> String([1, 2]) is "1,2" -> k["1,2"] = "array key"

KEY RULE: Non-symbol keys are stringified. Two different objects both become
          "[object Object]" and collide.
COMMON MISTAKE: Answering 123 because "b and c are different objects".
FOLLOW-UP: To use objects as keys, use a Map: new Map([[b, 123], [c, 456]]).get(b) -> 123.
*/
