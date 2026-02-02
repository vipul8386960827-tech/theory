/* 404_export_statement.js

=====================================================
Export Statement in JavaScript (ES6 Modules)
=====================================================

Definition (What I should say in the interview):
- "The `export` statement in JavaScript is used to **expose functions, objects, classes, 
   or primitives from a module** so that they can be imported and used in other modules. 
   It enables modular and maintainable code, supports named and default exports, and 
   allows tree-shaking for optimized bundles."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **Named Exports** – Export multiple entities by name.
2. **Default Export** – Export a single main value from a module.
3. Can export **functions, classes, variables, constants, objects**.
4. Supports **re-exporting** from other modules using `export ... from`.
5. Modules with exports are isolated, avoiding **global namespace pollution**.

-----------------------------------------------------
Basic Example (Named Export)
-----------------------------------------------------
// mathUtils.js
export const PI = 3.14;
export function add(a, b) { return a + b; }

// main.js
import { PI, add } from './mathUtils.js';
console.log(PI);       // 3.14
console.log(add(2, 3)); // 5

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
Re-Export Example
-----------------------------------------------------
// utils.js
export { add } from './mathUtils.js';
export { default as log } from './logger.js';

// main.js
import { add, log } from './utils.js';
console.log(add(10, 5)); // 15
log("Message");           // Log: Message

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Sharing reusable code between multiple files.
- Organizing large projects into smaller, maintainable modules.
- Exposing library APIs for external use.
- Supporting tree-shaking to reduce final bundle size.
- Separating core logic from application entry points.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Named exports can have multiple per module; default export can have only one.
2. You can combine named and default exports in the same module.
3. Use `export ... from` for re-exporting without importing first.
4. Exported entities are **live bindings**, so updates reflect in importing modules.
5. Export statements must be at the **top level**; cannot be used inside blocks or functions.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of `export` as **packaging items in a toolbox**:
  - You choose which tools (functions/variables) to put in the box (module) for others to use.
  - Named export is like labeling each tool; default export is like designating the main tool in the box.
  - Re-exporting allows combining tools from multiple boxes into one.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between named and default exports?  
A1: Named exports allow multiple entities to be exported and imported by name. Default export allows only one per module and can be imported with any name.

Q2: Can you export and import in the same statement?  
A2: Yes, using `export ... from` syntax for re-exporting.

Q3: What are live bindings in exports?  
A3: Changes to exported variables in the source module are reflected in all importing modules.

Q4: Can you have multiple default exports in a module?  
A4: No, only one default export is allowed per module.
*/
