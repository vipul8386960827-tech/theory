/* 
82_global_variables.js – Interview-Ready Answer

"In JavaScript, global variables are variables that are accessible from 
anywhere in the code, across functions and blocks, unless shadowed by 
local variables."

1️⃣ Key Points to Highlight

1. Definition:
- Declared outside any function or block.
- Becomes property of the `window` object in browsers.
- Can also be created by omitting `var`, `let`, or `const` (not recommended).

2. Syntax Example

// Declared globally using var
var globalVar = "I am global";

// Declared globally using let/const (block-scoped but global in file)
let globalLet = "I am global too";

// Implicit global (not recommended)
function setImplicitGlobal() {
    implicitVar = 100; // becomes global
}
setImplicitGlobal();
console.log(implicitVar); // 100

// Accessing via window
console.log(window.globalVar); // "I am global"

3. Real-Life Analogies

- Global Analogy: global variable = a public notice visible in every room.
- India-specific Analogy: globalVar = a national law accessible by all states.
- Web Analogy: Any script in the page can access global variables unless in module scope.

4. Code Explanation

- var creates global property on window object.
- let/const do not automatically attach to window in strict mode (module scope).
- Implicit globals are error-prone; use strict mode to avoid.

5. Example / Usage

var a = 10; // global
let b = 20; // file/global scope

function demo() {
    console.log(a); // 10
    console.log(b); // 20
}

demo();

// Avoid implicit globals
"use strict";
function test() {
    // c = 30; // ReferenceError in strict mode
}

6️⃣ Follow-Up Interview Questions

Q1: Difference between var, let, const globals?  
A1: var attaches to window, let/const do not; var allows redeclaration.

Q2: Are global variables bad practice?  
A2: Yes, can lead to naming collisions and harder maintenance.

Q3: How to access a global variable inside a function?  
A3: Directly if in scope; or via window.globalVar in browsers.

Q4: What is implicit global variable?  
A4: Variable created without declaration, automatically global (avoid using).

Q5: How modules affect global variables?  
A5: ES6 modules have their own scope; top-level variables are not global by default.
*/
