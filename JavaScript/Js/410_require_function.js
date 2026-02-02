/* 410_require_function.js

=====================================================
require() Function in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `require()` function in Node.js is used to **import modules, JSON files, or local files** 
   into your current JavaScript file. It is part of the CommonJS module system and allows modular 
   code organization by loading and using functionalities from other files or packages."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Loads **Core Node.js modules** (e.g., `fs`, `http`) or **installed npm packages**.
2. Loads **local files** by specifying relative or absolute paths.
3. Returns the **exports object** of the imported module.
4. Supports **caching**, so modules are loaded only once per runtime.
5. Can load **JSON files**, automatically parsing them into objects.
6. Part of **CommonJS module system**, primarily used in Node.js.

-----------------------------------------------------
Basic Example (Import Core Module)
-----------------------------------------------------
const fs = require('fs');

// Read a file
const data = fs.readFileSync('example.txt', 'utf-8');
console.log(data);

-----------------------------------------------------
Importing Local Module
-----------------------------------------------------
// math.js
module.exports.add = (a, b) => a + b;
module.exports.sub = (a, b) => a - b;

// main.js
const math = require('./math');
console.log(math.add(5, 3)); // 8
console.log(math.sub(5, 3)); // 2

-----------------------------------------------------
Importing JSON File
-----------------------------------------------------
// config.json
// { "port": 3000, "env": "development" }

// main.js
const config = require('./config.json');
console.log(config.port); // 3000

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Organizing code into reusable modules.
- Importing Node.js core modules and npm packages.
- Loading configuration or data files in JSON format.
- Modularizing large projects for maintainability.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. `require()` **resolves paths** relative to the current file or module directories.
2. Modules are **cached** after first load; repeated `require()` calls return the same object.
3. Circular dependencies are supported but need careful handling.
4. `require()` is **synchronous**, which may block execution if loading large files.
5. ES Modules (`import/export`) is an alternative in modern Node.js versions.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of `require()` as a **library checkout system**:
  - You ask for a module, it gives you the functionality (exports), and keeps it ready for future use without reloading.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between `require()` and `import`?  
A1: `require()` is synchronous and part of CommonJS; `import` is asynchronous and part of ES Modules.

Q2: How does Node.js cache modules loaded with `require()`?  
A2: Once a module is loaded, it is stored in memory; subsequent `require()` calls return the cached object.

Q3: Can you require JSON files directly?  
A3: Yes, Node.js parses JSON files and returns the object.

Q4: How do you handle circular dependencies with `require()`?  
A4: Node.js returns partially loaded exports; careful module design is needed to avoid undefined values.
*/
