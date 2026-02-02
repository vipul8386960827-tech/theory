/* 435_console_object.js

=====================================================
Console Object in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `console` object in Node.js provides simple **logging and debugging utilities**. 
   It allows developers to print messages, warnings, errors, or data to stdout/stderr, 
   and to format, time, or trace program execution easily."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **console.log()** → Prints general messages.
2. **console.error()** → Prints error messages to stderr.
3. **console.warn()** → Prints warning messages.
4. **console.info()** → Prints informational messages.
5. **console.dir()** → Inspects objects with custom depth and colors.
6. **console.table()** → Displays arrays or objects in a table format.
7. **console.time() / console.timeEnd()** → Measures execution time.
8. **console.trace()** → Prints stack trace of code execution.
9. **console.assert()** → Prints error message if condition is false.

-----------------------------------------------------
Basic Example (Logging)
-----------------------------------------------------
console.log('Hello, Node.js!');
console.error('This is an error');
console.warn('This is a warning');
console.info('Some info');

-----------------------------------------------------
Example (Inspecting Objects)
-----------------------------------------------------
const user = { name: 'Kaizer', age: 25, skills: ['JS', 'Node.js'] };
console.dir(user, { depth: 2, colors: true });

-----------------------------------------------------
Example (Console Table)
-----------------------------------------------------
const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
];
console.table(users);

-----------------------------------------------------
Example (Measuring Time)
-----------------------------------------------------
console.time('loop');
for (let i = 0; i < 1000000; i++) {}
console.timeEnd('loop'); // Outputs time taken for loop

-----------------------------------------------------
Example (Trace and Assert)
-----------------------------------------------------
function first() { second(); }
function second() { console.trace('Trace here'); }
first();

console.assert(1 === 2, '1 is not equal to 2'); // prints assertion error

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Debugging variables, objects, or code flow.
- Measuring performance of functions or loops.
- Tracking errors, warnings, and execution stack.
- Visualizing data in tables for easier analysis.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. `console.log` writes to **stdout**, while `console.error` writes to **stderr**.
2. Using `console.time` with the same label measures execution duration between calls.
3. `console.assert` does not throw exceptions; it prints messages when false.
4. Console methods are synchronous but can impact performance if overused in high-load code.
5. Useful in development; for production, consider structured logging libraries.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of the console object as a **debugging notebook**:
  - You can jot down messages, track times, visualize data, and trace errors 
    while your application runs.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between `console.log` and `console.error`?  
A1: `console.log` writes to stdout, `console.error` writes to stderr.

Q2: How does `console.table` help in debugging?  
A2: It visualizes arrays or objects in a table format for easier readability.

Q3: Can `console.assert` stop program execution?  
A3: No, it only prints an error message if the assertion fails.

Q4: When would you use `console.trace`?  
A4: To print a stack trace and understand the flow of function calls.

Q5: Are console methods synchronous or asynchronous?  
A5: They are synchronous, so excessive use may impact performance in high-load scenarios.
*/
