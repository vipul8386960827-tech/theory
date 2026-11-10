/*
==========================================================================================
QUESTION 3: queueMicrotask, Promise.then and setTimeout together
Topic: Event Loop   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

console.log("A");

setTimeout(() => console.log("B"), 0);

queueMicrotask(() => console.log("C"));

Promise.resolve().then(() => console.log("D"));

queueMicrotask(() => console.log("E"));

console.log("F");

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
A
F
C
D
E
B

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
queueMicrotask(fn) puts fn straight into the SAME microtask queue that promise callbacks
use. There is no priority between them - it is a single FIFO queue, so they run in the order
they were queued.

Step | Action                                   | Call Stack | Microtask Queue | Macrotask Queue
-----|------------------------------------------|------------|-----------------|----------------
 1   | prints "A"                               | global     | -               | -
 2   | setTimeout -> B queued                   | global     | -               | B
 3   | queueMicrotask(C)                        | global     | C               | B
 4   | Promise.resolve().then(D)                | global     | C, D            | B
 5   | queueMicrotask(E)                        | global     | C, D, E         | B
 6   | prints "F"                               | global     | C, D, E         | B
 7   | drain microtasks -> "C", "D", "E"        | C / D / E  | -               | B
 8   | next macrotask -> "B"                    | B          | -               | -

KEY RULE: queueMicrotask and Promise.then share one FIFO microtask queue; all of it runs
          before any timer.
COMMON MISTAKE: Thinking promises have higher priority than queueMicrotask (answering D C E)
          or that queueMicrotask behaves like setTimeout.
*/
