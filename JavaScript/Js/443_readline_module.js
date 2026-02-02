/* 443_readline_module.js

=====================================================
Readline Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `readline` module in Node.js provides an interface for **reading data from a readable stream line by line**, 
   typically from `process.stdin` for command-line input. It is commonly used for interactive CLI applications, 
   prompting users, or processing text streams efficiently."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **readline.createInterface(options)** → Creates a readline interface. Options include:
   - `input`: Readable stream (e.g., `process.stdin`)
   - `output`: Writable stream (optional, e.g., `process.stdout`)
   - `prompt`: Prompt string
2. **rl.question(query, callback)** → Prompts the user and waits for input.
3. **rl.on('line', callback)** → Event fired whenever a new line is entered.
4. **rl.on('close', callback)** → Event fired when the interface is closed.
5. **rl.prompt()** → Displays the prompt to the user.
6. Can read from files, sockets, or standard input streams.

-----------------------------------------------------
Basic Example (Simple CLI Input)
-----------------------------------------------------
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is your name? ', (answer) => {
  console.log(`Hello, ${answer}!`);
  rl.close();
});

-----------------------------------------------------
Example (Line-by-Line Input)
-----------------------------------------------------
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Enter text> '
});

rl.prompt();

rl.on('line', (line) => {
  console.log(`You entered: ${line}`);
  if (line === 'exit') rl.close();
  else rl.prompt();
});

rl.on('close', () => console.log('Readline interface closed.'));

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Interactive CLI tools and prompts.
- Reading large files line by line.
- Processing input from network streams or pipes.
- Building REPL (Read-Eval-Print Loop) environments.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Works with any **readable stream**, not just `process.stdin`.
2. Provides synchronous-like handling of asynchronous input via events and callbacks.
3. Supports customizing prompts and history.
4. Efficient for handling line-based input without buffering the entire stream.
5. `rl.close()` is required to release resources and end input.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of the readline module as a **conversation facilitator**:
  - You ask questions or wait for input line by line, and handle responses interactively.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How does readline differ from `process.stdin.on('data')`?  
A1: `readline` reads input **line by line** and provides prompts; `process.stdin.on('data')` gives raw chunked data.

Q2: Can readline read from files?  
A2: Yes, by passing a readable file stream as `input`.

Q3: How do you close a readline interface?  
A3: Use `rl.close()`.

Q4: Can you use readline in a REPL environment?  
A4: Yes, it is commonly used to implement REPL loops.

Q5: What events does a readline interface emit?  
A5: `'line'`, `'close'`, `'pause'`, `'resume'`, `'SIGINT'`.
*/
