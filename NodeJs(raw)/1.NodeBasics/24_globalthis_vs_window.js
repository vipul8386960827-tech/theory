/* 24_globalthis_vs_window.js

=====================================================
globalThis vs window vs global
=====================================================

Definition (What I should say in the interview):
- "Each JavaScript environment had its own name for the global object: **window** in browsers,
   **self** in web workers and **global** in Node. That made writing cross-platform code
   annoying. ES2020 introduced **globalThis**, a standard name that points to the global object
   in every environment. In Node, globalThis === global, and in the browser globalThis === window."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. window -> browser only (also has DOM: document, localStorage, alert).
2. global -> Node only.
3. self -> browsers and web workers.
4. globalThis -> works everywhere (ES2020, Node 12+).
5. Use globalThis in libraries that run in both Node and the browser.

-----------------------------------------------------
Example
-----------------------------------------------------
// Node
console.log(globalThis === global);          // true
console.log(typeof window);                  // 'undefined'

// Cross-platform check
const isBrowser = typeof window !== 'undefined';
const isNode = typeof process !== 'undefined' && !!process.versions?.node;
console.log({ isBrowser, isNode });

// Works in both environments
globalThis.config = { debug: true };
console.log(globalThis.config.debug);        // true

-----------------------------------------------------
Comparison Table
-----------------------------------------------------
| Name        | Browser | Web Worker | Node.js |
|-------------|---------|------------|---------|
| window      | Yes     | No         | No      |
| self        | Yes     | Yes        | No      |
| global      | No      | No         | Yes     |
| globalThis  | Yes     | Yes        | Yes     |

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- In a browser classic script, top-level var becomes window.x. In Node modules it does not,
  because every file is wrapped in a function (module scope).
- Using window in server-side code (e.g. Next.js SSR) throws ReferenceError -> guard with typeof.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why was globalThis introduced?
A1: To have one standard way to access the global object across all JS environments.

Q2: Does let/const at top level add to globalThis?
A2: No, never - not in browsers and not in Node. Only top-level var/function in browser scripts do.

Q3: Why does "window is not defined" appear in Next.js?
A3: The code runs on the server (Node) during SSR, where window doesn't exist.
*/
