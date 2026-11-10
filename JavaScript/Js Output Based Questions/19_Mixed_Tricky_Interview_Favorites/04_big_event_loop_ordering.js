/*
==========================================================================================
QUESTION 4: The big event-loop ordering question
Topic: Mixed Tricky Interview Favorites   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => console.log('3'));
}, 0);

Promise.resolve().then(() => {
  console.log('4');
  setTimeout(() => console.log('5'), 0);
});

async function a() {
  console.log('6');
  await b();
  console.log('7');
}

async function b() {
  console.log('8');
}

a();

new Promise((resolve) => {
  console.log('9');
  resolve();
}).then(() => console.log('10'));

queueMicrotask(() => console.log('11'));

console.log('12');

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1
6
8
9
12
4
7
10
11
2
3
5

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
PHASE 1 - synchronous code (call stack):
- '1'.
- setTimeout -> timer T1 queued (macrotask).
- Promise.resolve().then(...) -> microtask M1 queued (the '4' callback).
- a() runs synchronously until its first await: logs '6', calls b() which logs '8' and
  returns an already-resolved promise. `await` pauses a(); its continuation is queued as
  microtask M2 (the '7' part).
- The Promise executor runs synchronously -> '9'; resolve() -> .then queues M3 ('10').
- queueMicrotask -> M4 ('11').
- '12'.
Sync output: 1 6 8 9 12

PHASE 2 - drain ALL microtasks (FIFO): M1 '4' (and it schedules timer T2 for '5'),
M2 '7', M3 '10', M4 '11'.

PHASE 3 - macrotasks one at a time, draining microtasks after each:
- T1: '2', queues microtask '3' -> drained immediately -> '3'.
- T2: '5'.

KEY RULE: Sync code -> all microtasks (promises, await continuations, queueMicrotask) ->
one macrotask (setTimeout) -> all microtasks again -> next macrotask ...
The code before the first await in an async function runs synchronously.
COMMON MISTAKE: Logging '7' right after '8' (await always pauses), putting '9' after
'12' (the executor is synchronous), or putting '5' before '2'/'3'.
*/
