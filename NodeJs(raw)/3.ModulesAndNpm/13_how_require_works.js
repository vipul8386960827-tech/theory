/* 13_how_require_works.js

=====================================================
How require() Works Internally
=====================================================

Definition (What I should say in the interview):
- "When I call require('./x'), Node goes through five steps: it **resolves** the path to an
   absolute filename, checks the **cache** and returns the cached exports if the file was
   already loaded, otherwise **loads** the file content, **wraps** it in a function that
   provides exports, require, module, __filename and __dirname, **evaluates** it, and finally
   **caches and returns** module.exports. The whole thing is synchronous, which is why require
   blocks until the file is read and executed."

-----------------------------------------------------
The 5 Steps
-----------------------------------------------------
1. Resolving  -> turn './x' into 'C:/app/x.js' (see module resolution rules).
2. Caching    -> if require.cache[filename] exists, return its exports immediately.
3. Loading    -> read the file; behavior depends on extension (.js, .json, .node).
4. Wrapping   -> wrap the code in the module wrapper function.
5. Evaluating -> run the wrapper, store module in cache, return module.exports.

-----------------------------------------------------
The Module Wrapper
-----------------------------------------------------
(function (exports, require, module, __filename, __dirname) {
  // your module code lives here
});

// You can see it:
console.log(require('node:module').wrapper);
// You can prove it - the arguments object exists at top level in CJS:
console.log(arguments.length);   // 5

-----------------------------------------------------
Example
-----------------------------------------------------
// greet.js
console.log('loading greet');
module.exports = (name) => `Hi ${name}`;

// app.js
console.log('before');
const greet = require('./greet');  // 'loading greet' printed here - synchronous
console.log('after');
console.log(greet('Alex'));
// Output: before -> loading greet -> after -> Hi Alex

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Module is cached BEFORE it finishes executing -> this is what makes circular requires return
  partially filled exports.
- .json files are parsed with JSON.parse; .node files are loaded with process.dlopen.
- Because require is synchronous, avoid calling it inside hot request handlers (first call
  reads from disk and blocks).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Where do __dirname and __filename come from?
A1: They are parameters of the module wrapper function, not real globals.

Q2: Is require synchronous or asynchronous?
A2: Synchronous - it reads and runs the file before returning.

Q3: What does require return if the module throws while loading?
A3: The error propagates to the caller and the module is removed from the cache, so a later
    require will try loading it again.
*/
