/* 411_module_exports.js

=====================================================
module.exports in Node.js
=====================================================

Definition (What I should say in the interview):
- "`module.exports` is an object in Node.js used to **export functions, objects, or values** from a module 
   so that they can be imported and used in other files using `require()`. It is the main way to define 
   what a module exposes to other modules in the CommonJS system."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **Exports single function, object, or multiple properties** from a module.
2. Works with **`require()`** to allow other files to import module functionality.
3. Can assign **directly to `module.exports`** for a single export or add properties for multiple exports.
4. Supports exporting **functions, objects, arrays, classes, or primitive values**.
5. Part of the **CommonJS module system**.

-----------------------------------------------------
Basic Example (Exporting Multiple Properties)
-----------------------------------------------------
// math.js
module.exports.add = (a, b) => a + b;
module.exports.sub = (a, b) => a - b;

// main.js
const math = require('./math');
console.log(math.add(5, 3)); // 8
console.log(math.sub(5, 3)); // 2

-----------------------------------------------------
Exporting a Single Function
-----------------------------------------------------
// greet.js
module.exports = function(name) {
  return `Hello, ${name}`;
};

// main.js
const greet = require('./greet');
console.log(greet('Kaizer')); // Hello, Kaizer

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Sharing utility functions across multiple files.
- Organizing Node.js applications into modular components.
- Exporting classes, objects, or configurations for reuse.
- Maintaining cleaner and more maintainable code structure.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. `module.exports` **replaces `exports`** if assigned directly.
2. Adding properties to `exports` object is equivalent to adding to `module.exports`.
3. Avoid mixing direct assignment with `exports` to prevent unexpected results.
4. Modules are **cached** by Node.js, so repeated `require()` calls return the same object.
5. Works only in **CommonJS modules**; ES Modules use `export`/`import`.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of `module.exports` as a **package box**:
  - You put functions, objects, or values inside the box, and when someone requires it, they get exactly what you placed in the box.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between `exports` and `module.exports`?  
A1: `exports` is a reference to `module.exports`. Assigning directly to `module.exports` replaces the object, while adding properties to `exports` adds to `module.exports`.

Q2: Can you export a single function using `module.exports`?  
A2: Yes, you can assign a single function directly to `module.exports`.

Q3: Are `module.exports` objects cached?  
A3: Yes, Node.js caches modules after the first load.

Q4: How do you export multiple functions from one module?  
A4: Add them as properties of `module.exports` or `exports` object.
*/
