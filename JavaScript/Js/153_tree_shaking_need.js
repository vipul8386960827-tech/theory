/* 153_tree_shaking_need.js

=====================================================
Need for Tree Shaking in Modern JavaScript / React
=====================================================

Definition:
- **Tree Shaking** is a technique used to remove unused code from a JavaScript bundle
  during the build process.
- It helps reduce the final bundle size, improving application load time and performance.
- Supported in module systems like ES6 (`import` / `export`).

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Purpose
   - Eliminate dead code (unused functions, constants, or components).
   - Optimize bundle size for production.

2. How It Works
   - Bundlers like Webpack analyze `import` / `export` statements.
   - Only include code that is actually used.
   - Unused exports are "shaken off" the dependency tree.

3. Requirements
   - Use ES6 modules (`import` / `export`) for static analysis.
   - Ensure code is modular and side-effect free for safe removal.

4. Benefits
   - Faster page load.
   - Smaller JavaScript bundles.
   - Better performance on low-bandwidth devices.

-----------------------------------------------------
Example:
-----------------------------------------------------
// utils.js
export function usedFunction() { console.log("Used"); }
export function unusedFunction() { console.log("Unused"); }

// app.js
import { usedFunction } from "./utils";
usedFunction();

// During tree shaking, unusedFunction will be removed from final bundle.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Imagine a tree with branches representing functions and modules.
- Tree shaking = cutting off branches that are never used to make the tree lighter.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can tree shaking remove side-effectful code?  
A1: No, code with side effects cannot be safely removed automatically.

Q2: Does tree shaking work with CommonJS modules?  
A2: Not effectively; it requires ES6 module syntax for static analysis.

Q3: How does tree shaking impact React applications?  
A3: It reduces bundle size by eliminating unused components, utilities, and libraries.

Q4: Which bundlers support tree shaking?  
A4: Webpack, Rollup, Parcel, Vite, and others support tree shaking with ES6 modules.
*/
