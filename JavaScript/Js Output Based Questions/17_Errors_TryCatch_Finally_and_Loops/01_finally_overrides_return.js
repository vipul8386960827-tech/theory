/*
==========================================================================================
QUESTION 1: return in finally overrides try/catch
Topic: Errors, try/catch/finally and Loops   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

function f1() {
  try {
    return 'try';
  } finally {
    return 'finally';
  }
}

function f2() {
  try {
    throw new Error('oops');
  } catch (e) {
    return 'catch';
  } finally {
    return 'finally';
  }
}

function f3() {
  try {
    throw new Error('lost error');
  } finally {
    return 'finally swallowed it';
  }
}

console.log(f1());
console.log(f2());
console.log(f3());

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
finally
finally
finally swallowed it

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
The finally block ALWAYS runs, even after a return or throw in try/catch. If finally
itself completes "abruptly" (with its own return/throw), that replaces whatever try or
catch was doing.

f1: try schedules `return 'try'`, then finally runs `return 'finally'` -> that wins.
f2: try throws, catch schedules `return 'catch'`, finally's return replaces it.
f3: try throws, there is no catch - normally the error would propagate - but finally's
    return replaces the pending throw. The error is silently swallowed!

KEY RULE: A return (or throw) inside finally overrides any return value or exception
coming from try/catch.
COMMON MISTAKE: Answering 'try' / 'catch', or expecting f3 to throw 'lost error'.
FOLLOW-UP: That's why linters (no-unsafe-finally) warn against return in finally.
*/
