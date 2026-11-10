/*
==========================================================================================
QUESTION 12: Object keys in a Map vs a plain object
Topic: Objects and References   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const map = new Map();
map.set({}, "first");
console.log(map.get({}));

const key = {};
map.set(key, "second");
console.log(map.get(key));

map.set(1, "number one");
map.set("1", "string one");
console.log(map.get(1), "|", map.get("1"), "|", map.size);

map.set(NaN, "nan");
console.log(map.get(NaN));

const plain = {};
plain[key] = "x";
plain[{}] = "y";
console.log(plain[key], Object.keys(plain).length);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
undefined
second
number one | string one | 4
nan
y 1

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
A Map can use ANY value as a key and compares keys by identity using the
"SameValueZero" algorithm (like ===, except NaN equals NaN).

map.set({}, "first"); map.get({})
  The two {} literals are DIFFERENT objects -> no match -> undefined.
  (The first entry is still in the map, but unreachable because we lost its reference.)

map.set(key, "second"); map.get(key)
  Same reference -> "second"

map.set(1, ...) and map.set("1", ...)
  Map does NOT convert keys to strings: 1 and "1" are different keys.
  Size: {} (first), key, 1, "1" -> 4

map.get(NaN) -> SameValueZero treats NaN as equal to NaN -> "nan"

Plain object:
  plain[key] and plain[{}] both convert to the string "[object Object]".
  The second assignment overwrites the first -> plain[key] is "y", only 1 key.

KEY RULE: Maps keep key types and compare by identity (SameValueZero); plain objects stringify keys.
COMMON MISTAKE: Expecting map.get({}) to return "first" because the key "looks the same".
FOLLOW-UP: Why might a WeakMap be better for object keys?  It holds keys weakly, so entries for objects that are no longer referenced can be garbage-collected (no memory leak like the lost {} above).
*/
