/* 413_global_object.js

=====================================================
Global Object in Node.js
=====================================================

Definition (What I should say in the interview):
- "The global object in Node.js, named `global`, is an object that provides **variables, functions, 
   and objects accessible anywhere in the Node.js environment** without the need for importing or requiring. 
   It is similar to `window` in browsers but for server-side JavaScript."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **Available in all modules**; no need to import.
2. Contains built-in objects like:
   - `process`, `Buffer`, `console`, `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval`, etc.
3. Developers can **add custom properties** to `global` to make them accessible globally.
4. Helps in sharing data or functions across modules if needed (though generally discouraged).
5. Works as the **top-level scope** in Node.js.

-----------------------------------------------------
Basic Example (Accessing Global Properties)
-----------------------------------------------------
console.log(global.process); // Access the process object
console.log(global.Buffer);  // Access the Buffer class

-----------------------------------------------------
Adding Custom Global Variables
-----------------------------------------------------
global.myGlobalVar = "Hello, Global!";
console.log(global.myGlobalVar); // Hello, Global!

function showGlobal() {
  console.log(myGlobalVar); // Accessible here as well
}
showGlobal();

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Accessing built-in Node.js objects and functions anywhere.
- Sharing truly global constants or configuration values (with caution).
- Avoiding repeated imports for common utilities (though modular imports are preferred).

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Adding too many properties to `global` is discouraged because it can **pollute the global namespace**.
2. Unlike `window` in browsers, `global` is **specific to Node.js**.
3. Functions like `setTimeout` and `setInterval` are actually properties of the global object.
4. Variables declared with `var` at the top-level in a module **do not automatically become global**.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of `global` as the **server-wide toolbox**:
  - It contains commonly used tools and utilities that are accessible from anywhere in your application.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How is `global` in Node.js different from `window` in the browser?  
A1: `global` is the Node.js equivalent but for server-side JS; it doesn't have DOM-related properties like `window`.

Q2: Can you add custom properties to the global object?  
A2: Yes, but it is discouraged because it can lead to conflicts or maintenance issues.

Q3: Are top-level `var` variables in Node.js global?  
A3: No, top-level `var` in a module is module-scoped, not automatically global.

Q4: Name some commonly used global objects in Node.js.  
A4: `process`, `Buffer`, `console`, `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval`.
*/
