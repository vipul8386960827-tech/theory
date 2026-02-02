/* 
29_modules.js – Interview-Ready Answer:

"Modules in JavaScript allow developers to break code into reusable, maintainable pieces. 
ES6 introduced native support for modules using `import` and `export` syntax."

1️⃣ Key Points to Highlight:

1. Export Types:
- Named Export:
export const name = "Kaizer";
export function greet() { return "Hello"; }
- Default Export:
export default function add(a, b) { return a + b; }

2. Import Types:
- Named Import:
import { name, greet } from "./module.js";
- Default Import:
import add from "./module.js";
- Can combine:
import add, { name, greet } from "./module.js";

3. Advantages of Modules:
- Encapsulation: keeps variables and functions private unless exported.
- Reusability: easy to reuse functions across multiple files.
- Maintainability: separates concerns into logical units.
- Avoids global namespace pollution.

4. Differences from CommonJS:
| Feature           | ES6 Modules        | CommonJS (Node.js)        |
|------------------|------------------|--------------------------|
| Syntax            | import/export    | require/module.exports   |
| Execution         | Static (compile-time) | Dynamic (runtime)     |
| Tree-shaking      | Supported        | Not supported            |

5. Examples:

// module.js
export const PI = 3.14;
export function area(radius) {
  return PI * radius * radius;
}
export default function circumference(radius) {
  return 2 * PI * radius;
}

// main.js
import circumference, { PI, area } from "./module.js";
console.log(PI); // 3.14
console.log(area(5)); // 78.5
console.log(circumference(5)); // 31.4

6️⃣ Real-Life Analogies:

- Global Analogy:
  - Module = toolbox; you can take only the tools you need.
- India-specific Analogy:
  - Module = spice box; pick the spices needed for a dish without mixing everything.
- Web Analogy:
  - Module = JS component that exports only necessary functions or constants for use elsewhere.

7. Code Explanation:

- `export` makes variables, functions, or classes available to other files.
- `import` brings those exports into another file.
- Default export allows one main export per module.
- Named exports allow multiple exports per module.

8️⃣ Example / Usage:

// utils.js
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export const name = "Kaizer";

// app.js
import { add, subtract, name } from "./utils.js";
console.log(add(5, 3)); // 8
console.log(subtract(5, 3)); // 2
console.log(name); // "Kaizer"

9️⃣ Follow-Up Interview Questions:

Q1: Difference between default export and named export?  
A1: Default export allows one primary export per module, imported without braces. Named exports allow multiple exports, imported with braces.

Q2: Can you mix default and named exports in one module?  
A2: Yes, both can coexist.

Q3: Are ES6 modules synchronous or asynchronous?  
A3: ES6 modules are static and resolved at compile-time. In browsers, module loading is asynchronous.

Q4: What is tree-shaking?  
A4: Removing unused code during bundling to reduce file size, possible with ES6 modules.

Q5: How is scope handled in modules?  
A5: Each module has its own scope; variables are private unless exported.
*/
