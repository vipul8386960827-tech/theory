/* 22_importing_json.js

=====================================================
Importing JSON Files
=====================================================

Definition (What I should say in the interview):
- "In CommonJS I can simply require('./config.json') and Node parses it into an object. In ESM a
   plain import of JSON is not allowed - I have to use an **import attribute**:
   import config from './config.json' with { type: 'json' }. The JSON is exposed as a default
   export only. For data that changes at runtime, or very large files, I usually read it with
   fs and JSON.parse instead, because both require and import cache the result."

-----------------------------------------------------
Ways to Load JSON
-----------------------------------------------------
Method                                   | Module system | Cached? | Sync?
-----------------------------------------|---------------|---------|------
require('./data.json')                   | CJS           | Yes     | Yes
import data from './d.json' with {type:'json'} | ESM     | Yes     | Static
await import('./d.json', { with: { type: 'json' } }) | Both | Yes  | Async
JSON.parse(await readFile(p, 'utf8'))    | Both          | No      | Async
createRequire(import.meta.url)('./d.json') | ESM         | Yes     | Yes

-----------------------------------------------------
Example
-----------------------------------------------------
// CommonJS
const pkg = require('./package.json');
console.log(pkg.version);

// ESM - import attributes (stable in modern Node; older versions used "assert")
import config from './config.json' with { type: 'json' };
console.log(config.port);
// import { port } from './config.json' with { type: 'json' };  -> SyntaxError, default only

// ESM - fresh read each time (not cached)
import { readFile } from 'node:fs/promises';
const settings = JSON.parse(
  await readFile(new URL('./settings.json', import.meta.url), 'utf8')
);

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Cached: if you require a JSON file and then modify the object, every importer sees the
  modified object; changes to the file on disk are not picked up until restart.
- Invalid JSON throws a SyntaxError at load time - wrap fs + JSON.parse in try/catch.
- The old syntax "assert { type: 'json' }" is deprecated/removed; use "with".
- Do not require huge JSON files at startup - it blocks the event loop while parsing.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why does ESM need with { type: 'json' }?
A1: Security - the importer explicitly states the expected type, so a server cannot trick the
    runtime into executing JavaScript when JSON was expected (important in browsers).

Q2: How do you read package.json version in an ESM project?
A2: import pkg from './package.json' with { type: 'json' }, or read it via fs and JSON.parse.
*/
