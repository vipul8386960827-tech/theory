/*
==========================================================================================
QUESTION 11: once() - a closure that remembers it already ran
Topic: Scope and Closures   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}

const init = once((x) => {
  console.log("init ran with", x);
  return x * 2;
});

console.log(init(5));
console.log(init(10));
console.log(init(20));

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
init ran with 5
10
10
10

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. once(fn) runs once, creating a scope with called = false, result = undefined, and
   returns an inner function that closes over called, result and fn.
2. init(5): called is false -> set called = true, run fn(5) which logs
   "init ran with 5" and returns 10 -> result = 10. Return 10 -> printed.
3. init(10): called is true -> skip fn entirely, return the cached result 10.
4. init(20): same -> 10.

The state (called, result) lives in the closure, persisting between calls but hidden
from the outside world.

KEY RULE: Closures let a function keep private, persistent state between calls (memoization, once, rate limiting, etc.).
COMMON MISTAKE: Expecting 20 and 40 for the later calls or expecting "init ran" to be logged each time.
*/
