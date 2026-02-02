/* 291_js_namespaces.js

=====================================================
JavaScript Namespaces – Interview-Ready Answer
=====================================================

Definition:
- "Namespaces in JavaScript are objects or patterns used to organize code, 
  avoid naming collisions, and group related functionalities together."

Key Points to Highlight:
- JavaScript does not have built-in namespace keyword
- Can be implemented using objects, IIFEs, or ES6 modules
- Helps prevent global scope pollution

Examples:

// Using object as namespace
const MyApp = {};
MyApp.utils = {
  log: function(msg) {
    console.log('Log:', msg);
  },
  sum: function(a, b) {
    return a + b;
  }
};

MyApp.utils.log('Hello'); // Log: Hello
console.log(MyApp.utils.sum(2,3)); // 5

// Using IIFE
const AnotherApp = (function() {
  const privateVar = 42;
  return {
    getPrivate: function() { return privateVar; }
  };
})();
console.log(AnotherApp.getPrivate()); // 42

// Using ES6 modules (conceptual)
// export function helper() { ... }
// import { helper } from './module.js'

Code Explanation:
- Objects group related methods and properties
- IIFE creates private scope to avoid global leaks
- ES6 modules provide built-in namespacing

Real-Life Analogy:
- Like folders in a file system: organize files so names don’t clash

Example / Usage:

const Utils = {
  formatDate: function(d) {
    return d.toISOString().split('T')[0];
  }
};

console.log(Utils.formatDate(new Date())); // "2025-09-22"

Follow-Up Interview Questions:
- Q1: Why are namespaces important in JS?
  A1: Prevents global scope pollution and naming collisions.
- Q2: Difference between object namespace and module?
  A2: Module has built-in scope isolation; object namespace shares global object.
- Q3: Can namespaces have private members?
  A3: Yes, via closures/IIFE or module scope.
- Q4: Are ES6 modules supported in all browsers?
  A4: Modern browsers support; older need bundlers/transpilers.
- Q5: Can you nest namespaces?
  A5: Yes, by creating objects within objects.
*/
