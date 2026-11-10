/*
==========================================================================================
QUESTION 10: Stale closure - a value computed once
Topic: Scope and Closures   |   Difficulty: Hard
==========================================================================================
What will be the output of the following code?
*/

function createIncrement() {
  let count = 0;

  function increment() {
    count++;
  }

  let message = `Count is ${count}`;

  function log() {
    console.log(message);
    console.log(`Actual count is ${count}`);
  }

  return [increment, log];
}

const [increment, log] = createIncrement();
increment();
increment();
increment();
log();

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
Count is 0
Actual count is 3

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. createIncrement() runs ONCE. During that run:
     count = 0
     message = `Count is ${count}` is evaluated right now -> the string "Count is 0".
   A template literal produces a plain string immediately; it does not stay "linked"
   to count.
2. increment and log both close over the same scope (count and message).
3. increment() x3 -> count becomes 3. message is never recomputed, so it stays
   "Count is 0".
4. log() prints message -> "Count is 0", and then builds a NEW template string using
   the current count -> "Actual count is 3".

KEY RULE: A closure sees the current value of the captured variables, but any value derived from them earlier (like a string) is a snapshot frozen at the time it was computed.
COMMON MISTAKE: Answering "Count is 3" - thinking message updates automatically because it was built from count.
FOLLOW-UP: Fix? Compute the message inside log: `console.log(\`Count is ${count}\`)`. (This is the classic "stale closure" bug seen in React hooks.)
*/
