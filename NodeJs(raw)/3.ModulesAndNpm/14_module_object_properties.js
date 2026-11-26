/* 14_module_object_properties.js

=====================================================
The module Object and Its Properties
=====================================================

Definition (What I should say in the interview):
- "In CommonJS every file gets its own **module object**, which holds metadata about that module.
   The most important property is module.exports, which is what gets returned to whoever requires
   the file. It also has things like module.id, module.filename, module.loaded to see if it
   finished executing, module.parent or require.main to see who loaded it, module.children for
   modules it required, and module.paths, which lists the node_modules folders it searches."

-----------------------------------------------------
Properties
-----------------------------------------------------
Property          | Meaning
------------------|-----------------------------------------------------------
module.exports    | The value returned by require()
module.id         | Identifier - '.' for the entry module, else usually the filename
module.filename   | Absolute path of the file
module.path       | Directory of the file (same as __dirname)
module.loaded     | false while executing, true after it finished
module.children   | Modules first required by this one
module.paths      | node_modules lookup paths for this file
module.parent     | First module that required it (DEPRECATED - use require.main)
module.require()  | Same as require, but relative to this module

-----------------------------------------------------
Example
-----------------------------------------------------
// info.js
console.log({
  id: module.id,
  filename: module.filename,
  loaded: module.loaded,       // false - still running
  paths: module.paths.slice(0, 2)
});
setImmediate(() => console.log('loaded later:', module.loaded));   // true

// Related helpers on require:
require.resolve('./info');     // absolute path
require.cache;                 // all cached module objects
require.main;                  // the entry module object

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- The module object does not exist in ESM. Use import.meta (url, dirname, filename) instead.
- module.loaded is useful to understand circular dependencies: a module required during a cycle
  has loaded === false.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is module.id for the entry file?
A1: '.' - for the file started with "node app.js".

Q2: What is the relationship between module and exports?
A2: exports is a variable initialized to module.exports. The module object is the real holder.

Q3: Why is module.parent deprecated?
A3: Because a cached module can be required by many modules, so "parent" only reflects the
    first one and was misleading. Use require.main to detect the entry point.
*/
