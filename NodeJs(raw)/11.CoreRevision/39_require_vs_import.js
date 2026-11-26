/* 2_require_vs_import.js

=====================================================
require() vs import
=====================================================

Definition (What I should say in the interview):
- "require() is a **regular function** from CommonJS - it runs at the point where it is called,
   loads the file synchronously and returns module.exports. import is **syntax**, not a function -
   static import statements are hoisted and resolved before any code in the module runs. Because
   require is just a function I can call it conditionally or inside a function, while static
   import must be at the top level. For conditional loading in ESM I use dynamic import(),
   which returns a Promise."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. require -> function call, synchronous, can be anywhere, path can be computed at runtime.
2. import -> declaration, hoisted, top level only, specifier must be a string literal.
3. import() -> function-like expression, async, returns a Promise, works in CJS and ESM.
4. require can omit extensions ('./utils'); ESM relative import needs './utils.js'.
5. Errors: a missing require target fails when that line runs; a missing import fails before the
   module starts executing.

-----------------------------------------------------
Example
-----------------------------------------------------
// CommonJS - conditional loading is fine
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// ESM - static import must be top level
import express from 'express';

// ESM - conditional loading uses dynamic import
if (process.env.NODE_ENV === 'development') {
  const { default: morgan } = await import('morgan');   // top-level await OK in ESM
  app.use(morgan('dev'));
}

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Writing import inside an if block -> SyntaxError. Use import() instead.
- Expecting import order to follow code order: all static imports run first, even if you
  console.log something above them.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is import hoisted?
A1: Yes. All static imports are resolved and their modules executed before the importing
    module's body runs, no matter where the import line appears at the top level.

Q2: Can I use require inside an ESM file?
A2: Not directly - require is not defined in ESM. You can create one with
    createRequire(import.meta.url) from the 'node:module' package if you really need it.

Q3: Which one is faster?
A3: Not a meaningful difference for most apps. The real difference is static vs dynamic
    behavior, not performance.
*/
