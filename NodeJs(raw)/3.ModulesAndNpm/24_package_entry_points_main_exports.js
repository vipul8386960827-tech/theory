/* 24_package_entry_points_main_exports.js

=====================================================
Package Entry Points: "main" vs "exports"
=====================================================

Definition (What I should say in the interview):
- "The **main** field is the classic way to define the entry file of a package - when someone
   requires the package by name, Node loads that file. The newer **exports** field is more
   powerful: it can define multiple entry points like 'pkg' and 'pkg/utils', provide different
   files for import vs require through **conditional exports**, and it **encapsulates** the package
   - any path not listed in exports cannot be imported. When both exist, modern Node uses exports."

-----------------------------------------------------
Example
-----------------------------------------------------
{
  "name": "my-lib",
  "type": "module",
  "main": "./dist/index.cjs",              // fallback for very old tools
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",        // TypeScript (must come first)
      "import": "./dist/index.js",         // used by import
      "require": "./dist/index.cjs"        // used by require
    },
    "./utils": "./dist/utils.js",          // my-lib/utils
    "./package.json": "./package.json"
  },
  "imports": {
    "#db": "./src/db/index.js"             // internal alias: import db from '#db'
  }
}

// Consumer
import lib from 'my-lib';                  // -> dist/index.js
const lib2 = require('my-lib');            // -> dist/index.cjs
import { x } from 'my-lib/utils';          // OK
import y from 'my-lib/dist/secret.js';     // ERR_PACKAGE_PATH_NOT_EXPORTED

-----------------------------------------------------
Comparison
-----------------------------------------------------
Feature                    | main     | exports
---------------------------|----------|--------------------------------
Single entry point         | Yes      | Yes
Multiple subpaths          | No       | Yes
Different file for ESM/CJS | No       | Yes (conditions: import/require/node/default)
Hides internal files       | No       | Yes
Priority                   | Fallback | Wins when present

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Adding "exports" to an existing package can be a BREAKING change - users deep-importing
  internal files will start getting ERR_PACKAGE_PATH_NOT_EXPORTED.
- Condition order matters: Node picks the first matching key; put "default" last.
- (Comments above are only for explanation - real package.json cannot contain comments.)

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What error do you get when importing an unlisted subpath?
A1: ERR_PACKAGE_PATH_NOT_EXPORTED.

Q2: What is the "imports" field?
A2: Private, package-internal aliases starting with #, e.g. import cfg from '#config'. They only
    work inside the package itself.
*/
