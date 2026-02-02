/* 463_node_inspect.js

=====================================================
Node.js Inspector
=====================================================

Definition (What I should say in the interview):
- "The Node.js Inspector is a **built-in debugging tool** that allows developers to debug Node.js applications using the Chrome DevTools or other compatible debuggers. 
   It provides breakpoints, step-through execution, profiling, and inspection of variables, making debugging efficient and interactive."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **Starting the Inspector**
   - Run Node.js with `--inspect` or `--inspect-brk` flags:
     - `--inspect` → Starts the debugger.
     - `--inspect-brk` → Starts debugger and pauses execution at the first line.
   - Connect to Chrome DevTools at `chrome://inspect`.

2. **Breakpoints**
   - Set breakpoints in DevTools or via `debugger;` statements in code.
   - Pause and resume code execution at breakpoints.

3. **Variable Inspection**
   - Inspect local, global, and closure variables.
   - View call stacks and scope chains.

4. **Profiling and Performance**
   - Capture CPU and memory profiles.
   - Identify performance bottlenecks and memory leaks.

5. **Remote Debugging**
   - Can debug Node.js processes running on remote servers.
   - Requires enabling network access for the inspector.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
// Example code
function sum(a, b) {
  debugger; // Execution will pause here
  return a + b;
}

console.log(sum(5, 10));

/* Steps to debug:
1. Run: node --inspect-brk index.js
2. Open Chrome → chrome://inspect → Configure → Add target if needed.
3. Click "Inspect" → Execution pauses at `debugger;`
4. Step through, inspect variables, evaluate expressions.


-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Debugging Node.js backend applications.
- Profiling CPU-intensive or memory-heavy tasks.
- Analyzing asynchronous code execution.
- Inspecting closures, scopes, and variable values.
- Remote debugging for production or staging servers.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Node Inspector uses the V8 Inspector Protocol.
2. Can be integrated with IDEs like VSCode for seamless debugging.
3. Supports async call stacks and Promises inspection.
4. Minimal performance impact if used in development mode.
5. Essential for identifying runtime bugs and optimizing Node.js code.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of Node Inspector as a **X-ray machine for your Node.js app**:
  - You can pause execution, see inside functions, inspect variables, and trace errors like a surgeon examining a patient.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between --inspect and --inspect-brk?  
A1: `--inspect` starts debugging immediately; `--inspect-brk` starts debugging and pauses at the first line of code.

Q2: Can you debug asynchronous code with Node Inspector?  
A2: Yes, it supports async call stacks and Promises inspection.

Q3: How do you set breakpoints?  
A3: Use `debugger;` statements in code or set breakpoints in Chrome DevTools or IDEs.

Q4: Can you use Node Inspector remotely?  
A4: Yes, by allowing network access and connecting Chrome DevTools to the remote process.

Q5: How does Node Inspector help in performance analysis?  
A5: Provides CPU/memory profiling and helps identify bottlenecks in both synchronous and asynchronous code.
*/
