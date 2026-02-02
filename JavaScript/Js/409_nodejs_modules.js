/* 409_nodejs_modules.js

=====================================================
Node.js Modules
=====================================================

Definition (What I should say in the interview):
- "In Node.js, a module is a **self-contained block of code** encapsulated in a file that can 
   export variables, functions, or classes. Modules help in **organizing code**, **reusing functionality**, 
   and **isolating scope**. Node.js supports CommonJS (CJS) by default and also supports ESM (ECMAScript Modules)."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Each file is treated as a **separate module** with its own scope.
2. Modules **export** functionality using `module.exports` or `exports` (CJS) and `export` (ESM).
3. Modules are **imported** using `require()` (CJS) or `import` (ESM).
4. Supports **core built-in modules** (like `fs`, `http`, `path`) and **third-party modules** via npm.
5. Modules are **cached** after first load, improving performance.
6. Helps maintain **clean, modular code architecture**.

-----------------------------------------------------
Basic Example (CommonJS)
-----------------------------------------------------
// math.js
function add(a, b) { return a + b; }
function multiply(a, b) { return a * b; }
module.exports = { add, multiply };

// app.js
const math = require('./math');
console.log(math.add(2, 3));      // 5
console.log(math.multiply(2, 3)); // 6

-----------------------------------------------------
Basic Example (ESM)
-----------------------------------------------------
// math.mjs
export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }

// app.mjs
import { add, multiply } from './math.mjs';
console.log(add(2, 3));      // 5
console.log(multiply(2, 3)); // 6

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Organizing server-side code in **logical modules**.
- Using Node.js **built-in modules** like `fs`, `http`, `os`.
- Integrating **npm packages** for added functionality.
- Creating reusable utility functions across projects.
- Implementing modular architecture in large-scale Node.js applications.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Node.js modules are **synchronously loaded** for CJS and **asynchronously loaded** for ESM.
2. The module system ensures **private scope**, preventing variable leakage.
3. Circular dependencies are handled using **module caching**, may produce partially initialized exports.
4. Third-party modules must be installed via **npm** before requiring/importing.
5. Core modules like `fs`, `http`, etc., do not require a path—they are **built-in**.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of Node.js modules as **separate containers**:
  - Each container has its own set of tools (functions/variables) and does not interfere with others.
  - You can share specific tools (exports) with other containers (modules) as needed.
  - Using modules prevents clutter and makes large projects manageable.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between CJS and ESM in Node.js?  
A1: CJS uses `require` and `module.exports`, is synchronous, and is default in Node.js. ESM uses `import/export`, supports static analysis, tree-shaking, and is asynchronous.

Q2: How does Node.js module caching work?  
A2: After a module is loaded the first time, it is cached. Subsequent `require` calls return the cached version to improve performance.

Q3: Can you create private variables in modules?  
A3: Yes, variables declared inside a module file are private to that module unless explicitly exported.

Q4: How do you import built-in Node.js modules?  
A4: Simply use `require('moduleName')` for CJS or `import moduleName from 'moduleName'` for ESM, no path needed.
*/
