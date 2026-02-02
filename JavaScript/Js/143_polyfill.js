/* 143_polyfill.js

=====================================================
Polyfills in JavaScript
=====================================================

Definition:
- A polyfill is a piece of code that provides modern functionality
  in older browsers that do not support it.
- Ensures consistent behavior across environments.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Example: Array.prototype.includes
   - Modern method not supported in older browsers.
   - Polyfill:
     if (!Array.prototype.includes) {
       Array.prototype.includes = function(searchElement, fromIndex) {
         return this.indexOf(searchElement, fromIndex) !== -1;
       };
     }

2. Example: Object.assign
   - Polyfill for older environments:
     if (typeof Object.assign !== 'function') {
       Object.assign = function(target, ...sources) {
         if (target == null) throw new TypeError('Cannot convert undefined or null to object');
         for (const source of sources) {
           for (const key in source) {
             if (Object.prototype.hasOwnProperty.call(source, key)) {
               target[key] = source[key];
             }
           }
         }
         return target;
       };
     }

3. Using Polyfills in Projects
   - Can be included via scripts or npm packages.
   - Example: `core-js` or `polyfill.io` for automatic polyfills.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Polyfills are like **adapters for old devices**:
  - They allow new features to work on older systems that don’t natively support them.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between polyfill and shim?
A1: Polyfill adds missing functionality; shim may also modify existing behavior for compatibility.

Q2: Why use polyfills?
A2: To maintain cross-browser compatibility and avoid runtime errors.

Q3: Are polyfills always necessary?
A3: Only if you need to support older browsers that lack certain features.

Q4: How to detect if a polyfill is needed?
A4: Use feature detection, e.g., `if (!Array.prototype.includes)`.

Q5: Can polyfills affect performance?
A5: Slightly, especially if added unnecessarily or for many features.
*/
