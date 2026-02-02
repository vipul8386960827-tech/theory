/* 402_js_modules.js

=====================================================
JavaScript (ES6) Modules
=====================================================

Definition (What I should say in the interview):
- "JavaScript modules allow developers to **organize code into reusable, isolated files**. 
   Modules can **export variables, functions, classes**, and other values, which can then 
   be **imported** into other modules. This provides better code maintainability, avoids 
   global namespace pollution, and enables tree-shaking in modern bundlers for optimized 
   applications."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **Exports** – Allows exposing functions, objects, or primitives from a module.
2. **Imports** – Enables importing exported entities from other modules.
3. Supports **default exports** and **named exports**.
4. Modules are **strict mode by default**.
5. Supports static analysis for **tree-shaking** in bundlers like Webpack or Rollup.
6. Module code executes **once**, even if imported multiple times.

-----------------------------------------------------
Basic Example (Named Export)
-----------------------------------------------------
// mathUtils.js
export function add(a, b) {
  return a + b;
}
export function multiply(a, b) {
  return a * b;
}

// main.js
import { add, multiply } from './mathUtils.js';
console.log(add(2, 3));       // 5
console.log(multiply(2, 3));  // 6

-----------------------------------------------------
Basic Example (Default Export)
-----------------------------------------------------
// logger.js
export default function log(message) {
  console.log("Log:", message);
}

// main.js
import log from './logger.js';
log("Hello World"); // Log: Hello World

-----------------------------------------------------
Dynamic Import
-----------------------------------------------------
// Load module dynamically
async function loadModule() {
  const math = await import('./mathUtils.js');
  console.log(math.add(5, 7)); // 12
}

loadModule();

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Splitting large applications into smaller, maintainable files.
- Reusing code across multiple files or projects.
- Lazy-loading modules with dynamic imports for performance optimization.
- Avoiding global namespace pollution in browsers or Node.js.
- Enabling tree-shaking to reduce final bundle size.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. ES Modules are **deferred and asynchronous** in browsers.
2. Modules support both **named** and **default exports**, but a file can have only **one default export**.
3. Static imports are resolved at compile time; dynamic imports are resolved at runtime.
4. Node.js supports ES Modules using `.mjs` extension or `"type": "module"` in package.json.
5. Modules always execute in **strict mode** and have their own scope.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of a module like a **toolbox**:
  - Each toolbox (file) contains tools (functions/variables) that you can choose to take (import) 
    and use in other toolboxes or projects.
  - This avoids mixing all tools in a single drawer (global scope), keeping things organized.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between default and named exports?  
A1: Default export allows exporting a single value per module, while named exports allow exporting multiple named values.

Q2: Can modules be imported multiple times?  
A2: Yes, but the module executes only once; subsequent imports reuse the same instance.

Q3: What is the difference between static and dynamic imports?  
A3: Static imports are resolved at compile time and loaded before code execution, while dynamic imports are loaded at runtime as Promises.

Q4: How do ES Modules differ from CommonJS modules?  
A4: ES Modules are static, support tree-shaking, execute in strict mode, and use `import/export`. CommonJS modules are dynamic, use `require/module.exports`, and execute synchronously.
*/
