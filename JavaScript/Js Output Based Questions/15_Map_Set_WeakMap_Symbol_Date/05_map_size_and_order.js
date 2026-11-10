/*
==========================================================================================
QUESTION 5: Map size and key order vs object key order
Topic: Map, Set, WeakMap, Symbol, Date   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const m = new Map([['z', 1], ['a', 2]]);
m.set(1, 'one');
m.set('z', 100);
m.delete('a');
m.set('a', 3);

console.log(m.size);
console.log(m.length);
console.log([...m.keys()].join(','));
console.log(m.get('z'));

const o = { z: 1, a: 2 };
o[1] = 'one';
o.z = 100;
delete o.a;
o.a = 3;

console.log(Object.keys(o).join(','));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
3
undefined
z,1,a
100
1,z,a

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Map:
1. Starts with keys in order: 'z', 'a'.
2. set(1, 'one') appends key 1 -> 'z', 'a', 1.
3. set('z', 100) UPDATES an existing key - its position does not change.
4. delete('a') removes 'a' -> 'z', 1.
5. set('a', 3) adds 'a' again as a NEW key, so it goes to the end -> 'z', 1, 'a'.
6. m.size -> 3. Maps have no .length property -> undefined.

Object:
Object key order is NOT pure insertion order. Integer-like keys ("1") come first in
ascending numeric order, then string keys in insertion order.
- After the same operations the string keys are 'z', 'a' (re-added at the end) and the
  integer key is "1" -> "1" goes first -> 1,z,a.

KEY RULE: A Map always iterates in insertion order (updating a value keeps the position,
delete + set moves it to the end). Objects put integer keys first.
COMMON MISTAKE: Using m.length (undefined) instead of m.size, or assuming objects
preserve insertion order for numeric keys.
*/
