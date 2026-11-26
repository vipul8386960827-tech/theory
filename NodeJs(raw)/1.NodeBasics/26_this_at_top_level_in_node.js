/* 26_this_at_top_level_in_node.js

=====================================================
"this" at the Top Level in Node.js
=====================================================

Definition (What I should say in the interview):
- "In a CommonJS module, top-level **this is module.exports**, which starts as an empty object {},
   not the global object. That's because Node wraps every file in a function and calls it with
   this set to module.exports. In an ES module, top-level this is **undefined**. In the REPL,
   this refers to the global object. Inside regular functions it depends on how they are called."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. CommonJS file  -> this === module.exports  ({} initially).
2. ES module      -> this === undefined.
3. Node REPL      -> this === globalThis.
4. Browser script -> this === window.
5. Regular function (non-strict) called plainly -> this = globalThis; strict mode -> undefined.
6. Arrow function -> takes this from the surrounding scope (so at top level: module.exports).

-----------------------------------------------------
Example (CommonJS file: node app.js)
-----------------------------------------------------
console.log(this);                          // {}
console.log(this === module.exports);       // true
console.log(this === global);               // false

this.name = 'test';
console.log(module.exports);                // { name: 'test' }

function normal() { return this === global; }
console.log(normal());                      // true (non-strict mode)

const arrow = () => this;
console.log(arrow() === module.exports);    // true

-----------------------------------------------------
Comparison Table
-----------------------------------------------------
| Context              | Top-level this        |
|----------------------|-----------------------|
| CommonJS module      | module.exports ({})   |
| ES module (.mjs)     | undefined             |
| Node REPL            | globalThis            |
| Browser script       | window                |

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Assuming this === global at top level like window in the browser -> it's module.exports.
- Writing this.x = 1 and then doing module.exports = {...} -> the earlier this.x is lost,
  because this still points to the OLD exports object.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is this equal to module.exports?
A1: The module wrapper is invoked like wrapper.call(module.exports, exports, require, module,
    __filename, __dirname), so this is bound to module.exports.

Q2: Why is this undefined in ESM?
A2: ES modules always run in strict mode and are not wrapped in a function by Node.
*/
