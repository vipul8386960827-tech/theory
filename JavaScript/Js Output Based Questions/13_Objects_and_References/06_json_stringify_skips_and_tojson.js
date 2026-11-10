/*
==========================================================================================
QUESTION 6: JSON.stringify -- skipped values and toJSON
Topic: Objects and References   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

console.log(JSON.stringify({ a: undefined, b() {}, c: Symbol("s"), d: null }));
console.log(JSON.stringify([undefined, function () {}, Symbol("s"), null]));
console.log(JSON.stringify(undefined));
console.log(typeof JSON.stringify(undefined));
console.log(JSON.stringify("hi"));

const user = {
  name: "Ann",
  password: "secret",
  toJSON() {
    return { name: this.name };
  },
};
console.log(JSON.stringify({ user, id: 7 }));

console.log(JSON.stringify({ a: 1, b: 2, c: 3 }, ["a", "c"]));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
{"d":null}
[null,null,null,null]
undefined
undefined
"hi"
{"user":{"name":"Ann"},"id":7}
{"a":1,"c":3}

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
undefined, functions and Symbols are not valid JSON values. What happens to them
depends on WHERE they appear:

In an OBJECT property -> the property is OMITTED entirely.
  { a: undefined, b() {}, c: Symbol(), d: null } -> {"d":null}
  (null IS valid JSON, so d stays.)

In an ARRAY -> replaced by null (so the indexes/length are preserved).
  [undefined, function, Symbol, null] -> [null,null,null,null]

At the TOP level -> JSON.stringify returns undefined (the value undefined, not the
  string "undefined"). console.log prints undefined, and typeof is "undefined".

JSON.stringify("hi") -> '"hi"' -- a string is serialised WITH its quotes.

toJSON()
  If a value has a toJSON method, JSON.stringify calls it and serialises its RETURN
  value instead. Here password is hidden -> {"user":{"name":"Ann"},"id":7}

Replacer array ["a", "c"]
  The second argument can be an allow-list of keys -> {"a":1,"c":3}

KEY RULE: Inside objects, undefined/functions/symbols are dropped; inside arrays they become null; at top level the result is undefined. toJSON overrides what gets serialised.
COMMON MISTAKE: Expecting {"a":null,...} for undefined properties, or expecting the string "undefined" from JSON.stringify(undefined).
FOLLOW-UP: What does JSON.stringify({ n: 10n }) do?  Throws TypeError: Do not know how to serialize a BigInt.
*/
