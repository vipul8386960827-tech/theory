/* 403_import_statement.js

=====================================================
Import Statement in JavaScript (ES6 Modules)
=====================================================

Definition (What I should say in the interview):
- "The `import` statement is used in JavaScript ES6 modules to **bring functions, objects, 
   or primitives from other modules** into the current file. It allows modular code 
   organization, reusability, and avoids polluting the global namespace. Imports can be 
   static (at the top of the file) or dynamic (using `import()` for lazy loading)."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **Static Import** – Declared at the top; resolved at compile time.
2. **Dynamic Import** – Using `import()` returns a Promise, allowing **lazy-loading modules**.
3. Supports **named imports**, **default imports**, and **namespace imports**.
4. Enables **tree-shaking** for unused exports when bundling.
5. Module code executes **once**, regardless of multiple imports.

-----------------------------------------------------
Basic Example (Named Import)
-----------------------------------------------------
// utils.js
export function add(a, b) {
  return a + b;
}
export function multiply(a, b) {
  return a * b;
}

// main.js
import { add, multiply } from './utils.js';
console.log(add(2, 3));       // 5
console.log(multiply(2, 3));  // 6

-----------------------------------------------------
Basic Example (Default Import)
-----------------------------------------------------
// logger.js
export default function log(message) {
  console.log("Log:", message);
}

// main.js
import log from './logger.js';
log("Hello World"); // Log: Hello World

-----------------------------------------------------
Namespace Import Example
-----------------------------------------------------
// utils.js
export function sub(a, b) { return a - b; }
export function div(a, b) { return a / b; }

// main.js
import * as utils from './utils.js';
console.log(utils.sub(5, 2)); // 3
console.log(utils.div(6, 2)); // 3

-----------------------------------------------------
Dynamic Import Example
-----------------------------------------------------
async function loadModule() {
  const math = await import('./utils.js');
  console.log(math.add(10, 5)); // 15
}

loadModule();

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Splitting code into reusable modules for maintainability.
- Lazy-loading code to improve page performance.
- Importing external libraries in modern JavaScript projects.
- Avoiding global namespace pollution and dependency conflicts.
- Tree-shaking unused code for optimized bundles.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Static imports are **hoisted** and resolved before code execution.
2. Dynamic imports (`import()`) return a Promise and can be used inside functions or conditionally.
3. Default exports can only have **one per module**.
4. Named exports allow multiple exports per module.
5. Browser and Node.js support ES Modules with appropriate configuration (`type: "module"` in package.json).

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of `import` as **bringing tools from another toolbox**:
  - You can take specific tools (named import), all tools (namespace import), or the main tool (default import).
  - Dynamic imports are like asking for a tool **only when you need it**, saving space and time.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between static and dynamic import?  
A1: Static import is resolved at compile time and always loaded, while dynamic import (`import()`) loads modules asynchronously at runtime.

Q2: Can you have multiple default exports in one module?  
A2: No, a module can have only one default export.

Q3: How does import help with tree-shaking?  
A3: Named imports allow bundlers to remove unused code during optimization.

Q4: How are imports resolved in Node.js?  
A4: Node.js supports ES Modules with `.mjs` extension or `"type": "module"` in package.json. Static imports are resolved relative to module path.
*/
