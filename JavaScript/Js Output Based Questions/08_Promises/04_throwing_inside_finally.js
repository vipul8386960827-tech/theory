/*
==========================================================================================
QUESTION 4: Throwing inside .finally
Topic: Promises   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

Promise.resolve("ok")
  .finally(() => {
    throw new Error("from finally");
  })
  .then((value) => console.log("then:", value))
  .catch((err) => {
    console.log("catch 1:", err.message);
    return Promise.reject(new Error("original"));
  })
  .finally(() => console.log("cleanup"))
  .catch((err) => console.log("catch 2:", err.message));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
catch 1: from finally
cleanup
catch 2: original

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
.finally normally passes the outcome through untouched, BUT if the finally callback throws
(or returns a rejected promise), the chain is rejected with THAT new error and the
original value is lost.

Step | Handler     | Incoming state        | What happens                              | Outgoing state
-----|-------------|-----------------------|-------------------------------------------|----------------------
 1   | finally     | fulfilled("ok")       | throws "from finally"                     | rejected(from finally)
 2   | then        | rejected              | success handler skipped                   | rejected(from finally)
 3   | catch 1     | rejected              | prints "catch 1: from finally", returns   | rejected(original)
     |             |                       |   a rejected promise -> the .catch's own  |
     |             |                       |   promise ADOPTS that rejection           |
 4   | finally     | rejected(original)    | prints "cleanup", returns undefined ->    | rejected(original)
     |             |                       |   ignored, rejection passes through       |
 5   | catch 2     | rejected(original)    | prints "catch 2: original"                | fulfilled(undefined)

(Each step is one microtask (plus internal adoption ticks); the macrotask queue stays empty.)

KEY RULE: finally can REPLACE the outcome only by failing (throw / rejected promise); a
          normal return value from finally is always ignored.
COMMON MISTAKE: Answering "then: ok" (thinking finally can never change the result), or
          thinking catch 1 "fixes" the chain even though it returned a rejected promise.
*/
