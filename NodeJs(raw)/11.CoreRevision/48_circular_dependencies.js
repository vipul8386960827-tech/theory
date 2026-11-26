/* 16_circular_dependencies.js

=====================================================
Circular Dependencies
=====================================================

Definition (What I should say in the interview):
- "A circular dependency is when module A requires B and B requires A, directly or through a
   chain. Node does not crash - in CommonJS, when B requires A while A is still executing, B gets
   A's **partially filled exports**, whatever A had exported up to that point. That usually shows
   up as undefined values or 'x is not a function' errors. In ESM you get live bindings, but
   accessing a binding before it is initialized throws a ReferenceError. The real fix is to
   restructure the code so the cycle goes away."

-----------------------------------------------------
Example (CommonJS)
-----------------------------------------------------
// a.js
exports.done = false;
const b = require('./b');
console.log('in a, b.done =', b.done);
exports.done = true;

// b.js
const a = require('./a');          // a.js is mid-execution -> partial exports
console.log('in b, a.done =', a.done);
exports.done = true;

// node a.js
// in b, a.done = false
// in a, b.done = true

-----------------------------------------------------
The Classic Bug
-----------------------------------------------------
// user.js:   const { createOrder } = require('./order');   <- destructured too early
// order.js:  module.exports = { createOrder }  set AFTER requiring user.js
// -> createOrder is undefined inside user.js forever (destructuring copied undefined).
// Also: module.exports = {...} at the end REPLACES the object the other module already holds.

-----------------------------------------------------
How to Fix
-----------------------------------------------------
1. Extract shared logic into a third module that both import (best fix).
2. Use dependency injection - pass the function in instead of requiring it.
3. Require lazily inside the function that needs it (workaround).
4. Use exports.x = ... instead of reassigning module.exports, and avoid early destructuring.
5. Detect cycles with tools like madge (npx madge --circular src).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why does Node not get stuck in an infinite loop?
A1: Because a module is put into the cache before it runs. The second require finds it in the
    cache and returns the (incomplete) exports instead of loading again.

Q2: How does ESM behave differently?
A2: Bindings are live, so a function export used later (after both modules finished) works.
    But using a let/const/class export during the cycle throws ReferenceError (TDZ).

Q3: How did you find a circular dependency in practice?
A3: Usually an export was unexpectedly undefined; I checked the import chain or ran madge.
*/
