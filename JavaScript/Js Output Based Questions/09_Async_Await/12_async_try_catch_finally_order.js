/*
==========================================================================================
QUESTION 12: try / catch / finally inside async functions
Topic: Async / Await   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

async function f() {
  try {
    console.log("try f");
    return "from try";
  } finally {
    console.log("finally f");
  }
}

async function g() {
  try {
    await Promise.reject(new Error("x"));
    console.log("never printed");
  } catch (e) {
    console.log("catch g:", e.message);
    return "from catch";
  } finally {
    console.log("finally g");
  }
}

f().then((v) => console.log("f resolved:", v));
g().then((v) => console.log("g resolved:", v));
console.log("sync end");

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
try f
finally f
sync end
f resolved: from try
catch g: x
finally g
g resolved: from catch

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
f has no await, so the WHOLE body - including finally - runs synchronously. `return` inside
try still runs the finally block before the function actually returns. The returned promise
is fulfilled with "from try" immediately; only the .then callback is async.

g awaits a rejected promise. The await pauses g; when it resumes, the rejection is thrown at
the await line and lands in catch, then finally runs, then g's promise fulfills with
"from catch".

Step | Action                                          | Call Stack | Microtask Queue         | Macrotask Queue
-----|-------------------------------------------------|------------|-------------------------|----------------
 1   | f(): prints "try f", return -> finally runs:    | f          | -                       | -
     |   prints "finally f"; f's promise fulfilled     |            |                         |
 2   | f().then(cb) -> queued at once                  | global     | f-cb                    | -
 3   | g(): await rejected promise -> pause            | g          | f-cb, g-resume          | -
 4   | g().then(cb) -> g's promise pending, registered | global     | f-cb, g-resume          | -
 5   | prints "sync end"                               | global     | f-cb, g-resume          | -
 6   | f-cb: prints "f resolved: from try"             | f-cb       | g-resume                | -
 7   | g resumes with a throw: "catch g: x",           | g          | g-cb                    | -
     |   return -> finally: "finally g"; g fulfills    |            |                         |
 8   | g-cb: prints "g resolved: from catch"           | g-cb       | -                       | -

KEY RULE: Without an await, an async function body runs fully synchronously (finally
          included). `finally` runs before the function's promise settles.
COMMON MISTAKE: Thinking "finally f" prints after "sync end" because f is async, or printing
          "never printed".
FOLLOW-UP: If finally contained its own `return "from finally"`, that value would REPLACE the
          try/catch return value.
*/
