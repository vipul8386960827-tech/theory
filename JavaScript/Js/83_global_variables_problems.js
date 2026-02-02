/* 
83_global_variables_problems.js – Interview-Ready Answer

"Using global variables in JavaScript can cause maintainability, debugging, 
and performance issues. Understanding the problems helps write better code."

1️⃣ Key Points to Highlight

1. Common Problems:

1. Naming Collisions:
- Multiple scripts can overwrite the same global variable unintentionally.
- Example: two scripts using `var count = 0;` will conflict.

2. Hard to Debug:
- Any function can modify global variables, making it difficult to track state changes.

3. Memory Leaks:
- Global variables persist for the lifetime of the page, increasing memory usage.

4. Tight Coupling:
- Functions dependent on globals are harder to reuse or test independently.

5. Unintentional Behavior:
- Accidentally creating implicit globals (missing var/let/const) can introduce bugs.

2. Syntax Example

// Naming collision
var user = "Alice";
function updateUser() {
    user = "Bob"; // modifies global variable
}
updateUser();
console.log(user); // Bob

// Implicit global (not recommended)
function createGlobal() {
    globalVar = 100; // becomes global
}
createGlobal();
console.log(globalVar); // 100

3. Real-Life Analogies

- Global Analogy: global variable = public notice board; anyone can change it, causing confusion.
- India-specific Analogy: globalVar = single national registry edited by multiple people; prone to errors.
- Web Analogy: many scripts on a page modifying same global variable can break functionality.

4. Code Explanation

- Avoid globals by using function scope, block scope (let/const), or modules.
- Encapsulate variables inside closures or IIFE to prevent pollution.
- Use objects or namespaces to organize shared data safely.

5. Example / Usage

// Using IIFE to avoid globals
(function() {
    var localVar = "I am safe";
    console.log(localVar); // I am safe
})();

console.log(typeof localVar); // undefined (not global)

// Using module pattern
const MyApp = (function() {
    const privateVar = "hidden";
    return {
        getVar: () => privateVar
    };
})();

console.log(MyApp.getVar()); // hidden

6️⃣ Follow-Up Interview Questions

Q1: Can global variables affect performance?  
A1: Yes, too many globals can increase memory usage and slow lookup times.

Q2: How to safely share data without globals?  
A2: Use closures, modules, or namespaced objects.

Q3: What is implicit global and why avoid it?  
A3: Variable declared without var/let/const; pollutes global scope, error-prone.

Q4: Are global variables always bad?  
A4: Not always; small, controlled globals may be acceptable, but generally avoid.

Q5: How ES6 modules help with globals?  
A5: Modules have their own scope; top-level variables are not global, reducing conflicts.
*/
