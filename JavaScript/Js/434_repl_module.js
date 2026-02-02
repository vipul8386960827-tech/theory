/* 434_repl_module.js

=====================================================
REPL Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `repl` module in Node.js provides a **Read-Eval-Print Loop** environment. 
   It allows developers to interactively execute JavaScript code line by line, 
   inspect results immediately, and experiment with Node.js APIs in real time."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Provides an interactive shell for executing JavaScript code.
2. Supports both synchronous and asynchronous code execution.
3. Allows **custom REPL commands** with `.defineCommand`.
4. Can use **custom context objects** to preload variables or modules.
5. Integrates with Node.js scripts for embedded REPL sessions.
6. Useful for debugging, learning, and prototyping.

-----------------------------------------------------
Basic Example (Start REPL)
-----------------------------------------------------
const repl = require('repl');

const myRepl = repl.start('> '); // starts REPL with prompt '> '

myRepl.context.name = 'Kaizer'; // adding variable to REPL context
// Now in REPL, typing 'name' will output 'Kaizer'

-----------------------------------------------------
Example (Custom Command)
-----------------------------------------------------
myRepl.defineCommand('sayhello', {
  help: 'Prints a hello message',
  action(name) {
    console.log(`Hello, ${name || 'World'}!`);
    this.displayPrompt();
  }
});

// In REPL: .sayhello Kaizer -> outputs 'Hello, Kaizer!'

-----------------------------------------------------
Example (Embedded REPL in Script)
-----------------------------------------------------
function startInteractiveSession() {
  const replServer = repl.start('Node.js REPL> ');
  replServer.context.utils = require('util'); // preload modules
}

startInteractiveSession();

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Testing small snippets of JavaScript code.
- Debugging variables or functions in real time.
- Creating interactive CLI tools or admin consoles.
- Experimenting with APIs before integrating into applications.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. REPL is synchronous by default, but supports asynchronous commands with `await` in Node >= 10.
2. Always be cautious when exposing REPL in production; it can execute arbitrary code.
3. Custom commands enhance REPL usability for specific tasks.
4. REPL can be embedded in applications for debugging or admin purposes.
5. The prompt string can be customized to reflect context or application state.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of REPL as a **laboratory desk**:
  - You can try experiments (code), immediately see the results, 
    tweak your variables, and explore without affecting the main project.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What does REPL stand for?  
A1: Read-Eval-Print Loop – reads input, evaluates it, prints result, loops again.

Q2: How do you preload variables or modules in a REPL session?  
A2: By adding them to `replServer.context`, e.g., `replServer.context.fs = require('fs')`.

Q3: Can you create custom commands in REPL?  
A3: Yes, using `replServer.defineCommand('commandName', { help, action })`.

Q4: Is REPL suitable for production use?  
A4: Not generally; exposing REPL publicly is a security risk as it executes arbitrary code.

Q5: Can REPL handle asynchronous code?  
A5: Yes, Node >= 10 supports top-level `await` in REPL sessions for async code execution.
*/
