/* 152_tree_shaking.js

=====================================================
Tree Shaking in JavaScript (especially with React/Webpack)
=====================================================

Definition:
- Tree shaking is a technique used during the build process to remove 
  unused (dead) code from the final JavaScript bundle.
- The term comes from the idea of "shaking a tree" so that dead leaves 
  (unused code) fall off, leaving only what’s necessary.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. **Purpose**
   - Optimize bundle size by removing unused exports.
   - Improve application performance (faster load time, smaller downloads).

2. **How it Works**
   - Relies on **ES6 module syntax** (`import` / `export`).
   - Static analysis tools (Webpack, Rollup, esbuild) determine which code is unused.

3. **Requirements**
   - Use ES6 modules, not CommonJS (`require`, `module.exports`).
   - Minifiers like Terser help remove unused code after analysis.

4. **Limitations**
   - Works only with code that can be determined statically.
   - Dynamic imports or side effects can prevent tree shaking.
   - Some libraries might not be tree-shakable due to how they export code.

-----------------------------------------------------
Examples:
-----------------------------------------------------
// utils.js
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

// app.js
import { add } from "./utils";
console.log(add(2, 3));

// Here, `subtract` is never used. 
// Tree shaking removes it from the final bundle.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Imagine you packed for a trip but only wore a few clothes.  
- Tree shaking is like unpacking your suitcase and leaving behind 
  the clothes you never wore.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why does tree shaking require ES6 modules?  
A1: Because ES6 imports/exports are static, making it easier 
    for bundlers to analyze dependencies at build time.

Q2: Can tree shaking remove unused functions from a large library like Lodash?  
A2: Only if you use ES module builds (`lodash-es`) or import specific functions.

Q3: What are common pitfalls that prevent tree shaking?  
A3: Using CommonJS, dynamic requires/imports, or modules with side effects.

Q4: How can you verify if tree shaking is working?  
A4: Analyze bundle size with tools like `webpack-bundle-analyzer` 
    or inspect the output bundle manually.
*/
