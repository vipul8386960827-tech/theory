/*
==========================================================================================
QUESTION 5: try/catch around setTimeout
Topic: Errors, try/catch/finally and Loops   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

try {
  setTimeout(() => {
    throw new Error('async boom');
  }, 0);
  console.log('timer scheduled');
} catch (e) {
  console.log('caught:', e.message);
}

console.log('after try');

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
timer scheduled
after try
Uncaught Error: async boom

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. Inside try, setTimeout only REGISTERS the callback and returns immediately - it does
   not throw. 'timer scheduled' is logged and the try block finishes without errors,
   so catch is skipped.
2. 'after try' is logged. The script ends.
3. Later, the event loop runs the timer callback. It throws, but at this moment the call
   stack is: [timer callback] only. The try/catch finished long ago and is not on the
   stack, so nothing catches it -> uncaught error.
   (Browser console: "Uncaught Error: async boom". Node prints the stack trace and exits
   the process with a non-zero code.)

KEY RULE: try/catch only catches errors thrown synchronously while the try block is on
the call stack. Put the try/catch INSIDE the async callback (or use promises + await).
COMMON MISTAKE: Answering 'caught: async boom'.
FOLLOW-UP: Fix -> setTimeout(() => { try { throw ... } catch (e) { ... } }, 0);
*/
