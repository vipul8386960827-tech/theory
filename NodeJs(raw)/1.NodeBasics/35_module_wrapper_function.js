/* 35_module_wrapper_function.js

=====================================================
Module Wrapper Function
=====================================================

Definition (What I should say in the interview):
- "Before executing a CommonJS module, Node wraps the file's code inside a function called the
   **module wrapper**. It looks like function (exports, require, module, __filename, __dirname).
   This does two things: it gives each file its own **private scope**, so top-level variables
   don't leak into the global object, and it **injects** require, module, exports, __filename and
   __dirname - which is why they look global but are actually module-specific."

-----------------------------------------------------
What the wrapper looks like
-----------------------------------------------------
(function (exports, require, module, __filename, __dirname) {
  // your module code lives here
});
// Called roughly as: wrapper.call(module.exports, exports, require, module, filename, dirname)

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. **Module scope** -> var/let/const at top level are private to the file.
2. **Injected values** -> exports, require, module, __filename, __dirname.
3. this at top level === module.exports.
4. exports is just a shortcut reference to module.exports.
5. ES modules do NOT use this wrapper -> no __dirname/require; scope is handled natively.

-----------------------------------------------------
Example (proving the wrapper exists)
-----------------------------------------------------
// In any CommonJS file:
console.log(arguments.length);          // 5 -> the wrapper's parameters
console.log(require('module').wrapper);
// [ '(function (exports, require, module, __filename, __dirname) { ', '\n});' ]

// exports vs module.exports
exports.a = 1;                          // OK -> adds to module.exports
module.exports = { b: 2 };              // replaces the object -> 'a' is lost
// exports = { c: 3 };                  // WRONG -> only reassigns the local variable

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Writing exports = {...} and expecting it to be exported. Only module.exports is returned
  from require(); reassigning exports breaks the link between them.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why does Node wrap modules?
A1: To give every file a private scope and to provide module-specific helpers like require
    and __dirname without polluting the global scope.

Q2: What does require() return?
A2: module.exports of the loaded module (cached after the first load).

Q3: Does the wrapper apply to ES modules?
A3: No. ESM has native module scope; use import/export and import.meta instead.
*/
