/* 5_module_resolution.js

=====================================================
Module Resolution (how Node finds a module)
=====================================================

Definition (What I should say in the interview):
- "When I call require('x'), Node resolves it in a fixed order. First it checks if it is a
   **core module** like fs or http. If the path starts with ./, ../ or /, it is treated as a
   **file or folder** path - Node tries the exact file, then adds extensions like .js, .json,
   .node, then looks for a folder with package.json main or index.js. Otherwise it is a
   **package name**, and Node searches node_modules in the current folder, then walks up parent
   folders until the filesystem root."

-----------------------------------------------------
Resolution Order for require(X) (CommonJS)
-----------------------------------------------------
1. Core module? (fs, path, node:fs) -> return it immediately.
2. Starts with './', '../' or '/'?
   a. Try as FILE: X, X.js, X.json, X.node
   b. Try as DIRECTORY: X/package.json "main" -> X/index.js -> X/index.json -> X/index.node
3. Otherwise bare name -> look in node_modules:
   ./node_modules/X  ->  ../node_modules/X  ->  ../../node_modules/X  ... up to root
   (inside the package, "exports" in package.json is used if present, else "main", else index.js)
4. Global folders (NODE_PATH, ~/.node_modules) - legacy, rarely used.
5. Not found -> Error: Cannot find module 'X' (code MODULE_NOT_FOUND).

-----------------------------------------------------
Example
-----------------------------------------------------
require('fs');              // core module
require('./utils');         // ./utils.js or ./utils/index.js
require('express');         // node_modules/express (package.json main/exports)
require('lodash/fp');       // subpath inside a package

console.log(require.resolve('express'));        // full resolved path, without loading it
console.log(require.resolve.paths('express'));  // list of node_modules folders it checks

-----------------------------------------------------
ESM Differences
-----------------------------------------------------
- No automatic extensions and no directory index: import './utils' fails, use './utils.js'.
- Bare specifiers still use the node_modules lookup and package.json "exports".
- import.meta.resolve('pkg') gives the resolved URL.

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- require('utils') when you meant require('./utils') -> Node looks in node_modules and fails.
- Case sensitivity: works on Windows/macOS, breaks on Linux servers (Utils.js vs utils.js).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why does a package in a parent folder's node_modules get picked up?
A1: Because Node walks up the directory tree looking for node_modules until it finds the package.

Q2: How can I check which file actually gets loaded?
A2: require.resolve('name') returns the absolute path without executing the module.

Q3: What happens if I create a local file called fs.js and require('fs')?
A3: The core module wins - bare 'fs' always resolves to the built-in. Use './fs' to get your file.
*/
