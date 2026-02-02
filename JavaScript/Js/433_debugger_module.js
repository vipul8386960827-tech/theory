/* 433_debugger_module.js

=====================================================
Debugger Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `debugger` module in Node.js allows developers to **pause and inspect code execution**. 
   It is used to set breakpoints, step through code, and analyze variables, 
   helping in identifying bugs and understanding application behavior."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Can trigger the built-in **Node.js debugger** with `debugger;` statement.
2. Supports remote debugging via **Inspector Protocol**.
3. Integrates with IDEs like VSCode, WebStorm for interactive debugging.
4. Works with Chrome DevTools and Node.js Inspector.
5. Allows stepping through code: step in, step over, step out.
6. Supports watching variables and evaluating expressions during debugging.

-----------------------------------------------------
Basic Example (Using `debugger` statement)
-----------------------------------------------------
function add(a, b) {
  const result = a + b;
  debugger; // Execution will pause here if debugger is attached
  return result;
}

console.log(add(5, 7));

-----------------------------------------------------
Debugging via Command Line
-----------------------------------------------------
- Start Node.js with inspector enabled:
node --inspect-brk app.js
- Open Chrome and navigate to `chrome://inspect`
- Attach debugger to step through the code

-----------------------------------------------------
Example (Inspecting Variables)
-----------------------------------------------------
function processData(data) {
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i];
    debugger; // pause and inspect 'i' and 'sum'
  }
  return sum;
}

console.log(processData([1, 2, 3, 4]));

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Debugging logic errors in functions or modules.
- Inspecting asynchronous flows or callbacks.
- Profiling and monitoring execution to find performance issues.
- Learning how code executes step by step.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. `debugger` statement does nothing if no debugger is attached.
2. Modern Node.js recommends using **Inspector** instead of legacy `node debug`.
3. Works well with VSCode's debugger and Chrome DevTools.
4. Can debug both synchronous and asynchronous code.
5. Helps reduce reliance on `console.log` for debugging.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of `debugger` as a **pause button** for your code:
  - You can stop the execution anytime, inspect the current state, 
    and then continue running.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What happens if you run `debugger` without a debugger attached?  
A1: The statement is ignored and the program continues executing normally.

Q2: How is Node.js debugging different from browser debugging?  
A2: Node.js uses the Inspector Protocol and can integrate with Chrome DevTools or IDEs; the browser has built-in DevTools.

Q3: Can you debug asynchronous code using `debugger`?  
A3: Yes, `debugger` pauses execution at that point, even inside async functions or callbacks.

Q4: How do you attach VSCode debugger to a Node.js process?  
A4: Start Node with `--inspect` or `--inspect-brk` and configure a launch.json in VSCode to attach to the process.

Q5: What are alternatives to using `debugger` for debugging Node.js apps?  
A5: Using console logs, Node.js Inspector, Chrome DevTools, VSCode integrated debugger, or third-party profiling tools.
*/
