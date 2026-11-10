/*
==========================================================================================
QUESTION 2: let in the Temporal Dead Zone
Topic: Hoisting and TDZ   |   Difficulty: Easy
==========================================================================================
What will be the output of the following code?
*/

console.log("start");
console.log(b);
let b = 5;
console.log("end");

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
start
ReferenceError: Cannot access 'b' before initialization

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
1. Creation phase: `let b` IS hoisted - the engine knows the binding `b` exists in
   this scope - but unlike `var` it is NOT initialized. It stays "uninitialized".
2. The period from the start of the scope until the `let b = 5` line actually executes
   is called the Temporal Dead Zone (TDZ). Any read/write of `b` in the TDZ throws.
3. Execution phase:
   - "start" is printed.
   - `console.log(b)` touches `b` while it is in the TDZ -> ReferenceError is thrown.
   - The script stops, so `let b = 5` and "end" never run.

Note the error message: "Cannot access 'b' before initialization" (the variable exists
but isn't initialized) vs "b is not defined" (no such variable at all).

KEY RULE: let/const/class are hoisted but uninitialized; accessing them before their declaration line runs throws a ReferenceError.
COMMON MISTAKE: Saying let/const are "not hoisted" and expecting "b is not defined", or expecting `undefined` like var.
FOLLOW-UP: Same code with `const b = 5`? -> identical ReferenceError. With `var b = 5`? -> "start", "undefined", "end".
*/
