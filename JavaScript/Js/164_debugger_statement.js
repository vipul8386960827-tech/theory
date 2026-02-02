/* 164_debugger_statement.js

=====================================================
Debugger Statement in JavaScript
=====================================================

Definition:
- The `debugger` statement is used to pause JavaScript execution
  and start debugging in browser developer tools or IDE.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Basic Usage
   - Insert `debugger;` in your code where you want to pause.
   - Example:
     function add(a, b) {
         debugger;
         return a + b;
     }
     add(2, 3);
   - When developer tools are open, execution stops at `debugger`.

2. Conditional Debugging
   - Can use conditions to pause only in certain cases.
   - Example:
     function process(value) {
         if (value > 10) debugger;
         console.log(value);
     }
     process(15); // Pauses
     process(5);  // Does not pause

3. Common Uses
   - Inspect variables and call stack.
   - Step through code line by line.
   - Test code behavior in complex functions.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- `debugger` is like a **pause button on a video**:
  - Lets you freeze execution to analyze the current state.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Does `debugger` work without developer tools open?
A1: No, it only pauses execution if a debugger is available.

Q2: Difference between `debugger` and `console.log`?
A2: `debugger` pauses execution for inspection; `console.log` only prints values.

Q3: Can `debugger` be used in production code?
A3: It's not recommended; remove before deploying to avoid interruptions.

Q4: How to resume execution after hitting `debugger`?
A4: Use the resume/continue button in browser dev tools or IDE debugger.

Q5: Can `debugger` be used inside loops?
A5: Yes, it pauses each time the statement is reached, useful for iterative debugging.
*/
