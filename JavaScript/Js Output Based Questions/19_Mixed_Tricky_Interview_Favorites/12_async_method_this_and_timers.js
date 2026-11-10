/*
==========================================================================================
QUESTION 12: Final boss - async method + this + await + setTimeout
Topic: Mixed Tricky Interview Favorites   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

const obj = {
  val: 1,
  async run() {
    console.log('A', this.val);
    await null;
    console.log('B', this.val);
    setTimeout(() => console.log('C', this.val), 0);
    return this.val * 10;
  },
};

obj.run().then((v) => console.log('D', v));

obj.val = 2;
console.log('E', obj.val);

Promise.resolve().then(() => {
  obj.val = 3;
  console.log('F');
});

setTimeout(() => {
  obj.val = 4;
  console.log('G');
}, 0);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
A 1
E 2
B 2
F
D 20
G
C 4

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Synchronous phase:
1. obj.run() is a method call, so this === obj inside (and stays obj after await - the
   async function resumes with the same this). Runs sync until await: 'A 1'.
2. `await null` pauses run(); its continuation is queued as microtask M1.
   .then(D) is attached to run's promise (still pending).
3. obj.val = 2; 'E 2'.
4. Promise.resolve().then(F) -> microtask M2.
5. setTimeout(G) -> timer T1 (the FIRST timer scheduled).

Microtasks:
6. M1: run() resumes -> 'B 2'. It schedules timer T2 (C) - AFTER T1. Then
   `return this.val * 10` -> 20 -> run's promise is fulfilled -> .then(D) queued as M3.
7. M2: obj.val = 3, 'F'.
8. M3: 'D 20' (the return value was computed when val was 2).

Macrotasks in scheduling order:
9. T1: obj.val = 4, 'G'.
10. T2: the arrow reads this.val now -> 'C 4'.

KEY RULE: Code after `await` is a microtask; the async function's returned promise
settles when the body returns; timers run in the order they were SCHEDULED, after all
microtasks. Arrow callbacks read this.val when they run, not when they're created.
COMMON MISTAKE: Putting 'C' before 'G' (C's timer was scheduled later, inside a
microtask), printing 'D 30', or 'C 2'.
*/
