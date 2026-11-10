/*
==========================================================================================
QUESTION 7: Property order - integer keys come first
Topic: Object Property Tricks   |   Difficulty: Medium
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

obj[10] = "ten";
obj.c = "c";

console.log(Object.keys(obj).join(", "));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1, 2, 10, b, a, -1, 01, 1.5, c

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Own string keys are listed (Object.keys, for...in, JSON.stringify, Object.entries ...) in
this order:
  1. "Integer-like" keys (valid array indices: "0", "1", "2" ... ) in ASCENDING numeric order,
     no matter when they were added.
  2. All other string keys in INSERTION order.
  (3. Symbol keys come last, but Object.keys skips them anyway.)

Which keys are integer-like?
  1, 2, 10      -> yes (canonical non-negative integers)          -> sorted: 1, 2, 10
  "-1"          -> no, negative                                    -> treated as a string
  "01"          -> no, leading zero (not the canonical form of 1)  -> treated as a string
  1.5           -> no, becomes the string "1.5"                    -> treated as a string

Strings in insertion order: b, a, -1, 01, 1.5, then c (added last).
Note: 10 was added AFTER everything else, but still appears right after 2.

KEY RULE: Integer keys first (ascending), then string keys in insertion order, then symbols.
COMMON MISTAKE: Assuming object keys always keep insertion order, or assuming "-1"/"01"/"1.5"
          get sorted with the numbers.
FOLLOW-UP: Need guaranteed insertion order for any key, including numbers? Use a Map.
*/
