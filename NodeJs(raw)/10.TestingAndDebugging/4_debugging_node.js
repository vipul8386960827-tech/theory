/* 4_debugging_node.js

=====================================================
Debugging Node.js
=====================================================

Definition (What I should say in the interview):
- "For simple issues I use console.log or a logger, but for anything non-trivial I use the
   **built-in inspector**. I start Node with --inspect (or --inspect-brk to pause on the first
   line), then attach Chrome DevTools via chrome://inspect or the VS Code debugger. That lets me
   set breakpoints, step through code, inspect variables and the call stack, which is much
   faster than guessing with logs."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. node --inspect app.js -> starts debugger on 127.0.0.1:9229, app runs normally.
2. node --inspect-brk app.js -> pauses before the first line (useful for startup bugs).
3. Chrome: open chrome://inspect -> "Open dedicated DevTools for Node".
4. VS Code: launch.json or "JavaScript Debug Terminal" -> breakpoints directly in the editor.
5. The "debugger;" statement acts as a breakpoint when an inspector is attached.
6. Debug tests: node --inspect-brk node_modules/.bin/jest --runInBand

-----------------------------------------------------
Example
-----------------------------------------------------
// Commands
//   node --inspect server.js
//   node --inspect-brk server.js
//   node --inspect=0.0.0.0:9229 server.js   (only inside Docker / trusted network)
//   nodemon --inspect server.js

// VS Code .vscode/launch.json
{
  "type": "node",
  "request": "launch",
  "name": "Debug API",
  "program": "${workspaceFolder}/server.js",
  "env": { "NODE_ENV": "development" }
}

// In code
function calculateTotal(items) {
  debugger;                       // execution pauses here when inspector is attached
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}

-----------------------------------------------------
Useful Extras
-----------------------------------------------------
- console.table(arr), console.dir(obj, { depth: null }), console.trace() for stack.
- NODE_DEBUG=http,net node app.js -> internal debug output of core modules.
- debug npm package: DEBUG=app:* node app.js -> namespaced debug logs.
- Conditional breakpoints and logpoints in DevTools/VS Code avoid editing code.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Never expose the inspector port publicly in production - it allows running arbitrary code.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between --inspect and --inspect-brk?
A1: --inspect starts the debugger and runs immediately; --inspect-brk waits on the first line
    until a debugger attaches, so you can catch code that runs at startup.

Q2: How do you debug a running process that was started without --inspect?
A2: On Linux/macOS send SIGUSR1 (kill -USR1 pid) to activate the inspector, then attach.

Q3: Why use --runInBand when debugging Jest?
A3: It runs tests in the main process instead of worker processes, so breakpoints are hit.
*/
