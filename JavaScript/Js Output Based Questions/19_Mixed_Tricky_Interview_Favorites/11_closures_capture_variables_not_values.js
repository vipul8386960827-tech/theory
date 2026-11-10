/*
==========================================================================================
QUESTION 11: Closures capture variables, not values
Topic: Mixed Tricky Interview Favorites   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

let x = 1;
const getX = () => x;
x = 2;

setTimeout(() => console.log('timeout:', getX()), 0);

const multipliers = [1, 2, 3].map((n) => () => n * x);
x = 10;

console.log('sync:', getX());
console.log('fns:', multipliers.map((f) => f()).join(','));

function makeCounter() {
  let count = 0;
  return { inc: () => ++count, get: () => count };
}
const a = makeCounter();
const b = makeCounter();
a.inc();
a.inc();
b.inc();
console.log('counters:', a.get(), b.get());

x = 100;

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
sync: 10
fns: 10,20,30
counters: 2 1
timeout: 100

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. getX closes over the VARIABLE x, not the value it had when getX was created.
   Each call reads the current value of x.
2. When 'sync:' is logged, x is 10 -> 'sync: 10'.
3. multipliers: each inner arrow captures its own n (the map callback parameter: 1, 2,
   3) AND the shared variable x. Called when x = 10 -> 10, 20, 30.
4. Each makeCounter() call creates a NEW scope with its own count. a and b don't share
   state -> a is 2, b is 1.
5. `x = 100` runs before the timer fires (the timer waits for all sync code), so the
   timeout reads 100 -> 'timeout: 100' last.

KEY RULE: A closure keeps a live link to the outer variable. It sees the value at the
moment the function RUNS, not when it was created. Each function call creates a fresh
scope.
COMMON MISTAKE: Answering 'timeout: 2' (value at scheduling time) or 'fns: 2,4,6'.
*/
