/* 
68_why_strict_mode.js – Interview-Ready Answer

"Strict mode in JavaScript enforces safer coding practices, catches 
common errors, and makes debugging easier by changing how JS behaves 
in certain situations."

1️⃣ Key Points to Highlight

1. Reasons to Use Strict Mode:
- Prevents accidental globals: throws error if variables are undeclared.
- Eliminates silent errors: e.g., assigning to read-only properties throws errors.
- Prevents duplicate parameter names in functions.
- Ensures `this` is not automatically coerced to global object in functions.
- Disallows octal literals (e.g., 0123).
- Helps JS engines optimize code for better performance.

2. Syntax Example

"use strict";

function demo(a, a) { 
    // SyntaxError: Duplicate parameter name not allowed in strict mode
}

undeclaredVar = 5; 
// ReferenceError: undeclaredVar is not defined

3. Real-Life Analogies

- Global Analogy: Strict mode = strict teacher enforcing rules to prevent mistakes.
- India-specific Analogy: Strict mode = traffic police enforcing rules to avoid accidents.
- Web Analogy: Enforces better coding practices, reduces potential bugs in apps.

4. Code Explanation

- Activating strict mode at script or function level changes JS behavior.
- Helps catch common mistakes that would otherwise fail silently.
- Encourages proper variable declaration and safer code patterns.

5. Example / Usage

"use strict";

function safeFunction() {
    let x = 10; 
    // y = 20; // ReferenceError: y is not defined
    const obj = {};
    Object.defineProperty(obj, "x", { value: 42, writable: false });
    // obj.x = 50; // TypeError
}

safeFunction();

6️⃣ Follow-Up Interview Questions

Q1: Why is strict mode recommended in modern JS?  
A1: Prevents common errors, enforces safer coding, and improves maintainability.

Q2: Can strict mode improve performance?  
A2: Yes, JS engines can optimize strict mode code more efficiently.

Q3: Can strict mode be applied to individual functions?  
A3: Yes, by placing "use strict"; inside the function body.

Q4: What happens if you assign to an undeclared variable in strict mode?  
A4: Throws ReferenceError.

Q5: Are there features that strict mode disallows silently?  
A5: Yes, e.g., duplicate parameter names, octal literals, setting properties on non-writable objects.
*/
