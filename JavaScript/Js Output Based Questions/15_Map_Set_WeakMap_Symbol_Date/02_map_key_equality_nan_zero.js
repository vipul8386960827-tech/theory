/*
==========================================================================================
QUESTION 2: Map key equality with NaN, 0, -0 and '0'
Topic: Map, Set, WeakMap, Symbol, Date   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const m = new Map();

m.set(NaN, 'first NaN');
m.set(NaN, 'second NaN');
m.set(0, 'zero');
m.set(-0, 'minus zero');
m.set('0', 'string zero');

console.log(m.size);
console.log(m.get(NaN));
console.log(m.get(0));
console.log(m.get(-0));
console.log(m.get('0'));
console.log(NaN === NaN);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
3
second NaN
minus zero
minus zero
string zero
false

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Map compares keys with the "SameValueZero" algorithm:
  - It works like === EXCEPT that NaN is considered equal to NaN.
  - +0 and -0 are considered the same key.
  - No type coercion: 0 and '0' are different keys.

1. m.set(NaN, ...) twice -> same key, so the second call just overwrites the value.
2. m.set(0, ...) then m.set(-0, ...) -> same key, value becomes 'minus zero'.
3. m.set('0', ...) -> a string, a brand-new key.
4. Keys: NaN, 0, '0' -> size 3.
5. m.get(0) and m.get(-0) both find the same entry -> 'minus zero'.
6. NaN === NaN is still false - that's only the === operator, not how Map works.

KEY RULE: Map/Set use SameValueZero: NaN equals NaN, +0 equals -0, no type coercion.
COMMON MISTAKE: Thinking NaN can never be found in a Map (because NaN !== NaN), or that
0 and '0' collide like they would as plain object keys.
FOLLOW-UP: What does [NaN].includes(NaN) vs [NaN].indexOf(NaN) return?
-> true vs -1. includes uses SameValueZero, indexOf uses ===.
*/
