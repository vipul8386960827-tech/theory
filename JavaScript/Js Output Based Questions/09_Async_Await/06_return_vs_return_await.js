/*
==========================================================================================
QUESTION 6: return vs return await inside try/catch
Topic: Async / Await   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

async function rejects() {
  throw new Error("rejected");
}

async function returnOnly() {
  try {
    return rejects();
  } catch (e) {
    return "caught in returnOnly";
  }
}

async function returnAwait() {
  try {
    return await rejects();
  } catch (e) {
    return "caught in returnAwait";
  }
}

(async () => {
  try {
    console.log("returnOnly resolved:", await returnOnly());
  } catch (e) {
    console.log("returnOnly rejected:", e.message);
  }

  try {
    console.log("returnAwait resolved:", await returnAwait());
  } catch (e) {
    console.log("returnAwait rejected:", e.message);
  }
})();

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
returnOnly rejected: rejected
returnAwait resolved: caught in returnAwait

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
returnOnly:
  `return rejects()` hands the rejected promise back to the caller WITHOUT waiting for it.
  The `try` block finishes successfully (returning a promise object is not an error), so the
  local catch never runs. The async function's promise then adopts the rejected promise, and
  the CALLER sees the rejection -> "returnOnly rejected: rejected".

returnAwait:
  `return await rejects()` waits for the promise INSIDE the try block. The await throws the
  rejection right there, the local catch runs and returns its string -> the async function
  fulfills -> "returnAwait resolved: caught in returnAwait".

Step | Action                                             | Call Stack   | Microtask Queue      | Macrotask Queue
-----|----------------------------------------------------|--------------|----------------------|----------------
 1   | IIFE: await returnOnly(); returnOnly returns a     | IIFE         | adopt rejected promise| -
     |   promise that adopts the rejected one             |              |                      |
 2   | adoption completes -> returnOnly's promise rejects | -            | resume IIFE (throw)  | -
 3   | IIFE resumes, await throws -> outer catch prints   | IIFE         | -                    | -
     |   "returnOnly rejected: rejected"                  |              |                      |
 4   | await returnAwait(): inside, await rejects() pauses| returnAwait  | resume returnAwait   | -
 5   | returnAwait resumes with a throw -> local catch    | returnAwait  | resume IIFE          | -
     |   -> returns "caught in returnAwait"               |              |                      |
 6   | IIFE resumes -> prints "returnAwait resolved: ..." | IIFE         | -                    | -

KEY RULE: Inside try/catch, use `return await` if you want the local catch (or finally) to
          handle a rejection. Plain `return promise` lets the rejection escape to the caller.
COMMON MISTAKE: Thinking both functions behave the same because "return await is redundant".
          It is only redundant OUTSIDE try/catch.
*/
