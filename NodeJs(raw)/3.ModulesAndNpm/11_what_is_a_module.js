/* 11_what_is_a_module.js

=====================================================
What is a Module in Node.js?
=====================================================

Definition (What I should say in the interview):
- "A module is simply a **reusable, self-contained file** of code. In Node every file is treated
   as its own module, with its **own scope** - variables and functions declared in it are private
   unless I explicitly export them. Modules let me split an app into small pieces like routes,
   services and utilities, which keeps the code organized, testable and avoids polluting the
   global scope."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. One file = one module.
2. Private by default -> only exported things are visible outside.
3. Loaded once and cached (singleton behavior).
4. Encapsulation, reusability, maintainability, easier unit testing.
5. CommonJS gets this scope through the module wrapper function:
   (function (exports, require, module, __filename, __dirname) { ...your code... })
   ESM modules get their own module scope natively.

-----------------------------------------------------
Example
-----------------------------------------------------
// logger.js
const prefix = '[APP]';                 // private - not visible outside
function log(msg) { console.log(prefix, msg); }
module.exports = { log };

// app.js
const { log } = require('./logger');
log('Server started');                  // [APP] Server started
console.log(typeof prefix);             // 'undefined' - module scope

-----------------------------------------------------
Typical Project Structure
-----------------------------------------------------
src/
  routes/userRoutes.js      -> exports an express Router
  controllers/userCtrl.js   -> request handlers
  services/userService.js   -> business logic
  models/User.js            -> DB model
  utils/logger.js           -> shared helpers

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Declaring a variable without let/const/var inside a module creates a real global (non-strict
  CJS) - a common bug. ESM is always strict, so it throws instead.
- Avoid using the global object to share data between modules; export/import it instead.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why are top-level variables in one file not visible in another?
A1: Because each CommonJS file is wrapped in a function by Node, giving it function scope;
    ESM has native module scope.

Q2: What are the benefits of modules?
A2: Encapsulation, reuse, clear dependencies, easier testing and team collaboration.
*/
