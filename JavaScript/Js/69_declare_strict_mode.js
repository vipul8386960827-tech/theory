/* 
69_declare_strict_mode.js – Interview-Ready Answer

"Strict mode in JavaScript can be declared to enforce a stricter set 
of rules for code execution, helping catch errors and improve code quality."

1️⃣ Key Points to Highlight

1. How to Declare:
- At the beginning of a script file: applies to the entire file.
- At the beginning of a function: applies only to that function scope.

2. Syntax Examples

// Script-level strict mode
"use strict";
let x = 10; // applies to entire script

// Function-level strict mode
function myFunction() {
    "use strict";
    let y = 20; // applies only inside this function
}

3. Things to Note:
- Must be exact string "use strict"; otherwise ignored.
- Should be placed at the top before any statements.
- Can coexist with non-strict code in other parts of the file.

4. Real-Life Analogies

- Global Analogy: Declaring strict mode = setting house rules before anyone enters.
- India-specific Analogy: Declaring strict mode = government enforcing rules nationwide (script-level) vs city-level (function-level).
- Web Analogy: Enables predictable JS behavior and catches silent errors.

5. Code Explanation

- Script-level: whole file runs in strict mode.
- Function-level: only the function runs in strict mode; rest of script unaffected.
- Helps gradually adopt strict mode in legacy codebases.

6. Example / Usage

// Script-level
"use strict";
undeclaredVar = 5; // ReferenceError

// Function-level
function safeFunction() {
    "use strict";
    undeclaredVar2 = 10; // ReferenceError
}
safeFunction();

7️⃣ Follow-Up Interview Questions

Q1: Can you enable strict mode for just a block of code?  
A1: No, only at script or function level.

Q2: What happens if "use strict" is not at the top?  
A2: It is ignored; strict mode not activated.

Q3: Can you mix strict and non-strict functions in the same file?  
A3: Yes, strict mode can be function-specific.

Q4: Is strict mode backward-compatible?  
A4: Yes, code in non-strict mode still works.

Q5: Why prefer function-level strict mode in large projects?  
A5: Allows gradual adoption without breaking existing code.
*/
