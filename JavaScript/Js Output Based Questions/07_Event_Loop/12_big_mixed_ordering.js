/*
==========================================================================================
QUESTION 12: The big mixed ordering question
Topic: Event Loop   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

console.log(1);

setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => console.log(3));
}, 0);

new Promise((resolve) => {
  console.log(4);
  setTimeout(() => {
    console.log(5);
    resolve(6);
  }, 0);
}).then((value) => {
  console.log(value);
  setTimeout(() => console.log(7), 0);
});

Promise.resolve()
  .then(() => {
    console.log(8);
    queueMicrotask(() => console.log(9));
  })
  .then(() => console.log(10));

console.log(11);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1
4
11
8
9
10
2
3
5
6
7

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Names: T2 = first timer, T5 = timer inside the executor, T7 = timer inside then(value),
       M8 / M9 / M10 / M3 / M6 = the microtasks that print those numbers.

Step | Action                                           | Call Stack | Microtask Queue | Macrotask Queue
-----|--------------------------------------------------|------------|-----------------|----------------
 1   | prints 1                                         | global     | -               | -
 2   | setTimeout(T2)                                   | global     | -               | T2
 3   | executor runs sync: prints 4, setTimeout(T5).    | global     | -               | T2, T5
     |   The promise is still PENDING (resolve is       |            |                 |
     |   inside T5), so .then(M6) is just registered    |            |                 |
 4   | Promise.resolve().then(M8) -> queued;            | global     | M8              | T2, T5
     |   .then(M10) waits for M8                        |            |                 |
 5   | prints 11                                        | global     | M8              | T2, T5
 6   | run M8: prints 8, queueMicrotask(M9). M8 returns | M8         | M9, M10         | T2, T5
     |   -> its promise resolves -> M10 queued after M9 |            |                 |
 7   | run M9 (prints 9), M10 (prints 10)               | M9 / M10   | -               | T2, T5
 8   | macrotask T2: prints 2, queues M3                | T2         | M3              | T5
 9   | drain microtasks: prints 3                       | M3         | -               | T5
10   | macrotask T5: prints 5, resolve(6) -> M6 queued  | T5         | M6              | -
11   | drain: M6 prints 6, schedules T7                 | M6         | -               | T7
12   | macrotask T7: prints 7                           | T7         | -               | -

KEY RULE: A .then callback is queued only when its promise actually settles. If resolve() is
          called inside a setTimeout, the .then waits for that timer.
COMMON MISTAKE: Printing 6 early (right after 8) because "the promise was created early", or
          printing 9 after 10.
*/
