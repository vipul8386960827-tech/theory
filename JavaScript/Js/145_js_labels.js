/* 145_js_labels.js

=====================================================
Labels in JavaScript
=====================================================

Definition:
- Labels allow you to name a loop or a block of code.
- Can be used with `break` or `continue` to control outer loops.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Basic Label Usage
   - Syntax: `labelName: statement`
   - Example:
     outerLoop: for (let i = 0; i < 3; i++) {
         for (let j = 0; j < 3; j++) {
             if (i === 1 && j === 1) break outerLoop;
             console.log(i, j);
         }
     }
   - Output: 0 0, 0 1, 0 2

2. Using `continue` with Labels
   - Skip current iteration of an outer loop.
   - Example:
     outer: for (let i = 0; i < 3; i++) {
         for (let j = 0; j < 3; j++) {
             if (j === 1) continue outer;
             console.log(i, j);
         }
     }
   - Output: 0 0, 1 0, 2 0

3. Label Restrictions
   - Labels can only precede statements (loops or blocks).
   - Cannot label function declarations in strict mode.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Labels are like **road signs**:
  - They direct control flow to jump to specific loops or blocks.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Are labels commonly used in JavaScript?
A1: Rarely, mostly for nested loops; often avoidable with functions.

Q2: Difference between `break` and `continue` with labels?
A2: `break label` exits the labeled loop; `continue label` skips to next iteration of labeled loop.

Q3: Can labels be used with switch statements?
A3: Yes, you can label a block containing a switch.

Q4: Can you have multiple labels for one loop?
A4: No, one label per statement; but nested labels are possible for nested loops.

Q5: Are there performance concerns with labels?
A5: Minimal; main concern is readability and maintainability.
*/
