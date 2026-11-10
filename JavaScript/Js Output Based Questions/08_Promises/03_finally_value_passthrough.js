/*
==========================================================================================
QUESTION 3: .finally passes the value through
Topic: Promises   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

Promise.resolve("A")
  .finally(() => {
    console.log("finally 1");
    return "ignored";
  })
  .then((value) => {
    console.log("then:", value);
    throw new Error("B");
  })
  .finally(() => console.log("finally 2"))
  .catch((err) => console.log("catch:", err.message))
  .finally((arg) => console.log("finally 3 arg:", arg));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
finally 1
then: A
finally 2
catch: B
finally 3 arg: undefined

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
.finally(cb) is for cleanup. It has three special rules:
  1. cb receives NO arguments - it does not know if the promise fulfilled or rejected.
  2. cb's return value is IGNORED; the original value (or rejection reason) passes through.
  3. Exception: if cb throws or returns a rejected promise, that new error replaces the
     original outcome (see the next question).

Step | Handler          | Incoming state      | What happens                         | Outgoing state
-----|------------------|---------------------|--------------------------------------|---------------------
 1   | finally 1        | fulfilled("A")      | prints "finally 1", returns          | fulfilled("A")
     |                  |                     |   "ignored" -> ignored               |   (passed through)
 2   | then             | fulfilled("A")      | prints "then: A", throws B           | rejected(B)
 3   | finally 2        | rejected(B)         | runs on rejection too, prints        | rejected(B)
     |                  |                     |   "finally 2"                        |   (passed through)
 4   | catch            | rejected(B)         | prints "catch: B", returns undefined | fulfilled(undefined)
 5   | finally 3        | fulfilled(undefined)| arg is undefined because finally     | fulfilled(undefined)
     |                  |                     |   callbacks get no argument at all   |

All handlers run as microtasks one after another (Call Stack: one handler at a time,
Macrotask Queue: empty). Note: .finally internally waits an extra tick or two compared with
.then, which only matters when you race it against another chain.

KEY RULE: finally sees nothing and changes nothing - the value/error flows through it
          (unless finally itself throws).
COMMON MISTAKE: Answering "then: ignored", or expecting finally's argument to be the value.
*/
