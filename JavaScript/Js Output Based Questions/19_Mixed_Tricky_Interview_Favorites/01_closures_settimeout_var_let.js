/*
==========================================================================================
QUESTION 1: Closures + setTimeout + var vs let (three loops)
Topic: Mixed Tricky Interview Favorites   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var', i), 0);
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log('let', j), 0);
}

for (var k = 0; k < 3; k++) {
  setTimeout(console.log, 0, 'arg', k);
}

console.log('sync i =', i, typeof j);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
sync i = 3 undefined
var 3
var 3
var 3
let 0
let 1
let 2
arg 0
arg 1
arg 2

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. All three loops only SCHEDULE callbacks; the synchronous log runs first.
   `var i` is function/global scoped, so after the loop i is 3. `let j` is block scoped
   to the loop, so outside it j does not exist -> typeof j is 'undefined'.
2. Loop 1 (var): there is ONE shared variable i. The three arrow functions close over
   that same variable. When they finally run, the loop has finished and i is 3
   -> 'var 3' three times.
3. Loop 2 (let): a let in a for-loop header creates a NEW binding for each iteration.
   Each arrow closes over its own j -> 0, 1, 2.
4. Loop 3 (var, but passing arguments): setTimeout(fn, delay, ...args) evaluates `k`
   immediately at scheduling time and stores the VALUE, so it doesn't matter that k is
   shared -> 0, 1, 2.
5. Timers with the same delay run in the order they were scheduled: loop 1, 2, 3.

KEY RULE: Closures capture variables, not values. var = one shared variable; let in a
for-loop = a fresh variable per iteration. Arguments are evaluated immediately.
COMMON MISTAKE: Answering 0 1 2 for the var loop, or 3 3 3 for the setTimeout-args loop.
FOLLOW-UP: Fix the var loop without let -> wrap in an IIFE:
(function (x) { setTimeout(() => console.log(x), 0); })(i);
*/
