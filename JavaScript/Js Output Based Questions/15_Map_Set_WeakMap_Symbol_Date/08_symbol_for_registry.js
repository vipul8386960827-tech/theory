/*
==========================================================================================
QUESTION 8: Symbol.for and the global symbol registry
Topic: Map, Set, WeakMap, Symbol, Date   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const a = Symbol.for('app');
const b = Symbol.for('app');
const c = Symbol('app');

console.log(a === b);
console.log(a === c);
console.log(Symbol.keyFor(a));
console.log(Symbol.keyFor(c));
console.log(a.description === c.description);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
true
false
app
undefined
true

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. Symbol.for('app') looks in a GLOBAL symbol registry. The first call creates a symbol
   under the key 'app'; the second call finds and returns the SAME symbol -> a === b.
2. Symbol('app') never touches the registry; it always makes a new unique symbol, so it
   is different from the registered one -> false.
3. Symbol.keyFor(sym) returns the registry key for a registered symbol -> 'app'.
4. c is not in the registry -> Symbol.keyFor(c) is undefined.
5. Both have the description 'app', so comparing descriptions (plain strings) -> true.

KEY RULE: Symbol() = always unique. Symbol.for(key) = shared, one symbol per key across
the whole realm (even across iframes/files).
COMMON MISTAKE: Thinking Symbol('app') and Symbol.for('app') are interchangeable.
*/
