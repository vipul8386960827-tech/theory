/* 19_mjs_cjs_and_type_field.js

=====================================================
.mjs, .cjs and the "type" Field
=====================================================

Definition (What I should say in the interview):
- "Node decides whether a file is CommonJS or ESM using the file extension and package.json.
   A **.mjs** file is always treated as ESM and a **.cjs** file is always CommonJS, no matter
   what. For plain **.js** files, Node looks at the nearest package.json: if it has
   **"type": "module"**, .js files are ESM; if type is "commonjs" or missing, they are CommonJS.
   So in an ESM project I can still keep a config file as CommonJS by naming it .cjs."

-----------------------------------------------------
Decision Table
-----------------------------------------------------
File        | Nearest package.json "type" | Treated as
------------|-----------------------------|-----------
x.mjs       | anything                    | ESM
x.cjs       | anything                    | CommonJS
x.js        | "module"                    | ESM
x.js        | "commonjs" or missing       | CommonJS (*)
(*) newer Node also has "syntax detection": a typeless .js file that contains import/export
    is run as ESM. Still better to set "type" explicitly - it is faster and clearer.

-----------------------------------------------------
Example
-----------------------------------------------------
// package.json
{ "name": "api", "type": "module" }

// src/server.js  -> ESM
import express from 'express';

// .eslintrc.cjs  -> CommonJS even inside an ESM project
module.exports = { extends: ['eslint:recommended'] };

// scripts/legacy.cjs
const fs = require('fs');

// TypeScript mirrors this: .mts -> .mjs, .cts -> .cjs

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Adding "type": "module" and then getting "require is not defined in ES module scope" or
  "__dirname is not defined" in existing files.
- Using "import" in a .js file without "type": "module" -> older Node: "Cannot use import
  statement outside a module".
- A nested package.json in a subfolder changes the type for that subtree.
- Forgetting file extensions in ESM imports after switching.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the default "type"?
A1: "commonjs". If the field is missing, .js files are CommonJS.

Q2: Why do some tools need config files named .cjs?
A2: The tool loads its config with require(); in a "type": "module" project, a .js config
    would be ESM, so naming it .cjs keeps it CommonJS.

Q3: Can I run ESM code without changing package.json?
A3: Yes - rename the file to .mjs (or rely on syntax detection in newer Node).
*/
