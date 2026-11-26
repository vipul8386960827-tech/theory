/* 28_running_node_files_and_cli.js

=====================================================
Running Node Files and the Node CLI
=====================================================

Definition (What I should say in the interview):
- "You run a file with **node filename.js**. The node CLI also has useful flags: --watch to
   restart on file changes, --inspect for debugging with Chrome DevTools, --env-file to load a
   .env file, and -e or -p to run inline code. Arguments after the file name are available in
   **process.argv**. In projects we usually wrap these commands in npm scripts in package.json."

-----------------------------------------------------
Key Points / Common Flags
-----------------------------------------------------
node app.js                     -> run a file (.js extension optional)
node app.js --port 3000         -> extra args go to process.argv
node --watch app.js             -> auto restart on changes (Node 18.11+, replaces nodemon)
node --inspect app.js           -> enable debugger (chrome://inspect); --inspect-brk pauses on line 1
node --env-file=.env app.js     -> load env variables (Node 20.6+)
node -e "console.log(1+1)"      -> evaluate inline code
node -p "process.version"       -> evaluate and print
node --max-old-space-size=4096 app.js -> raise V8 heap limit (MB)
node --test                     -> run the built-in test runner (Node 18+)
node -v                         -> print version

-----------------------------------------------------
Example (reading CLI args)
-----------------------------------------------------
// greet.js -> run: node greet.js Alice --loud
const args = process.argv.slice(2);   // [0] = node path, [1] = script path
const name = args[0] || 'World';
const loud = args.includes('--loud');

const msg = `Hello, ${name}!`;
console.log(loud ? msg.toUpperCase() : msg);

// Built-in parser (Node 18.3+)
const { parseArgs } = require('util');
const { values } = parseArgs({ options: { port: { type: 'string', short: 'p' } } });
console.log(values.port);             // node app.js -p 8080 -> '8080'

-----------------------------------------------------
Example (npm scripts)
-----------------------------------------------------
// package.json
// "scripts": { "start": "node server.js", "dev": "node --watch server.js" }
// npm start   |   npm run dev

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Exit codes: process.exit(0) = success, non-zero = failure (CI pipelines rely on this).
- Add #!/usr/bin/env node at the top of a file + "bin" in package.json to make a CLI tool.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is in process.argv?
A1: An array: [path to node, path to script, ...user arguments].

Q2: How do you debug a Node app?
A2: node --inspect app.js and attach Chrome DevTools or VS Code debugger, set breakpoints.

Q3: Do we still need nodemon?
A3: Not always; node --watch covers the basic restart-on-change use case.
*/
