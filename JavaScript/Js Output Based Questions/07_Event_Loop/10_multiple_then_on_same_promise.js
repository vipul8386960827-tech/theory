/*
==========================================================================================
QUESTION 10: Several .then on the same promise + nested microtasks
Topic: Event Loop   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

const p = Promise.resolve();

p.then(() => {
  console.log("A");
  Promise.resolve().then(() => console.log("B"));
}).then(() => console.log("C"));

p.then(() => console.log("D"));

setTimeout(() => console.log("E"), 0);

queueMicrotask(() => console.log("F"));

console.log("G");

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
G
A
D
F
B
C
E

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
`p` is already resolved, so EVERY .then attached directly to p is queued immediately, in the
order it was attached. "C" is attached to the promise returned by the first .then, not to p,
so it must wait until handler A has finished.

Step | Action                                       | Call Stack | Microtask Queue | Macrotask Queue
-----|----------------------------------------------|------------|-----------------|----------------
 1   | p.then(A) -> queued; .then(C) waits on A's   | global     | A               | -
     |   returned promise (pending)                 |            |                 |
 2   | p.then(D) -> queued                          | global     | A, D            | -
 3   | setTimeout(E)                                | global     | A, D            | E
 4   | queueMicrotask(F)                            | global     | A, D, F         | E
 5   | prints "G"                                   | global     | A, D, F         | E
 6   | run A: prints "A", queues B. A returns ->    | A          | D, F, B, C      | E
     |   A's promise resolves -> C queued after B   |            |                 |
 7   | run D, F, B, C in order                      | ...        | -               | E
 8   | macrotask E                                  | E          | -               | -

KEY RULE: Handlers on the SAME settled promise are queued in attach order; a chained .then
          is only queued after the previous handler returns.
COMMON MISTAKE: Printing "B" right after "A" (B is a new microtask, it goes to the back of the
          queue) or printing "C" before "D".
FOLLOW-UP: If handler A did `return Promise.resolve().then(() => console.log("B"))`, then C
          would wait for B's promise plus 2 extra ticks for adopting the returned promise.
*/
