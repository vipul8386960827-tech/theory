/* 405_dynamic_import.js

=====================================================
Dynamic Import in JavaScript (ES6 Modules)
=====================================================

Definition (What I should say in the interview):
- "Dynamic import allows JavaScript modules to be **loaded on demand** at runtime instead of 
   at compile time. Using `import()`, it returns a **Promise** that resolves to the module, 
   enabling lazy loading, code splitting, and performance optimization in modern applications."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **Asynchronous** – returns a Promise that resolves to the module object.
2. Can be used **anywhere in the code**, not just at the top level.
3. Enables **lazy loading**, reducing initial bundle size.
4. Supports **conditional module loading** based on runtime conditions.
5. Useful for **code splitting** in frameworks like React, Next.js, or Vue.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
async function loadUtils() {
  const utils = await import('./utils.js');
  console.log(utils.add(2, 3)); // 5
}

loadUtils();

-----------------------------------------------------
Conditional Loading Example
-----------------------------------------------------
const moduleName = condition ? './moduleA.js' : './moduleB.js';

import(moduleName).then((module) => {
  module.doSomething();
}).catch((err) => {
  console.error("Failed to load module:", err);
});

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Lazy-loading features or heavy modules only when needed.
- Code splitting in frontend frameworks (React, Next.js) to improve performance.
- Loading polyfills conditionally based on browser support.
- Reducing initial load time in large web applications.
- Conditional loading of admin or premium modules.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. `import()` returns a **Promise**, so always handle `.then()` or `await`.
2. Can be used **inside functions, if blocks, or event handlers**.
3. Works seamlessly with modern bundlers like Webpack, Vite, or Rollup for code splitting.
4. Static `import` is still preferred for modules always required at startup.
5. Helps optimize web apps by **loading only necessary code** at runtime.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of dynamic import like **ordering a book from a library** only when you need it:
  - The book isn’t on your desk initially (no static import).
  - You request it (import()), and once it arrives (Promise resolves), you use it.
  - This saves space and improves efficiency.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between static import and dynamic import?  
A1: Static import is resolved at compile time and loaded upfront. Dynamic import (`import()`) is asynchronous, resolved at runtime, and can be loaded conditionally.

Q2: Can you use dynamic import in Node.js?  
A2: Yes, Node.js supports dynamic import in ES Module mode.

Q3: How does dynamic import help in performance optimization?  
A3: By lazy-loading modules, it reduces initial bundle size and improves page load time.

Q4: Can dynamic imports be used inside loops or event handlers?  
A4: Yes, dynamic imports can be used anywhere in the code and return a Promise.
*/
