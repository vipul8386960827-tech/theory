/* 144_break_continue.js

=====================================================
Break and Continue Statements in JavaScript
=====================================================

Definition:
- `break` and `continue` are control statements used inside loops.
- `break` exits the loop entirely.
- `continue` skips the current iteration and moves to the next one.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Using `break`
   - Stops the loop when a condition is met.
   - Example:
     for (let i = 0; i < 5; i++) {
         if (i === 3) break;
         console.log(i);
     }
   - Output: 0, 1, 2

2. Using `continue`
   - Skips the current iteration.
   - Example:
     for (let i = 0; i < 5; i++) {
         if (i === 3) continue;
         console.log(i);
     }
   - Output: 0, 1, 2, 4

3. Nested Loops with Labels
   - Can use labels to break/continue outer loops.
   - Example:
     outer: for (let i = 0; i < 3; i++) {
         for (let j = 0; j < 3; j++) {
             if (i === 1 && j === 1) break outer;
             console.log(i, j);
         }
     }
   - Output: 0 0, 0 1, 0 2

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- `break` is like **exiting a room** completely.
- `continue` is like **skipping a chair and moving to the next**.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between `break` and `continue`?
A1: `break` exits the loop entirely; `continue` skips only current iteration.

Q2: Can `break` be used outside loops?
A2: No, it will cause a syntax error.

Q3: Can `continue` be used outside loops?
A3: No, it is valid only inside loops.

Q4: Why use labels with loops?
A4: To break or continue outer loops in nested scenarios.

Q5: Do `break` and `continue` work with `forEach`?
A5: No, `forEach` does not support them; use `for` or `for...of` instead.
*/
