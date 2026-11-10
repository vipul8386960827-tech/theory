/*
==========================================================================================
QUESTION 7: Symbol uniqueness and conversion
Topic: Map, Set, WeakMap, Symbol, Date   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const s1 = Symbol('id');
const s2 = Symbol('id');

console.log(s1 === s2);
console.log(typeof s1);
console.log(s1.toString());
console.log(s1.description);

const obj = {};
obj[s1] = 'first';
obj[s2] = 'second';
console.log(obj[s1]);

try {
  console.log('Key: ' + s1);
} catch (e) {
  console.log(e.name + ': ' + e.message);
}

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
false
symbol
Symbol(id)
id
first
TypeError: Cannot convert a Symbol value to a string

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. Every call to Symbol() creates a brand-new, unique value. The 'id' text is only a
   description for debugging - it does NOT make two symbols equal -> false.
2. typeof a symbol is 'symbol' (a primitive type).
3. Explicit conversion is allowed: s1.toString() -> "Symbol(id)", s1.description -> "id".
4. s1 and s2 are different keys, so obj has two properties; obj[s1] -> 'first'.
5. 'Key: ' + s1 tries an IMPLICIT conversion to string, which symbols forbid
   -> TypeError. (String(s1) or `${s1.description}` would work... but note that a
   template literal `${s1}` also throws, because it is implicit conversion too.)

KEY RULE: Symbols are always unique (unless created with Symbol.for) and cannot be
implicitly converted to strings or numbers.
COMMON MISTAKE: Answering true for Symbol('id') === Symbol('id'), or expecting
'Key: Symbol(id)' from string concatenation.
FOLLOW-UP: What is String(s1)? -> "Symbol(id)" (explicit conversion is allowed).
*/
