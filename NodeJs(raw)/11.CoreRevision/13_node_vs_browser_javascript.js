/* 21_node_vs_browser_javascript.js

=====================================================
Node.js vs Browser JavaScript
=====================================================

Definition (What I should say in the interview):
- "Both run JavaScript, often on V8, but they're different **runtimes** with different APIs.
   The browser gives DOM, window, localStorage and Web APIs for building UIs and is sandboxed for
   security. Node.js gives server APIs like fs, http, process and Buffer, has full access to the
   file system and network, and we control the Node version."

-----------------------------------------------------
Differences
-----------------------------------------------------
| Feature           | Browser                        | Node.js                          |
|-------------------|--------------------------------|----------------------------------|
| Purpose           | UI / client side               | Server / tooling                 |
| Global object     | window (globalThis)            | global (globalThis)              |
| DOM               | Yes                            | No                               |
| File system       | No (sandboxed)                 | Yes (fs)                         |
| Modules           | ES Modules                     | CommonJS + ES Modules            |
| Version control   | Depends on user's browser      | You choose the Node version      |
| Security          | Sandboxed                      | Full OS access                   |
| Event loop        | Rendering + tasks + microtasks | libuv phases + nextTick queue    |
| Extra APIs        | fetch, localStorage, Web APIs  | process, Buffer, require, __dirname |

-----------------------------------------------------
Example
-----------------------------------------------------
// Browser
document.getElementById('btn').addEventListener('click', () => alert('hi'));

// Node
const fs = require('fs');
fs.writeFileSync('log.txt', 'hello');

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is common to both?
A1: The language itself (ECMAScript), setTimeout, console, Promises, fetch (Node 18+), globalThis.

Q2: Is the event loop the same?
A2: Same idea, different implementation - Node uses libuv phases and has process.nextTick and setImmediate.
*/
