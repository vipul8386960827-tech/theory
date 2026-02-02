/* 292_declare_namespace.js

=====================================================
Declaring Namespaces in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Since JavaScript does not have a built-in namespace keyword, 
  namespaces are declared using objects, IIFEs, or ES6 modules 
  to organize code and avoid global scope pollution."

Key Points to Highlight:
- Objects can act as namespaces
- IIFEs can create private scopes
- ES6 modules provide native support for namespacing
- Helps group related functions, variables, and constants
- Prevents naming collisions in large applications

Examples:

// Using object
const MyApp = {};
MyApp.utils = {
  log: function(msg) { console.log(msg); },
  sum: function(a, b) { return a + b; }
};
MyApp.utils.log('Hello'); // Hello

// Using IIFE
const AnotherApp = (function() {
  const privateVar = 100;
  return {
    getPrivate: function() { return privateVar; }
  };
})();
console.log(AnotherApp.getPrivate()); // 100

// Using ES6 module (conceptual)
// export function helper() { ... }
// import { helper } from './module.js'

Code Explanation:
- Object namespaces group related properties/methods
- IIFE creates private variables not accessible globally
- ES6 modules isolate code into files

Real-Life Analogy:
- Like folders in a computer: keep files organized and avoid name clashes

Example / Usage:

const Utils = {
  formatDate: function(d) { return d.toISOString().split('T')[0]; }
};
console.log(Utils.formatDate(new Date())); // "2025-09-22"

Follow-Up Interview Questions:
- Q1: Can namespaces have private members?
  A1: Yes, using closures/IIFE or ES6 module scope.
- Q2: Why use namespaces instead of globals?
  A2: To avoid collisions and organize code.
- Q3: Can namespaces be nested?
  A3: Yes, objects within objects.
- Q4: Difference between object namespace and module?
  A4: Module provides native scope isolation and import/export.
- Q5: Are ES6 modules supported in all browsers?
  A5: Supported in modern browsers; older require bundlers.
*/
