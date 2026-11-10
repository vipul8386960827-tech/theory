/*
==========================================================================================
QUESTION 3: Set de-duplication - primitives vs objects
Topic: Map, Set, WeakMap, Symbol, Date   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

const s1 = new Set([1, '1', 1, NaN, NaN, { a: 1 }, { a: 1 }]);
console.log(s1.size);

const obj = { a: 1 };
const s2 = new Set([obj, obj]);
console.log(s2.size);

const s3 = new Set([[1], [1]]);
console.log(s3.size);

const s4 = new Set();
s4.add(5).add(5).add('5');
console.log(s4.size);
console.log(s4.has(5), s4.has('5'), s4.has(6));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
5
1
2
2
true true false

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
A Set keeps only unique values, using SameValueZero (like === but NaN equals NaN).

s1: [1, '1', 1, NaN, NaN, {a:1}, {a:1}]
  - 1 and '1' are different types -> both kept. The second 1 is a duplicate.
  - NaN and NaN -> treated as equal -> one NaN kept.
  - { a: 1 } and { a: 1 } are two DIFFERENT objects (two references) -> both kept.
  - Unique values: 1, '1', NaN, {a:1}, {a:1} -> 5.
s2: the same reference added twice -> 1.
s3: two separate array literals -> different references -> 2.
s4: add() returns the Set itself, so calls can be chained. 5 is added once, '5' is a
    different value -> size 2.

KEY RULE: Set dedupes primitives by value, but objects/arrays only by reference.
COMMON MISTAKE: Expecting new Set([{a:1},{a:1}]) to remove the "duplicate" object.
FOLLOW-UP: How do you dedupe objects by content? -> e.g. dedupe by a key:
[...new Map(list.map(o => [o.id, o])).values()], or compare JSON.stringify(o) strings.
*/
