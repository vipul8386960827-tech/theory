/* 34_what_happens_when_you_run_node_app.js

=====================================================
What Happens When You Run "node app.js"
=====================================================

Definition (What I should say in the interview):
- "When I run node app.js, Node first starts the process and initializes **V8 and libuv**, and
   sets up the environment - process, globals and core modules. Then it loads app.js: for
   CommonJS it reads the file, wraps it in the **module wrapper function**, and V8 compiles and
   executes it top to bottom, synchronously. During that run, any async work like timers or
   server.listen is registered. After the top-level code finishes, the **event loop** starts and
   keeps running as long as there is pending work. When nothing is left, the process exits."

-----------------------------------------------------
Step-by-Step
-----------------------------------------------------
1. OS starts the node process (one main thread).
2. Node initializes V8 (JS engine), libuv (event loop + thread pool), and bootstraps
   core modules and globals (process, console, Buffer, timers).
3. Resolves app.js -> decides CommonJS or ESM (based on extension / "type" in package.json).
4. CommonJS: reads file -> wraps in function(exports, require, module, __filename, __dirname)
   -> V8 compiles (JIT) -> executes synchronously. require() calls load other modules (cached).
5. Top-level code finishes -> process.nextTick queue and promise microtasks run.
6. Event loop starts: timers -> pending -> poll -> check -> close ... repeatedly.
7. No more handles/requests (no timers, servers, sockets) -> 'beforeExit', 'exit' events
   -> process exits with exit code (0 by default).

-----------------------------------------------------
Example
-----------------------------------------------------
// app.js
console.log('1. top-level code runs first');

setTimeout(() => console.log('4. timer (event loop)'), 0);
Promise.resolve().then(() => console.log('3. microtask'));
process.nextTick(() => console.log('2. nextTick'));

process.on('beforeExit', () => console.log('5. loop empty, about to exit'));
process.on('exit', (code) => console.log('6. exit with code', code));

// Output: 1, 2, 3, 4, 5, 6
// If we added http.createServer().listen(3000), the process would keep running,
// because the server is an active handle in the event loop.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Top-level code runs before ANY callback; a heavy top-level loop delays everything.
- An unhandled error during startup crashes the process with a non-zero exit code.
- Since Node 15, an unhandled promise rejection also crashes the process by default.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why doesn't my server script exit?
A1: The listening server is an active handle, so the event loop always has pending work.

Q2: Is the module code executed every time it is required?
A2: No. It runs once on the first require; later calls return the cached module.exports.

Q3: When does the event loop start?
A3: After the main script's synchronous code (and its microtasks) has finished.
*/
