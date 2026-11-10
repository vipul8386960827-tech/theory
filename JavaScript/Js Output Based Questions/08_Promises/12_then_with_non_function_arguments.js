/*
==========================================================================================
QUESTION 12: .then with non-function arguments
Topic: Promises   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log);

Promise.reject(new Error("E"))
  .then(null)
  .then((v) => console.log("never:", v), undefined)
  .catch((e) => console.log("caught:", e.message));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
1
caught: E

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
.then(onFulfilled, onRejected): if an argument is NOT a function, it is ignored and replaced
by a default:
  onFulfilled default: value => value      (pass the value through)
  onRejected  default: err => { throw err } (pass the error through)

Chain 1:
  .then(2)                    -> 2 is a number, ignored -> passes 1 through
  .then(Promise.resolve(3))   -> a promise OBJECT is not a function either -> passes 1 through
                                 (the value 3 is never used!)
  .then(console.log)          -> console.log IS a function -> called with 1 -> prints 1

Chain 2:
  .then(null)                 -> passes the rejection through
  .then(fn, undefined)        -> fn is only for success; undefined onRejected -> rejection
                                 passes through, fn never runs
  .catch(...)                 -> prints "caught: E"

Tick | Chain 1 (Call Stack)              | Chain 2 (Call Stack)        | Microtask Queue after tick
-----|-----------------------------------|-----------------------------|---------------------------
 0   | sync: build chains                |                             | c1-then(2), c2-then(null)
 1   | then(2): pass 1                   | then(null): pass error      | c1-then(P), c2-then(fn)
 2   | then(P): pass 1                   | then(fn,undef): pass error  | c1-log, c2-catch
 3   | console.log(1) -> prints 1        | catch -> prints "caught: E" | -
(Macrotask Queue: empty.) Both chains have 3 links, chain 1 was built first, so "1" prints
first.

KEY RULE: Non-function arguments to .then/.catch are ignored - the value or error simply
          passes through.
COMMON MISTAKE: Answering 3 (thinking .then(Promise.resolve(3)) replaces the value) or 2.
*/
