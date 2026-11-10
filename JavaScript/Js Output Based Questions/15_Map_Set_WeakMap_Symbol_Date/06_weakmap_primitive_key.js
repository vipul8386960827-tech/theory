/*
==========================================================================================
QUESTION 6: WeakMap with a primitive key
Topic: Map, Set, WeakMap, Symbol, Date   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const wm = new WeakMap();
const key = {};

wm.set(key, 'ok');
console.log(wm.get(key));
console.log(wm.has({}));
console.log(wm.size);

try {
  wm.set('name', 'Alice');
  console.log('string key worked');
} catch (e) {
  console.log(e.name);
  console.log(e.message);
}

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
ok
false
undefined
TypeError
Invalid value used as weak map key

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. wm.set(key, 'ok') with an object key is fine; wm.get(key) -> 'ok'.
2. wm.has({}) checks a brand-new object (different reference) -> false.
3. WeakMap has NO size property (and is not iterable) because its entries can disappear
   at any time when keys are garbage-collected -> undefined.
4. wm.set('name', ...) uses a primitive string as a key. WeakMap keys must be objects
   (or, in modern engines, non-registered symbols) because a WeakMap holds keys
   "weakly" - a primitive has no identity/lifetime that could be garbage-collected.
   -> TypeError is thrown; 'string key worked' is never printed.
   (The exact message text is engine-specific; this is V8/Chrome/Node.)

KEY RULE: WeakMap/WeakSet keys must be objects (not primitives). They have no size, no
keys(), no forEach, and are not iterable.
COMMON MISTAKE: Thinking WeakMap behaves like Map and silently accepts strings, or
expecting wm.size to be 1.
FOLLOW-UP: Why use WeakMap? -> Attach private data/caches to objects (e.g. DOM nodes)
without preventing them from being garbage-collected.
*/
