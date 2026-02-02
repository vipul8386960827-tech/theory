/* 412_process_object.js

=====================================================
Process Object in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `process` object in Node.js is a **global object** that provides information and control over 
   the current Node.js process. It allows developers to interact with the environment, handle 
   input/output, manage lifecycle events, and access runtime information."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **Global object** – no need to require it explicitly.
2. Provides **runtime information**: `process.pid`, `process.version`, `process.platform`, etc.
3. Handles **standard input/output** with `process.stdin`, `process.stdout`, `process.stderr`.
4. Provides **environment variables** through `process.env`.
5. Allows **process control**: `process.exit()`, `process.on('exit')`.
6. Supports **uncaught exception handling** via `process.on('uncaughtException')`.
7. Can measure **high-resolution time** using `process.hrtime()`.

-----------------------------------------------------
Basic Example (Process Info)
-----------------------------------------------------
console.log('Process ID:', process.pid);
console.log('Node Version:', process.version);
console.log('Platform:', process.platform);

-----------------------------------------------------
Handling Exit Events
-----------------------------------------------------
process.on('exit', (code) => {
  console.log(`Process exited with code: ${code}`);
});

setTimeout(() => {
  console.log('Exiting process...');
  process.exit(0);
}, 1000);

-----------------------------------------------------
Reading Environment Variables
-----------------------------------------------------
console.log('Environment:', process.env.NODE_ENV);
process.env.CUSTOM_VAR = 'Hello';
console.log('Custom Variable:', process.env.CUSTOM_VAR);

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Accessing system and runtime information.
- Reading and setting environment variables.
- Handling process lifecycle events.
- Managing input/output streams in CLI applications.
- Debugging and performance monitoring using high-resolution timers.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. `process` is **available globally**; no `require` needed.
2. Environment variables accessed via `process.env` are **strings only**.
3. Exiting the process with `process.exit()` will **terminate all operations immediately**.
4. Streams like `process.stdin` are useful for **interactive command-line applications**.
5. Can attach multiple event listeners for process events like `exit`, `beforeExit`, and `uncaughtException`.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of `process` as the **control center** of your Node.js application:
  - It gives you access to the environment, runtime information, input/output channels, and lifecycle controls.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you access environment variables in Node.js?  
A1: Using `process.env.VARIABLE_NAME`.

Q2: How do you handle process exit events?  
A2: By attaching a listener to `process.on('exit', callback)`.

Q3: What is `process.pid`?  
A3: It is the Process ID of the current Node.js process.

Q4: How do you terminate a Node.js process programmatically?  
A4: Using `process.exit([code])`.

Q5: Can `process` be required using `require('process')`?  
A5: Yes, but it is already globally available, so requiring is usually unnecessary.
*/
