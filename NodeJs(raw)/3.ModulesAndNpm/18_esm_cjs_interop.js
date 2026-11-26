/* 18_esm_cjs_interop.js

=====================================================
ESM <-> CommonJS Interoperability
=====================================================

Definition (What I should say in the interview):
- "**ESM can import CommonJS** directly - module.exports becomes the default export, and Node
   also tries to detect named exports statically so import { x } often works too. **CommonJS
   loading ESM** is the harder direction: traditionally require() could not load ESM and threw
   ERR_REQUIRE_ESM, so you had to use dynamic import(). Newer Node versions (enabled by default
   in Node 22.12+ and 20.19+) support require(esm) as long as the ES module graph is synchronous,
   meaning no top-level await."

-----------------------------------------------------
Direction Summary
-----------------------------------------------------
From -> To   | How                              | Notes
-------------|----------------------------------|-----------------------------------------
ESM -> CJS   | import pkg from 'cjs-pkg'        | default = module.exports; named exports
             | import { a } from 'cjs-pkg'      | work only if statically detectable
CJS -> ESM   | await import('esm-pkg')          | always works, async
CJS -> ESM   | require('esm-pkg')               | Node 22.12+/20.19+, no top-level await,
             |                                  | returns the namespace object

-----------------------------------------------------
Example
-----------------------------------------------------
// ESM importing a CJS package
import express from 'express';            // default = module.exports
import { readFile } from 'node:fs';       // core modules: named exports fine
import pkg from 'some-cjs-lib';
const { helper } = pkg;                   // fallback if named import fails

// ESM needs require for something? create it
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const data = require('./data.json');

// CJS loading an ESM-only package (works on any modern Node)
async function main() {
  const { default: chalk } = await import('chalk');
}

// Newer Node: require(esm) - sync ESM only
const { add } = require('./math.mjs');    // throws ERR_REQUIRE_ASYNC_MODULE if it uses TLA

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- "SyntaxError: Named export 'x' not found" -> CJS module exports were not statically
  detectable; import the default and destructure.
- Dual packages risk the "dual package hazard": both CJS and ESM copies load, so state is
  duplicated (instanceof checks fail). Use "exports" conditions carefully.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why was require(esm) not possible before?
A1: require is synchronous, while ESM loading can be async (top-level await). Newer Node allows
    it only for graphs with no top-level await.

Q2: An old CJS project needs an ESM-only package. Options?
A2: Use await import(), upgrade Node to a version with require(esm), pin the last CJS version
    of the package, or migrate the project to ESM.
*/
