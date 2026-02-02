/* 
67_strict_mode.js – Interview-Ready Answer

"Strict mode in JavaScript is a way to opt-in to a restricted variant of 
JS that catches common coding mistakes and unsafe actions, making code 
more predictable and easier to debug."

1️⃣ Key Points to Highlight

1. Definition:
- Introduced in ES5.
- Activated by adding "use strict"; at the top of a file or function.
- Changes previously accepted “bad syntax” into errors.

2. Key Features / Effects:
- Disallows undeclared variables (throws ReferenceError).
- Prevents assignment to read-only properties.
- Prevents deletion of variables, functions, or arguments.
- Eliminates `this` coercion (undefined instead of global object in functions).
- Duplicate parameter names in functions are not allowed.
- Prevents octal syntax (e.g., 0123).

3. Syntax Example

// Whole script in strict mode
"use strict";

let x = 10; // OK
y = 20;     // ReferenceError: y is not defined

// Function-level strict mode
function example() {
    "use strict";
    let a = 5;
    b = 10; // ReferenceError
}

4. Real-Life Analogies

- Global Analogy: Strict mode = strict teacher who enforces rules to avoid mistakes.
- India-specific Analogy: Strict mode = traffic rules enforced; no shortcuts allowed.
- Web Analogy: Enforces safer JS coding practices, preventing silent errors.

5. Code Explanation

- Forces variables to be declared before use.
- Prevents accidental globals.
- Makes silent failures (e.g., assigning to read-only properties) throw errors.
- Helps catch common bugs early, especially in large applications.

6. Example / Usage

"use strict";

function demo() {
    let a = 1;      // Correct
    // b = 2;       // ReferenceError: b is not defined
    const obj = {};
    Object.defineProperty(obj, "x", { value: 42, writable: false });
    // obj.x = 10;  // TypeError in strict mode
}

demo();

7️⃣ Follow-Up Interview Questions

Q1: How do you enable strict mode?  
A1: Using "use strict"; at the top of a script or function.

Q2: What happens to undeclared variables in strict mode?  
A2: ReferenceError is thrown.

Q3: Can strict mode be applied to individual functions?  
A3: Yes, by placing "use strict"; inside the function body.

Q4: Does strict mode affect global variables in non-strict scripts?  
A4: No, only affects the scope where it is enabled.

Q5: Why is strict mode recommended?  
A5: Prevents common errors, enforces safer coding, and improves maintainability.
*/
