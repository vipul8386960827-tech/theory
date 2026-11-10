/*
==========================================================================================
QUESTION 5: this inside setTimeout callbacks
Topic: this Keyword   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

const timer = {
  seconds: 10,
  startRegular() {
    setTimeout(function () {
      console.log("regular:", this.seconds);
    }, 0);
  },
  startArrow() {
    setTimeout(() => {
      console.log("arrow:", this.seconds);
    }, 0);
  },
  logSeconds() {
    console.log("method ref:", this.seconds);
  },
};

timer.startRegular();
timer.startArrow();
setTimeout(timer.logSeconds, 0);
setTimeout(() => timer.logSeconds(), 0);

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
regular: undefined
arrow: 10
method ref: undefined
method ref: 10

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
setTimeout stores the callback and later calls it as a plain function - not as a method
of your object. (In browsers, `this` in such a callback is window; in Node it is the
Timeout object. Neither has a `seconds` property, so the output is the same.)

All four timers have delay 0, so they run in the order they were scheduled:
1. startRegular: the regular callback is called by the timer -> this is NOT timer
   -> "regular: undefined".
2. startArrow: the arrow captured `this` from startArrow, which was called as
   timer.startArrow() -> this = timer -> "arrow: 10".
3. setTimeout(timer.logSeconds) passes only the function reference; the method gets
   detached from timer -> "method ref: undefined".
4. The wrapper arrow calls timer.logSeconds() with the dot -> this = timer
   -> "method ref: 10".

KEY RULE: Passing a method as a callback loses its `this`. Use an arrow wrapper, an arrow callback inside the method, or .bind(obj).
COMMON MISTAKE: Answering 10 for all lines, or thinking setTimeout calls the callback "on" the object that scheduled it.
*/
