/* 21_import_meta_and_dirname_in_esm.js

=====================================================
import.meta and __dirname in ESM
=====================================================

Definition (What I should say in the interview):
- "In ES modules, __dirname, __filename, require and module do not exist, because those come from
   the CommonJS wrapper function. Instead ESM gives me **import.meta**, an object with metadata
   about the current module. import.meta.url is the file URL of the module. Since Node 20.11 and
   21.2 there are also **import.meta.dirname** and **import.meta.filename**, which directly replace
   __dirname and __filename. On older versions I build them from import.meta.url using
   fileURLToPath."

-----------------------------------------------------
import.meta Properties
-----------------------------------------------------
Property               | Example value                          | Since
-----------------------|----------------------------------------|------------
import.meta.url        | 'file:///home/app/src/server.js'        | always (ESM)
import.meta.filename   | '/home/app/src/server.js'               | 20.11 / 21.2
import.meta.dirname    | '/home/app/src'                         | 20.11 / 21.2
import.meta.resolve(s) | resolved URL string for a specifier    | 20.6+ (sync)
import.meta.main       | true if this is the entry module       | newest versions

-----------------------------------------------------
Example
-----------------------------------------------------
// Modern Node (20.11+)
import path from 'node:path';
const uploads = path.join(import.meta.dirname, 'uploads');

// Older Node - the classic workaround
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Reading a file next to the module without path helpers
import { readFile } from 'node:fs/promises';
const tpl = await readFile(new URL('./template.html', import.meta.url), 'utf8');

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- new URL(import.meta.url).pathname on Windows gives '/C:/...' (wrong). Use fileURLToPath.
- Confusing import.meta.dirname with process.cwd(): dirname is where the FILE lives, cwd is where
  the process was STARTED from.
- import.meta is only valid in ESM - using it in a .cjs file is a SyntaxError.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is __dirname not defined in ESM?
A1: It was never a real global - it is a parameter of the CommonJS module wrapper. ESM modules
    are not wrapped, so it does not exist.

Q2: Why is import.meta.url a URL and not a path?
A2: ESM is a web standard, and modules are identified by URLs (file:, data:, node:) everywhere.

Q3: How do you get require inside ESM?
A3: createRequire(import.meta.url) from 'node:module'.
*/
