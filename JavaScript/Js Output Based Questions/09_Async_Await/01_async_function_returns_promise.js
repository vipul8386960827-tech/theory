/*
==========================================================================================
QUESTION 1: An async function always returns a promise
Topic: Async / Await   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

async function getValue() {
  return 42;
}

async function throwsError() {
  throw new Error("fail");
}

const result = getValue();
console.log(result instanceof Promise);
console.log(typeof result);

result.then((v) => console.log("value:", v));
throwsError().catch((e) => console.log("caught:", e.message));

console.log("end");

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
true
object
end
value: 42
caught: fail

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Marking a function `async` wraps its outcome in a promise:
  - `return x`  -> the returned promise is fulfilled with x
  - `throw err` -> the returned promise is REJECTED with err (the error does not escape
                   synchronously; a surrounding try/catch without await would not see it)

Step | Action                                         | Call Stack  | Microtask Queue    | Macrotask Queue
-----|------------------------------------------------|-------------|--------------------|----------------
 1   | getValue() runs, returns fulfilled promise(42) | getValue    | -                  | -
 2   | prints true, then "object" (typeof a promise)  | global      | -                  | -
 3   | result.then(cb) -> already fulfilled -> queued | global      | value-cb           | -
 4   | throwsError() -> returns rejected promise;     | global      | value-cb, catch-cb | -
     |   .catch(cb) -> queued                         |             |                    |
 5   | prints "end"                                   | global      | value-cb, catch-cb | -
 6   | prints "value: 42", then "caught: fail"        | callbacks   | -                  | -

KEY RULE: async functions ALWAYS return a promise; to get the value use await or .then.
COMMON MISTAKE: Expecting console.log(getValue()) to print 42, or expecting throwsError() to
          crash the script synchronously.
*/
