/*
==========================================================================================
QUESTION 3: Objects as object keys
Topic: Objects and References   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const obj = {};
const a = { key: "a" };
const b = { key: "b" };

obj[a] = 123;
obj[b] = 456;
console.log(obj[a]);

obj[[1, 2]] = "array key";
console.log(obj["1,2"]);

obj[1] = "number key";
console.log(obj["1"]);

obj[null] = "null key";
console.log(obj.null);

console.log(JSON.stringify(Object.keys(obj)));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
456
array key
number key
null key
["1","[object Object]","1,2","null"]

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Plain-object property keys can only be STRINGS or SYMBOLS. Any other value used inside
[ ] is converted with ToPropertyKey -> ToString.

obj[a] = 123
  String(a) -> "[object Object]" -> obj["[object Object]"] = 123
obj[b] = 456
  String(b) -> ALSO "[object Object]" -> overwrites the same key -> 456
obj[a]
  Again reads obj["[object Object]"] -> 456

obj[[1, 2]]  -> String([1, 2]) = "1,2"  -> same as obj["1,2"]
obj[1]       -> String(1) = "1"         -> same as obj["1"]
obj[null]    -> String(null) = "null"   -> same as obj.null

Object.keys(obj) ORDER:
  1. Integer-like keys first, in ascending numeric order: "1"
  2. Then the other string keys in INSERTION order: "[object Object]", "1,2", "null"
  So "1" comes first even though it was added later.

KEY RULE: Object keys are strings (or symbols); obj[someObject] uses String(someObject). Use a Map when you need objects as keys.
COMMON MISTAKE: Answering 123, thinking a and b are distinct keys.
FOLLOW-UP: How does a Map behave?  const m = new Map(); m.set(a, 123); m.set(b, 456); m.get(a) is 123 -- Map compares keys by identity.
*/
