/*
==========================================================================================
QUESTION 9: Returning a promise from .then costs extra ticks
Topic: Promises   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

Promise.resolve()
  .then(() => {
    console.log("A1");
    return Promise.resolve("A-value");
  })
  .then((v) => console.log("A2:", v));

Promise.resolve()
  .then(() => console.log("B1"))
  .then(() => console.log("B2"))
  .then(() => console.log("B3"))
  .then(() => console.log("B4"))
  .then(() => console.log("B5"));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
A1
B1
B2
B3
A2: A-value
B4
B5

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
When a .then callback returns a plain value, the next .then is queued right away.
When it returns a PROMISE (any thenable), the outer promise must "adopt" it:
  tick +1: a NewPromiseResolveThenableJob runs and calls returnedPromise.then(resolveOuter)
  tick +2: that inner .then callback runs and finally resolves the outer promise
  tick +3: only now is the next .then (A2) queued and run
So returning a promise delays the chain by 2 extra microtask ticks.

Let PA = the promise returned by the first A-.then, R = Promise.resolve("A-value").

Tick | Run (Call Stack)                          | Microtask Queue after this step  | Macrotask Queue
-----|-------------------------------------------|----------------------------------|----------------
 0   | sync: build both chains                   | A1, B1                           | -
 1   | A1: prints "A1", returns R -> queue       | B1, Thenable(PA<-R)              | -
     |   resolve-thenable job (PA still pending) |                                  |
 1   | B1: prints "B1"                           | Thenable(PA<-R), B2              | -
 2   | Thenable job: R.then(resolvePA) -> R is   | B2, resolvePA                    | -
     |   already fulfilled, so queue resolvePA   |                                  |
 2   | B2: prints "B2"                           | resolvePA, B3                    | -
 3   | resolvePA("A-value") -> PA fulfilled ->   | B3, A2                           | -
     |   A2 queued                               |                                  |
 3   | B3: prints "B3"                           | A2, B4                           | -
 4   | A2: prints "A2: A-value"                  | B4                               | -
 4   | B4, then B5                               | -                                | -

KEY RULE: `return somePromise` inside .then (or inside an async function) adds 2 extra
          microtask ticks compared with returning a plain value.
COMMON MISTAKE: Answering A1 B1 A2 B2 ... (one tick) - treating the returned promise as if
          it were its value.
FOLLOW-UP: If the callback returned "A-value" directly, the output would be
          A1, B1, A2: A-value, B2, B3, B4, B5.
*/
