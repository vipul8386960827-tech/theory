/*
==========================================================================================
QUESTION 5: try/catch with await vs without await
Topic: Async / Await   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

async function failing() {
  throw new Error("failed!");
}

async function withAwait() {
  try {
    await failing();
  } catch (e) {
    console.log("withAwait caught:", e.message);
  }
}

async function withoutAwait() {
  let p;
  try {
    p = failing(); // no await
  } catch (e) {
    console.log("withoutAwait caught:", e.message);
  }
  console.log("withoutAwait: try/catch saw nothing");
  return p;
}

withAwait();
withoutAwait().catch((e) => console.log("outer caught:", e.message));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
withoutAwait: try/catch saw nothing
withAwait caught: failed!
outer caught: failed!

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Calling an async function never throws synchronously - it returns a REJECTED PROMISE. A
try/catch only catches errors thrown synchronously inside the try block, OR rejections that
you `await` inside the try block (await turns a rejection back into a throw).

Step | Action                                                 | Call Stack    | Microtask Queue     | Macrotask Queue
-----|--------------------------------------------------------|---------------|---------------------|----------------
 1   | withAwait(): failing() returns rejected promise R1;    | withAwait     | resume-withAwait    | -
     |   await R1 -> pause                                    |               |                     |
 2   | withoutAwait(): p = failing() -> rejected promise R2,  | withoutAwait  | resume-withAwait    | -
     |   nothing thrown -> catch block skipped                |               |                     |
 3   | prints "withoutAwait: try/catch saw nothing"           | withoutAwait  | resume-withAwait    | -
 4   | return p -> the async function's promise must ADOPT R2 | global        | resume-withAwait,   | -
     |   (2 extra ticks); .catch(outer) attached to it        |               |   adopt-R2          |
 5   | withAwait resumes: await throws R1's error ->          | withAwait     | adopt-R2 ...        | -
     |   prints "withAwait caught: failed!"                   |               |                     |
 6   | after the adoption ticks, withoutAwait's promise       | catch cb      | -                   | -
     |   rejects -> prints "outer caught: failed!"            |               |                     |

KEY RULE: try/catch inside an async function only catches a promise rejection if you AWAIT
          that promise inside the try.
COMMON MISTAKE: Expecting "withoutAwait caught: failed!" to be printed.
FOLLOW-UP: If withoutAwait did not return p, and nobody attached a .catch, the browser would
          log "Uncaught (in promise) Error: failed!".
*/
