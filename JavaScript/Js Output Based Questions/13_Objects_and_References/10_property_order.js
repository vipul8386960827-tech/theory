/*
==========================================================================================
QUESTION 10: Order of object keys
Topic: Objects and References   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

const obj = {
  b: "b",
  2: "two",
  a: "a",
  1: "one",
  "-1": "minus one",
  "01": "zero one",
  1.5: "one and a half",
};

console.log(JSON.stringify(Object.keys(obj)));

const codes = { "+91": "India", "+1": "USA", 44: "UK" };
for (const key in codes) console.log(key);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
["1","2","b","a","-1","01","1.5"]
44
+91
+1

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Own string keys are NOT simply in insertion order. The spec order (used by Object.keys,
for...in, JSON.stringify, Object.entries ...) is:
  1. "Array index" keys -- canonical non-negative integer strings -- in ASCENDING order
  2. All other string keys in INSERTION order
  3. Symbol keys in insertion order (Object.keys skips symbols)

Classifying each key:
  2     -> "2"   integer index
  1     -> "1"   integer index
  "-1"  -> negative, NOT an index -> string key
  "01"  -> has a leading zero, not canonical -> string key
  1.5   -> becomes "1.5", not an integer -> string key

So: integers first ["1", "2"], then strings in insertion order
    ["b", "a", "-1", "01", "1.5"].

codes example (a real-world bug):
  44 is an integer key -> listed first. "+91" and "+1" have a "+" sign -> normal string
  keys in insertion order. So "44" prints first even though it was written last.

KEY RULE: Integer-like keys are always iterated first, in ascending numeric order; other string keys keep insertion order. If order matters, use a Map or an array.
COMMON MISTAKE: Assuming keys come out exactly in the order they were written.
FOLLOW-UP: Does a Map reorder numeric keys?  No -- Map iterates strictly in insertion order for all key types.
*/
