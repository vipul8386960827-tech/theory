/* 12_types_of_modules.js

=====================================================
Types of Modules in Node.js
=====================================================

Definition (What I should say in the interview):
- "There are three types of modules in Node. **Core (built-in) modules** ship with Node itself,
   like fs, http, path, os and events - no installation needed. **Local (custom) modules** are
   files I write in my own project and load with a relative path. **Third-party modules** are
   packages installed from npm into node_modules, like express or lodash, and loaded by name."

-----------------------------------------------------
Comparison
-----------------------------------------------------
Type          | Source              | How to load                  | Examples
--------------|---------------------|------------------------------|------------------------
Core          | Compiled into Node  | require('fs') / 'node:fs'    | fs, http, path, crypto
Local         | Your project files  | require('./utils/logger')    | routes, services
Third-party   | npm -> node_modules | require('express')           | express, axios, dotenv

-----------------------------------------------------
Example
-----------------------------------------------------
// Core
const path = require('node:path');
const os = require('node:os');
console.log(os.cpus().length, path.join(__dirname, 'uploads'));

// Third-party (after: npm install dayjs)
const dayjs = require('dayjs');
console.log(dayjs().format('YYYY-MM-DD'));

// Local
const { sendEmail } = require('./services/email');

// List every core module name
console.log(require('node:module').builtinModules);

-----------------------------------------------------
Commonly Used Core Modules
-----------------------------------------------------
fs / fs/promises -> files      | http / https -> servers & requests
path             -> file paths | events       -> EventEmitter
os               -> system info| crypto       -> hashing, random bytes
url              -> URL parsing| child_process, worker_threads, stream, util, zlib

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Core modules always have priority in resolution - a package named "fs" in node_modules
  would never be loaded by require('fs').
- Some newer core modules are only available with the node: prefix, e.g. node:test, node:sqlite.
- Also worth mentioning: JSON files and native addons (.node, compiled C++) can be required too.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Do core modules need npm install?
A1: No, they are part of the Node binary.

Q2: How do you tell if something is a core module?
A2: require('node:module').isBuiltin('fs') returns true, or check builtinModules.
*/
