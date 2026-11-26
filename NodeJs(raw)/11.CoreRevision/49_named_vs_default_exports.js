/* 20_named_vs_default_exports.js

=====================================================
Named vs Default Exports
=====================================================

Definition (What I should say in the interview):
- "In ESM, a module can have **many named exports** but only **one default export**. Named
   exports are imported with curly braces and the exact name, like import { add } from './math.js',
   while a default export is imported without braces and I can give it any name. I usually prefer
   named exports in shared code because the names are consistent across the codebase, refactoring
   and auto-import work better, and typos give an error at import time."

-----------------------------------------------------
Comparison
-----------------------------------------------------
Aspect              | Named                         | Default
--------------------|-------------------------------|------------------------------
How many per module | Many                          | One
Import syntax       | import { add } from './m.js'  | import anything from './m.js'
Naming              | Must match (or use "as")      | Importer chooses the name
Typo detection      | Error if the name is missing  | Always "works"
Best for            | Utils, constants, many things | Single main thing (a class, a router)

-----------------------------------------------------
Example
-----------------------------------------------------
// math.js
export const PI = 3.14;
export function add(a, b) { return a + b; }
export default function multiply(a, b) { return a * b; }

// app.js
import multiply, { add, PI } from './math.js';   // default + named together
import { add as sum } from './math.js';          // rename a named import
import * as math from './math.js';               // namespace: math.add, math.default

// Re-exporting (barrel file: src/utils/index.js)
export { add, PI } from './math.js';
export { default as multiply } from './math.js';
export * from './strings.js';                    // does NOT re-export default

-----------------------------------------------------
CommonJS Mapping
-----------------------------------------------------
module.exports = fn;         -> similar to a default export
exports.add = fn;            -> similar to named exports
// ESM importing CJS: import x from 'cjs' gives module.exports as the default.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- export default can be an expression: export default { a, b } - but then { a } cannot be
  imported with named syntax, because it is one object, not named exports.
- Big barrel files can slow startup and hurt tree shaking; do not overuse them.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can a module have both default and named exports?
A1: Yes, e.g. import React, { useState } from 'react'.

Q2: Does export * include the default export?
A2: No. You must re-export it explicitly with export { default } from './x.js'.
*/
