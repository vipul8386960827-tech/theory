/* 24_top_level_await.js

=====================================================
Top-Level await
=====================================================

Definition (What I should say in the interview):
- "Top-level await lets me use await directly at the top of a module, outside any async function.
   In Node it works only in **ES modules** - files with .mjs or a package.json with
   "type": "module" - and it is unflagged since Node 14.8. In CommonJS it is a syntax error. Any
   module that imports a module using top-level await **waits** until that await finishes, which
   is great for loading config or connecting to a DB before the app starts."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. ESM only (.mjs or "type": "module"). Not in .cjs / default CommonJS files.
2. The module evaluation pauses; importers wait for it -> like an async dependency.
3. Sibling modules that do not depend on it can still evaluate.
4. If the awaited Promise rejects and is not caught, the program fails at startup.
5. If it never settles, Node exits with code 13 (unsettled top-level await) once the loop is empty.

-----------------------------------------------------
Example (config.mjs + app.mjs)
-----------------------------------------------------
// config.mjs
import { readFile } from 'node:fs/promises';
export const config = JSON.parse(await readFile('./config.json', 'utf8'));

// app.mjs
import { config } from './config.mjs';     // waits until config is loaded
console.log('Starting on port', config.port);

-----------------------------------------------------
CommonJS Alternative
-----------------------------------------------------
// index.js (CommonJS)
async function main() {
  const db = await connectDb();
  app.listen(3000);
}
main().catch((err) => { console.error(err); process.exit(1); });

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Using a slow top-level await in a widely imported module delays the whole app startup.
- require() of an ESM module that uses top-level await is not allowed (ERR_REQUIRE_ASYNC_MODULE),
  even in Node versions that support require(esm).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why does it not work in CommonJS?
A1: require() is synchronous and must return module.exports immediately; it cannot wait on a Promise.

Q2: Good use cases?
A2: Loading config/secrets, DB connection setup, dynamic import(), feature-flag fetching at startup.

Q3: Does top-level await block the event loop?
A3: No, it only pauses evaluation of that module graph; timers and I/O still run.
*/
