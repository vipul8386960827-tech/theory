/*
==========================================================================================
QUESTION 6: Spreading strings and other iterables
Topic: Destructuring, Spread and Rest   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

console.log(JSON.stringify([..."hello"]));
console.log(JSON.stringify({ ..."hi" }));
console.log([...new Set("aabbc")].join(""));
console.log("😀".length, [..."😀"].length);
console.log(JSON.stringify({ ...[10, 20] }));
console.log(JSON.stringify({ ...null, ...undefined, ...123, ...true }));

try {
  console.log([...123]);
} catch (e) {
  console.log(e.name);
}

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
["h","e","l","l","o"]
{"0":"h","1":"i"}
abc
2 1
{"0":10,"1":20}
{}
TypeError

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
There are two DIFFERENT spreads:
  - ARRAY spread [...x] / call spread f(...x): uses the ITERATOR protocol. x must be
    iterable (arrays, strings, Sets, Maps, ...), otherwise TypeError.
  - OBJECT spread { ...x }: copies own enumerable PROPERTIES. Works on anything;
    null/undefined are simply ignored.

[..."hello"]       -> strings are iterable by character -> ["h","e","l","l","o"]
{ ..."hi" }        -> a string's own enumerable properties are its indexes
                      -> { "0": "h", "1": "i" }
[...new Set("aabbc")] -> the Set keeps unique characters a, b, c -> "abc"
"😀".length        -> 2. The emoji is ONE code point but TWO UTF-16 code units, and
                      .length counts code units.
[..."😀"].length    -> 1. The string iterator walks CODE POINTS, so spread keeps the
                      emoji intact. (split("") would break it into 2 halves.)
{ ...[10, 20] }    -> array indexes become keys -> { "0": 10, "1": 20 }
{ ...null, ...undefined, ...123, ...true } -> null/undefined ignored; numbers and
                      booleans have no own enumerable props -> {}
[...123]           -> numbers are NOT iterable -> TypeError
                      (V8: "123 is not iterable" / "Spread syntax requires ...iterable")

KEY RULE: Array spread needs an iterable; object spread copies own enumerable properties and silently ignores null/undefined/primitives without own props.
COMMON MISTAKE: Expecting [...123] to work like {...123}, or that "😀".length is 1.
FOLLOW-UP: How do you reverse a string containing emoji safely?  [...str].reverse().join("") -- str.split("").reverse() would corrupt the surrogate pairs.
*/
