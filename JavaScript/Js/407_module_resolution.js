/* 407_module_resolution.js

=====================================================
Module Resolution in JavaScript (ES6 Modules & Node.js)
=====================================================

Definition (What I should say in the interview):
- "Module resolution is the process by which JavaScript **locates and loads a module** when 
   you use `import` or `require`. It involves resolving the module specifier to an actual 
   file path, supporting relative paths, absolute paths, node_modules, and package entry points."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Resolves **relative paths** (`./module.js` or `../module.js`) relative to the importing file.
2. Resolves **bare specifiers** (`lodash`) in Node.js using `node_modules` folder.
3. Supports **file extensions** like `.js`, `.mjs`, `.json`, `.wasm` (Node.js) or browser module specifiers.
4. Supports **package entry points** via `package.json` `"main"` or `"exports"` field.
5. Handles **module caching** to avoid redundant loading.
6. In browsers, ES modules follow **import maps** or relative URLs for resolution.

-----------------------------------------------------
Node.js Module Resolution Example
-----------------------------------------------------
// File structure:
// project/
//   ├─ index.js
//   └─ utils/
//       └─ math.js

// math.js
export function add(a, b) { return a + b; }

// index.js
import { add } from './utils/math.js';
console.log(add(2, 3)); // 5

// Node.js looks for:
// 1. Exact file './utils/math.js'
// 2. './utils/math/index.js' if directory is given
// 3. Package entry point in './utils/math/package.json' (if exists)

-----------------------------------------------------
Browser Module Resolution Example
-----------------------------------------------------
import { add } from './utils/math.js'; // Must use relative path with extension
console.log(add(4, 5)); // 9

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Ensures correct modules are loaded in **frontend and backend**.
- Supports **code modularization** and maintainable structure.
- Works with **bundlers** like Webpack, Vite, or Rollup for optimized builds.
- Handles **node_modules dependencies** and package exports resolution.
- Enables **conditional and dynamic imports** for lazy loading modules.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Relative paths in ES modules **require explicit file extensions** in browsers.
2. Node.js supports extension-less imports for `.js` but follows internal resolution rules.
3. Circular dependencies are resolved using **module caching**, may have partially initialized exports.
4. Module resolution order differs between **Node.js and browser** environments.
5. Bundlers often **rewrite imports** to handle aliases, tree-shaking, and dynamic loading.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of module resolution like **finding a book in a library**:
  - Relative paths: looking for a book in a specific shelf (folder).
  - Node modules: searching in the library’s main catalog (node_modules).
  - Entry points: reading the book’s index (package.json main field) to find where to start.
  - Caching: remembering the location to avoid searching again.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between relative and bare specifier imports?  
A1: Relative imports specify the path to the module (`./utils.js`), bare specifiers rely on module resolution (like `lodash`) via node_modules.

Q2: How does Node.js resolve a module if only the directory is provided?  
A2: It looks for `index.js` in that directory or `package.json` main/exports field.

Q3: Can module resolution affect circular dependencies?  
A3: Yes, because modules are cached, circular dependencies may result in partially initialized exports.

Q4: How do browsers resolve ES modules differently from Node.js?  
A4: Browsers require explicit paths with extensions and use URLs; Node.js resolves using the file system and package.json entry points.
*/
