/* 1_commonjs_vs_esm.js

=====================================================
CommonJS vs ES Modules (ESM)
=====================================================

Definition (What I should say in the interview):
- "Node supports two module systems. **CommonJS** is the original one - you use require() and
   module.exports, and modules are loaded **synchronously** at runtime. **ES Modules** are the
   official JavaScript standard - you use import and export, the imports are **statically
   analyzed** before the code runs, and loading is asynchronous. New projects usually go with
   ESM, but a lot of existing code and packages are still CommonJS, so I work with both."

-----------------------------------------------------
Comparison
-----------------------------------------------------
Feature               | CommonJS                     | ES Modules
----------------------|------------------------------|-------------------------------
Syntax                | require / module.exports     | import / export
Loading               | Synchronous, at runtime      | Async, parsed before execution
Static analysis       | No (require can be anywhere) | Yes -> enables tree shaking
Top-level await       | Not supported                | Supported
this at top level     | module.exports               | undefined
__dirname/__filename  | Available                    | Use import.meta.dirname/filename
Exported values       | Copy of value at export time | Live bindings
Strict mode           | Opt-in ('use strict')        | Always strict
File extension        | .js (default) or .cjs        | .mjs, or .js with "type":"module"

-----------------------------------------------------
Example
-----------------------------------------------------
// CommonJS - math.js
function add(a, b) { return a + b; }
module.exports = { add };

// app.js
const { add } = require('./math');

// ESM - math.mjs
export function add(a, b) { return a + b; }

// app.mjs
import { add } from './math.mjs';   // file extension is REQUIRED for relative ESM imports

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Node decides the module type by extension (.mjs / .cjs) or by "type" in the nearest package.json.
- Live bindings: if an ESM module changes an exported let variable, importers see the new value.
  In CJS you get whatever value was on module.exports at the time you required it.
- In ESM, relative imports need the full extension ('./math.js'), unlike require('./math').

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Which one would you choose for a new project?
A1: ESM, because it is the standard, supports top-level await and works the same as the browser.
    I would still check that key dependencies and tooling (tests, ORMs) support it well.

Q2: Why is ESM better for tree shaking?
A2: Imports/exports are static, so bundlers know exactly what is used at build time and can drop
    unused exports. require() can be dynamic, so bundlers cannot be sure.

Q3: Can both systems be used in one project?
A3: Yes. ESM can import CJS directly. CJS loads ESM with dynamic import(), and newer Node versions
    (22+) can also require() ESM as long as the ESM graph has no top-level await.
*/
