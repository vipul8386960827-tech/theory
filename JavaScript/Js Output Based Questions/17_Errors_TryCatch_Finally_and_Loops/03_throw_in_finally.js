/*
==========================================================================================
QUESTION 3: throw inside finally
Topic: Errors, try/catch/finally and Loops   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

function a() {
  try {
    throw new Error('from try');
  } finally {
    throw new Error('from finally');
  }
}

function b() {
  try {
    return 'ok';
  } finally {
    throw new Error('boom');
  }
}

try {
  a();
} catch (e) {
  console.log('a:', e.message);
}

try {
  console.log('b returned:', b());
} catch (e) {
  console.log('b:', e.message);
}

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
a: from finally
b: boom

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
a():
1. try throws 'from try'. There is no catch, so this error is "pending".
2. finally runs and throws 'from finally'. The new throw REPLACES the pending one - the
   original error is lost completely.
3. The outer catch receives only 'from finally'.

b():
4. try schedules `return 'ok'`.
5. finally throws 'boom', which replaces the pending return. b() never returns a value.
6. Because b() throws, console.log('b returned:', ...) never runs; the outer catch logs
   'b: boom'.

KEY RULE: An exception thrown in finally replaces any pending return value or exception
from try/catch.
COMMON MISTAKE: Answering 'a: from try' or printing 'b returned: ok'.
*/
