/* 2_what_is_a_runtime_environment.js

=====================================================
What is a Runtime Environment?
=====================================================

Definition (What I should say in the interview):
- "A runtime environment is everything a program needs to **execute**: an engine to run
   the code plus the APIs and libraries it can use. For JavaScript, the browser is one
   runtime (V8 + DOM, window, fetch) and Node.js is another (V8 + fs, http, process, libuv)."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Runtime = **Engine + APIs + Event loop**.
2. The **engine** (V8, SpiderMonkey, JavaScriptCore) only understands the language itself -
   it has NO setTimeout, NO file system, NO DOM.
3. The **runtime adds the APIs**:
   - Browser -> DOM, window, localStorage, fetch, Web APIs
   - Node.js -> fs, http, process, Buffer, require, libuv
4. Same JavaScript language, different capabilities depending on the runtime.

-----------------------------------------------------
Example
-----------------------------------------------------
// Works in Node, fails in browser:
const fs = require('fs');

// Works in browser, fails in Node:
document.querySelector('h1');   // ReferenceError: document is not defined

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- setTimeout is NOT part of JavaScript (ECMAScript) - it is provided by the runtime.
- Other JS runtimes: Deno, Bun.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- The engine is a car engine; the runtime is the whole car (wheels, steering, AC).
  Same engine, different cars -> different features.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is setTimeout part of JavaScript?
A1: No, it is provided by the runtime (browser Web APIs / Node timers).

Q2: Which engine does Node.js use?
A2: Google's V8 engine.

Q3: Name other JavaScript runtimes.
A3: Browsers, Deno, Bun.
*/
