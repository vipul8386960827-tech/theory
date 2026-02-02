/* 406_module_cache.js

=====================================================
Module Caching in JavaScript (ES6 Modules)
=====================================================

Definition (What I should say in the interview):
- "JavaScript ES6 modules are **cached after the first import**, meaning that subsequent 
   imports of the same module do not re-execute the module code. This ensures that modules 
   are singletons by default and improves performance by avoiding redundant execution."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Modules are **executed only once** upon first import.
2. Subsequent imports **reuse the cached module**, not re-running its code.
3. Caching applies to both **static (`import`) and dynamic (`import()`) imports**.
4. Enables **singleton behavior** for shared state across modules.
5. Can be used intentionally to **store shared data or configuration**.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
// counter.js
let count = 0;
export function increment() {
  count++;
  return count;
}

// main1.js
import { increment } from './counter.js';
console.log(increment()); // 1
console.log(increment()); // 2

// main2.js (another module importing same counter)
import { increment } from './counter.js';
console.log(increment()); // 3 (uses same cached module)

-----------------------------------------------------
Dynamic Import Example
-----------------------------------------------------
async function loadModule() {
  const mod1 = await import('./counter.js'); // first import, executes module
  const mod2 = await import('./counter.js'); // cached, does not re-execute
  console.log(mod1.increment()); // 4
  console.log(mod2.increment()); // 5
}

loadModule();

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Sharing singleton instances across multiple modules.
- Keeping global configuration or state in one module.
- Avoiding unnecessary computation by leveraging cached execution.
- Ensuring consistent module behavior across the application.
- Optimizing performance in large applications with multiple imports.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Module caching is **automatic** and cannot be disabled in standard ES Modules.
2. Cached modules maintain **live bindings**; changes to exported variables are reflected in all imports.
3. Circular dependencies can interact with module cache; partially initialized exports may exist.
4. Dynamic imports also respect caching, returning the same module object.
5. Browser and Node.js module systems implement this caching behavior differently under the hood, but the principle is the same.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of module caching as **preparing a dish in a kitchen**:
  - First time you cook (import) the dish, the recipe runs fully.
  - Subsequent orders (imports) reuse the prepared dish from the fridge (cache), saving time and resources.
  - Shared ingredients (state) remain consistent for all diners (modules).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Does importing the same module multiple times re-execute it?  
A1: No, modules are executed only once; subsequent imports use the cached module.

Q2: How does module caching affect shared state?  
A2: Shared state remains consistent across all imports because they reference the same cached module.

Q3: Are dynamic imports cached as well?  
A3: Yes, dynamic imports return the cached module if it was previously imported.

Q4: What happens with circular dependencies in module caching?  
A4: Partially initialized exports may exist; developers must handle circular references carefully.
*/
