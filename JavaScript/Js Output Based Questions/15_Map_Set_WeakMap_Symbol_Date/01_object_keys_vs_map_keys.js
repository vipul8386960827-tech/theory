/*
==========================================================================================
QUESTION 1: Object with object keys vs Map with object keys
Topic: Map, Set, WeakMap, Symbol, Date   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

const a = {};
const b = { key: 'b' };
const c = { key: 'c' };

a[b] = 123;
a[c] = 456;

console.log(a[b]);
console.log(Object.keys(a).length);
console.log(Object.keys(a)[0]);

const m = new Map();
m.set(b, 123);
m.set(c, 456);

console.log(m.get(b));
console.log(m.size);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
456
1
[object Object]
123
2

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. Plain object keys can only be strings or symbols. When you use an object as a key,
   JavaScript converts it to a string with String(b) -> "[object Object]".
2. a[b] = 123 really means a["[object Object]"] = 123.
3. a[c] = 456 ALSO means a["[object Object]"] = 456, so it overwrites the same key.
4. a[b] reads a["[object Object]"] -> 456. The object has only 1 key.
5. A Map keeps keys as they are (no string conversion). b and c are different object
   references, so they are two separate keys: m.get(b) -> 123 and m.size -> 2.

KEY RULE: Object keys are converted to strings (or stay symbols); Map keys can be any
value and are compared by identity (SameValueZero).
COMMON MISTAKE: Answering 123 for a[b], thinking each object is a unique key in a plain
object.
FOLLOW-UP: What does m.get({ key: 'b' }) return? -> undefined. It is a new object with a
different reference, even though it looks identical.
*/
