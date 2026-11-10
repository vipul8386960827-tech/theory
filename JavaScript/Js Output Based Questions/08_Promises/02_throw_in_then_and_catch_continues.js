/*
==========================================================================================
QUESTION 2: Throwing inside .then, and the chain after .catch
Topic: Promises   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

Promise.resolve(1)
  .then((x) => {
    console.log("then 1:", x);
    throw new Error("boom");
  })
  .then((x) => {
    console.log("then 2:", x);
    return x;
  })
  .catch((err) => {
    console.log("catch:", err.message);
    return "recovered";
  })
  .then((x) => console.log("then 3:", x))
  .catch(() => console.log("second catch"))
  .then((x) => console.log("then 4:", x));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
then 1: 1
catch: boom
then 3: recovered
then 4: undefined

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Think of a promise chain as a try/catch that runs over time:
  - throwing inside a callback REJECTS the promise returned by that .then
  - a rejection SKIPS every .then success handler until it reaches a .catch
  - .catch is just .then(undefined, handler); if the handler returns normally, the promise it
    returns is FULFILLED with that value, so the chain continues on the success path.

Step | Handler                     | Incoming state       | What happens                    | Microtask Queue (next)
-----|-----------------------------|----------------------|---------------------------------|-----------------------
 1   | then 1                      | fulfilled(1)         | prints "then 1: 1", throws      | then 2 (as rejection)
 2   | then 2                      | rejected(boom)       | no onRejected -> SKIPPED,       | catch
     |                             |                      |   rejection passed on           |
 3   | catch                       | rejected(boom)       | prints "catch: boom",           | then 3
     |                             |                      |   returns "recovered"           |
 4   | then 3                      | fulfilled(recovered) | prints "then 3: recovered",     | second catch
     |                             |                      |   returns undefined             |
 5   | second catch                | fulfilled(undefined) | no onFulfilled -> SKIPPED,      | then 4
     |                             |                      |   value passed on               |
 6   | then 4                      | fulfilled(undefined) | prints "then 4: undefined"      | -

(Call Stack: only one handler runs at a time; Macrotask Queue: empty the whole time.)

KEY RULE: .catch recovers the chain; whatever it returns becomes the fulfillment value for
          the next .then.
COMMON MISTAKE: Thinking the chain "stops" after catch, or that "then 2" runs with undefined.
*/
