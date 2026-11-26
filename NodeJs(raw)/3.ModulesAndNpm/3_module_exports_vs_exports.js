/* 3_module_exports_vs_exports.js

=====================================================
module.exports vs exports
=====================================================

Definition (What I should say in the interview):
- "In CommonJS, **module.exports** is the object that require() actually returns. **exports** is
   just a shortcut variable that initially points to the same object. If I add properties to
   exports, it works because both point to the same object. But if I **reassign** exports to a
   new value, I break the link and nothing gets exported - require() still returns module.exports."

-----------------------------------------------------
How it works internally
-----------------------------------------------------
// Node roughly does this before running your file:
var module = { exports: {} };
var exports = module.exports;      // same reference
// ... your code ...
return module.exports;             // ONLY this is returned

-----------------------------------------------------
Example
-----------------------------------------------------
// 1. Works - adding properties
exports.add = (a, b) => a + b;
exports.sub = (a, b) => a - b;

// 2. Works - replacing module.exports
module.exports = class User {};

// 3. BROKEN - reassigning exports
exports = { add: (a, b) => a + b };
// require('./math') -> {}   (exports now points to a different object)

// 4. Mixing - the later module.exports assignment wins
exports.a = 1;
module.exports = { b: 2 };
// require('./file') -> { b: 2 }   (a is lost)

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Rule of thumb: use exports.x = ... for multiple named things, use module.exports = ... when
  exporting a single function/class/object.
- If you want to be safe, just always use module.exports.
- You can relink both: module.exports = exports = { ... } (seen in older libraries).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What does require() return if a file exports nothing?
A1: An empty object {} - the default value of module.exports.

Q2: Why does exports = {...} not work?
A2: exports is a local variable. Reassigning it only changes that variable; module.exports
    still points to the original object, which is what require returns.

Q3: What is this at the top level of a CommonJS module?
A3: It is module.exports (the same initial object), so this.x = 1 also exports x.
*/
