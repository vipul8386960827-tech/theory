/*
==========================================================================================
QUESTION 12: TDZ is about time, not position in the code
Topic: Hoisting and TDZ   |   Difficulty: Medium
==========================================================================================
What will be the output of the following code?
*/

function show() {
  console.log(message);
}

let message = "hello";
show();

function early() {
  console.log(later);
}

early();
const later = "too late";

/*
------------------------------------------------------------------------------------------
OUTPUT
------------------------------------------------------------------------------------------
hello
ReferenceError: Cannot access 'later' before initialization

------------------------------------------------------------------------------------------
EXPLANATION
------------------------------------------------------------------------------------------
Both `show` and `early` reference a variable that is declared textually BELOW them.
That is fine - what matters is WHEN the variable is accessed.

1. Creation phase: show and early are fully hoisted; `message` and `later` are hoisted
   but uninitialized (TDZ).
2. `let message = "hello"` executes -> message leaves the TDZ.
3. show() runs and reads message -> it is initialized -> prints "hello".
4. early() runs and reads `later` - but `const later = ...` has NOT executed yet, so
   `later` is still in its TDZ -> ReferenceError. The script stops.

KEY RULE: The TDZ is "temporal": it lasts from the start of the scope until the declaration line is executed. Code that runs after initialization can access the variable, wherever it is written.
COMMON MISTAKE: Thinking any function written above a let/const declaration can never use it, or thinking both calls succeed because the functions were hoisted.
*/
