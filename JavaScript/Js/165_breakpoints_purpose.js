/* 165_breakpoints_purpose.js

=====================================================
Breakpoints in JavaScript Debugging
=====================================================

Definition:
- Breakpoints are markers set in code to pause execution at a specific line.
- Used to inspect variables, call stack, and program flow.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Setting Breakpoints in Browser Dev Tools
   - Open developer tools (F12 or Cmd+Option+I).
   - Go to "Sources" tab, click line number to set breakpoint.
   - Example:
     function add(a, b) {
         return a + b; // Set breakpoint here
     }
     add(2, 3);

2. Conditional Breakpoints
   - Pause execution only when a condition is true.
   - Example:
     function check(i) {
         // Pause only if i === 5
         debugger;
         console.log(i);
     }

3. Breakpoints in Loops
   - Inspect loop variables at each iteration.
   - Example:
     for (let i = 0; i < 5; i++) {
         // Breakpoint here
         console.log(i);
     }

4. Breakpoints with Event Listeners
   - Pause code when a specific event occurs (click, input, etc.).
   - Useful to debug dynamic UI interactions.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Breakpoints are like **stopping at traffic lights**:
  - Allows you to check everything before moving forward.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between `debugger` statement and breakpoints?
A1: `debugger` is in-code and triggers automatically; breakpoints are set in dev tools.

Q2: Can breakpoints be conditional?
A2: Yes, dev tools allow setting conditions for breakpoints.

Q3: Do breakpoints affect code execution in production?
A3: No, they only affect debugging sessions.

Q4: How to inspect variables at a breakpoint?
A4: Use the "Scope" panel in dev tools or hover over variables.

Q5: Can breakpoints be set in minified code?
A5: Yes, but source maps are needed for better readability.
*/
