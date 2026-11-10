/*
==========================================================================================
QUESTION 4: Shallow vs deep copy
Topic: Objects and References   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const original = { a: 1, nested: { b: 2 } };

const spreadCopy = { ...original };
const assignCopy = Object.assign({}, original);
const jsonCopy = JSON.parse(JSON.stringify(original));
const cloneCopy = structuredClone(original);

original.a = 100;
original.nested.b = 99;

console.log(spreadCopy.a, spreadCopy.nested.b);
console.log(assignCopy.a, assignCopy.nested.b);
console.log(jsonCopy.a, jsonCopy.nested.b);
console.log(cloneCopy.a, cloneCopy.nested.b);
console.log(spreadCopy.nested === original.nested);
console.log(cloneCopy.nested === original.nested);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1 99
1 99
1 2
1 2
true
false

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
SHALLOW copies ({ ...obj }, Object.assign) create a new top-level object, but copy
nested objects BY REFERENCE.
DEEP copies (JSON round-trip, structuredClone) recreate nested objects too.

original.a = 100
  "a" is a primitive that was copied into every copy at copy time -> all copies keep 1.

original.nested.b = 99
  spreadCopy.nested and assignCopy.nested are the SAME object as original.nested
  -> they see 99.
  jsonCopy and cloneCopy have their own nested objects -> still 2.

spreadCopy.nested === original.nested -> true  (shared)
cloneCopy.nested === original.nested  -> false (independent)

Trade-offs:
  - JSON.parse(JSON.stringify(x)) loses functions, undefined, Symbols, turns Dates into
    strings, NaN/Infinity into null, Map/Set into {}, and throws on circular references.
  - structuredClone handles Dates, Maps, Sets, RegExps, typed arrays and circular
    references, but throws DataCloneError for functions/DOM nodes and does not keep
    class prototypes (instances become plain objects).

KEY RULE: Spread and Object.assign are one level deep. Use structuredClone (modern browsers) for true deep copies.
COMMON MISTAKE: Expecting spreadCopy.nested.b to be 2, or expecting copies to see a = 100.
FOLLOW-UP: What does structuredClone({ f() {} }) do?  Throws DataCloneError: functions cannot be cloned.
*/
