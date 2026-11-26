/* 4_module_caching.js

=====================================================
Module Caching
=====================================================

Definition (What I should say in the interview):
- "When a module is required for the first time, Node executes it and **caches** the result in
   require.cache, keyed by the resolved absolute file path. Every later require of the same file
   returns the **same cached object** without running the code again. That is why modules behave
   like singletons - for example, a database connection module is created once and shared across
   the app. ESM also caches modules, but its cache is internal and not exposed like require.cache."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Module code runs only ONCE per process (per resolved path).
2. Cache key = absolute resolved filename, so different paths to the same file (e.g. symlinks
   or different case on Windows) can create separate instances.
3. Shared state: mutating an exported object is visible to all importers.
4. require.cache can be inspected or cleared (CJS only).

-----------------------------------------------------
Example
-----------------------------------------------------
// counter.js
console.log('counter.js loaded');
let count = 0;
module.exports = { inc: () => ++count };

// app.js
const c1 = require('./counter');   // logs 'counter.js loaded'
const c2 = require('./counter');   // no log - from cache
c1.inc();
console.log(c2.inc());             // 2 -> same object
console.log(c1 === c2);            // true

// Clearing the cache (hot reload style, mostly for tests/tools)
delete require.cache[require.resolve('./counter')];
const c3 = require('./counter');   // runs the file again, fresh count

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Singleton pattern for free: config, DB pool, logger.
- If you need a NEW instance each time, export a factory function instead of an object.
- Deleting from require.cache does not update references other modules already hold.
- Test runners like Jest use their own module registry, which is why jest.resetModules() exists.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do I force a module to reload?
A1: delete require.cache[require.resolve(path)] and require it again. In ESM there is no
    official API; people use a query string trick like import('./x.js?v=2').

Q2: Is the cache per file or per module name?
A2: Per resolved absolute filename. Two different copies of lodash in node_modules are two
    separate cache entries.

Q3: How would you export something non-singleton?
A3: Export a function or class: module.exports = () => createClient(); each caller creates its own.
*/
