/*
==========================================================================================
QUESTION 7: Two .then chains interleave
Topic: Event Loop   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

Promise.resolve()
  .then(() => console.log("a1"))
  .then(() => console.log("a2"))
  .then(() => console.log("a3"));

Promise.resolve()
  .then(() => console.log("b1"))
  .then(() => console.log("b2"))
  .then(() => console.log("b3"));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
a1
b1
a2
b2
a3
b3

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Each .then() returns a NEW promise. The callback of the next .then in a chain can only be
queued when the PREVIOUS callback has finished (that is when its promise resolves). So a
chain never puts more than one callback in the queue at a time - the two chains take turns.

Step | Action                                        | Call Stack | Microtask Queue | Macrotask Queue
-----|-----------------------------------------------|------------|-----------------|----------------
 1   | sync: build both chains. Only a1 and b1 can   | global     | a1, b1          | -
     |   be queued (their source promise is already  |            |                 |
     |   resolved); a2/a3/b2/b3 wait on pending ones |            |                 |
 2   | run a1 -> prints "a1", its promise resolves   | a1         | b1, a2          | -
     |   -> a2 queued at the BACK                    |            |                 |
 3   | run b1 -> prints "b1" -> b2 queued            | b1         | a2, b2          | -
 4   | run a2 -> prints "a2" -> a3 queued            | a2         | b2, a3          | -
 5   | run b2 -> prints "b2" -> b3 queued            | b2         | a3, b3          | -
 6   | run a3, then b3                               | a3 / b3    | -               | -

KEY RULE: Chained .then callbacks are queued one at a time, only after the previous one
          finishes; independent chains therefore interleave.
COMMON MISTAKE: Answering a1 a2 a3 b1 b2 b3, as if a whole chain runs in one go.
*/
