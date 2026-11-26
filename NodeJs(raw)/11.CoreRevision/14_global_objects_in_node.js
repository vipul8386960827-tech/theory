/* 23_global_objects_in_node.js

=====================================================
Global Objects in Node.js
=====================================================

Definition (What I should say in the interview):
- "Global objects are things available in every module **without require or import**. In Node
   the actual global object is called **global** (or globalThis). Common ones are process,
   console, Buffer, setTimeout/setInterval/setImmediate, queueMicrotask, URL, fetch and
   structuredClone. Some names like require, module, exports, __dirname and __filename look
   global but are actually **module-scoped** - they are injected by the module wrapper."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. **True globals** (properties of global):
   - process, console, Buffer
   - setTimeout, setInterval, setImmediate, clearTimeout, clearInterval, clearImmediate
   - queueMicrotask, structuredClone, URL, URLSearchParams, TextEncoder, TextDecoder
   - fetch, AbortController, EventTarget (fetch stable from Node 18+)
2. **Module-scoped "pseudo globals"** (CommonJS only):
   - require, module, exports, __dirname, __filename
3. Top-level var in a module does NOT become a property of global (unlike browser scripts).

-----------------------------------------------------
Example
-----------------------------------------------------
console.log(typeof global);               // 'object'
console.log(global === globalThis);       // true
console.log(typeof process.env);          // 'object'

var x = 10;
console.log(global.x);                    // undefined -> module scope, not global

global.appName = 'demo';                  // avoid this in real code
console.log(appName);                     // 'demo'

console.log('require' in global);         // false -> injected by module wrapper

-----------------------------------------------------
Comparison Table
-----------------------------------------------------
| Name          | Truly global? | Where it comes from        |
|---------------|---------------|----------------------------|
| process       | Yes           | Node runtime               |
| Buffer        | Yes           | Node runtime               |
| setImmediate  | Yes           | Node (not in browsers)     |
| require       | No            | Module wrapper (CommonJS)  |
| __dirname     | No            | Module wrapper (CommonJS)  |

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Saying window or document exist in Node -> they don't.
- Polluting global with shared state -> hard to test and debug; use modules instead.
- Using __dirname or require inside an ES module -> ReferenceError.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is require a global?
A1: No. It is a parameter of the module wrapper function, so each module gets its own require.

Q2: How do you share a value across modules without globals?
A2: Export it from a module and require/import it; modules are cached, so it acts like a singleton.

Q3: What is process?
A3: A global object with info and control over the current process: env, argv, pid, exit(),
    cwd(), memoryUsage(), and events like 'exit' and 'uncaughtException'.
*/
