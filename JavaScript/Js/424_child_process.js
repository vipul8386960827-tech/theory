/* 424_child_process.js

=====================================================
Child Process Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `child_process` module in Node.js allows you to **spawn and manage subprocesses** directly from a Node.js application. 
   It enables executing shell commands, running external scripts, and handling multiple tasks in parallel, 
   which is useful for scaling workloads and integrating with system tools."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Provides four main methods:
   - **spawn()** → Launches a new process for a command.
   - **exec()** → Executes a command and buffers the output.
   - **execFile()** → Runs an executable file without spawning a shell.
   - **fork()** → Special case of spawn for Node.js scripts with IPC (Inter-Process Communication).
2. Enables **parallel processing** without blocking the main thread.
3. Child processes can **communicate with the parent** using `stdin`, `stdout`, `stderr`, and `message` events.
4. Helps integrate Node.js with **system commands** or other programming languages.

-----------------------------------------------------
Basic Example (spawn)
-----------------------------------------------------
const { spawn } = require('child_process');

const ls = spawn('ls', ['-lh', '.']); // list files in current directory

ls.stdout.on('data', (data) => {
  console.log(`Output: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`Error: ${data}`);
});

ls.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
});

-----------------------------------------------------
exec Example
-----------------------------------------------------
const { exec } = require('child_process');

exec('node -v', (error, stdout, stderr) => {
  if (error) {
    console.error(`Exec error: ${error}`);
    return;
  }
  console.log(`Node version: ${stdout}`);
});

-----------------------------------------------------
fork Example
-----------------------------------------------------
const { fork } = require('child_process');
const child = fork('childScript.js');

child.on('message', (msg) => {
  console.log('Message from child:', msg);
});

child.send({ hello: 'world' });

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Running shell commands (ls, mkdir, git).
- Performing CPU-intensive tasks in parallel.
- Running scripts in other languages (Python, Bash).
- Worker processes for load balancing.
- Parent-child communication in large applications.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. `spawn()` streams output, while `exec()` buffers it (risk of memory overflow with large output).
2. `fork()` is optimized for Node.js processes and enables IPC.
3. Always handle errors and close events to prevent resource leaks.
4. Child processes run **outside the main event loop**.
5. Good for splitting tasks across multiple CPU cores.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of child processes as **hiring helpers**:
  - Your main process delegates tasks to helpers (child processes), 
    who work independently and report back results.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between `spawn()` and `exec()`?  
A1: `spawn()` streams output, suitable for large data; `exec()` buffers output, better for small results.

Q2: When would you use `fork()` over `spawn()`?  
A2: Use `fork()` when running another Node.js script and need IPC communication.

Q3: How does Node.js achieve parallelism using child processes?  
A3: By spawning independent OS-level processes outside the single-threaded event loop.

Q4: What are some drawbacks of using child processes?  
A4: Higher overhead than worker threads, risk of resource leaks, and need for explicit communication.

Q5: How can you send data between parent and child processes?  
A5: Using the `send()` method with IPC channels when using `fork()`.
*/
