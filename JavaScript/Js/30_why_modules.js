/* 
30_why_modules.js – Interview-Ready Answer:

"Modules in JavaScript provide a way to organize, encapsulate, and reuse code. They help 
in maintaining clean, scalable, and maintainable applications by separating concerns."

1️⃣ Key Points to Highlight:

1. Code Encapsulation:
- Variables and functions inside a module are private by default.
- Only explicitly exported items are accessible outside.

2. Reusability:
- Modules allow the same functionality to be reused across multiple files or projects.

3. Maintainability:
- Easier to debug and update code when logic is separated into modules.
- Avoids large monolithic files.

4. Avoiding Global Namespace Pollution:
- Without modules, all variables go into global scope, risking name collisions.
- Modules create their own scope by default.

5. Dependencies:
- Modules can import and export specific pieces of code, making dependency management clear.

6. Tree-shaking:
- Modern bundlers can remove unused exports from modules, optimizing file size.

2️⃣ Examples:

// math.js
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

// app.js
import { add } from "./math.js";
console.log(add(5, 3)); // 8

// Benefits:
// - Only `add` is imported, reducing code bundle size (tree-shaking).
// - Variables in math.js not exported remain private.

3️⃣ Real-Life Analogies:

- Global Analogy:
  - Modules = separate drawers for tools; only take what you need.
- India-specific Analogy:
  - Modules = separate containers in a kitchen; spices, grains, and pulses are separated and accessed as needed.
- Web Analogy:
  - Modules = JS components or utilities that export only necessary functionality to the main app.

4️⃣ Code Explanation:

- Modules prevent accidental overwriting of variables in global scope.
- They allow clean separation of logic (e.g., utility functions, components).
- Imports/exports make dependencies explicit.

5️⃣ Example / Usage:

// utils.js
export const PI = 3.14;
export function area(radius) { return PI * radius * radius; }

// app.js
import { area } from "./utils.js";
console.log(area(5)); // 78.5

6️⃣ Follow-Up Interview Questions:

Q1: Why are modules preferred over putting everything in one file?  
A1: Encapsulation, reusability, maintainability, avoiding global namespace pollution.

Q2: How do modules help in large applications?  
A2: By separating concerns, making code readable, maintainable, and easier to debug.

Q3: What is the difference between modules and scripts?  
A3: Scripts share the global scope; modules have their own scope and use imports/exports.

Q4: Can modules improve performance?  
A4: Yes, tree-shaking removes unused code, reducing bundle size.

Q5: Are variables in modules accessible globally by default?  
A5: No, only exported variables/functions are accessible outside the module.
*/
