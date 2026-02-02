/* 408_esm_vs_cjs.js

=====================================================
ESM vs CommonJS in JavaScript (Module Systems)
=====================================================

Definition (What I should say in the interview):
- "ESM (ECMAScript Modules) and CommonJS (CJS) are two JavaScript module systems. 
   ESM is the modern, standard module system for JavaScript, supporting static analysis, 
   tree-shaking, and asynchronous loading. CommonJS is the older Node.js module system, 
   designed for synchronous loading and server-side environments."

-----------------------------------------------------
Key Differences
-----------------------------------------------------
1. **Syntax**
   - ESM: `import { func } from './module.js';`, `export const value = 42;`
   - CJS: `const { func } = require('./module');`, `module.exports = { value: 42 };`

2. **Loading**
   - ESM: **Asynchronous**, can be statically analyzed, supports tree-shaking.
   - CJS: **Synchronous**, executed at runtime, no tree-shaking.

3. **Exports**
   - ESM: Supports **named exports** and **default exports**.
   - CJS: Uses `module.exports` or `exports` object for exports.

4. **Environment**
   - ESM: Works in **modern browsers** and Node.js (with `.mjs` or `"type": "module"` in package.json).
   - CJS: Primarily **Node.js**, not supported in browsers directly.

5. **Interop**
   - ESM can import CJS modules using `import` with some constraints.
   - CJS can import ESM using dynamic `import()`.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
// ESM (module.js)
export const add = (a, b) => a + b;
export default function multiply(a, b) { return a * b; }

// ESM (main.js)
import multiply, { add } from './module.js';
console.log(add(2, 3));       // 5
console.log(multiply(2, 3));  // 6

// CommonJS (module.js)
exports.add = (a, b) => a + b;
module.exports.multiply = (a, b) => a * b;

// CommonJS (main.js)
const { add, multiply } = require('./module');
console.log(add(2, 3));       // 5
console.log(multiply(2, 3));  // 6

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- ESM: Modern frontend frameworks (React, Next.js, Vite), Node.js modules, tree-shaking for optimization.
- CJS: Legacy Node.js applications, npm packages using CommonJS, synchronous module loading.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. ESM supports **static imports**, which allows bundlers to optimize code.
2. CJS executes modules at runtime, which can lead to circular dependency issues.
3. Node.js supports both ESM and CJS, but mixing requires careful interop.
4. ESM modules are always in **strict mode** by default.
5. Use ESM for modern development and frontend tooling; use CJS for legacy Node.js code.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of ESM like a **prefabricated library**:
  - You can see all the modules upfront (static analysis).
  - You can pick exactly what you need (tree-shaking).
- CommonJS is like **on-demand delivery**:
  - You call `require()` and the module is loaded synchronously at runtime.
  - Less optimized for size and performance, but simple for server-side usage.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can you use ESM in Node.js?  
A1: Yes, by using `.mjs` extension or `"type": "module"` in package.json.

Q2: What is tree-shaking, and which module system supports it?  
A2: Tree-shaking removes unused exports during bundling. Supported by ESM due to static analysis.

Q3: Can you import a CommonJS module in ESM?  
A3: Yes, using `import` statement, but default export behavior may differ.

Q4: Are ESM modules loaded synchronously or asynchronously?  
A4: Asynchronously, allowing non-blocking loading in the browser and modern Node.js.
*/
