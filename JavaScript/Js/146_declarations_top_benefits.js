/* 146_declarations_top_benefits.js

=====================================================
Variable Declarations in JavaScript: Top Benefits
=====================================================

Definition:
- JavaScript supports `var`, `let`, and `const` for declaring variables.
- Choosing the right declaration affects scope, reassignability, and code safety.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. `var`
   - Function-scoped, hoisted, can be re-declared.
   - Example:
     function test() {
         var x = 1;
         if (true) {
             var x = 2; // same variable
         }
         console.log(x); // 2
     }

2. `let`
   - Block-scoped, hoisted but not initialized, cannot be re-declared in the same scope.
   - Example:
     let y = 1;
     y = 2; // ✅ allowed
     // let y = 3; // ❌ error

3. `const`
   - Block-scoped, cannot be reassigned, must be initialized.
   - Example:
     const z = 10;
     // z = 20; // ❌ error

4. Top Benefits of `let` and `const`
   - Avoids accidental redeclarations.
   - Helps prevent bugs due to scope leakage.
   - Improves code readability and maintainability.
   - `const` ensures immutability for variables that shouldn't change.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- `var` is like **a room with no walls**: anyone can change variables anywhere.
- `let` is like **a fenced yard**: scope is limited to block.
- `const` is like **a locked box**: value cannot be reassigned.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between `var` and `let`?
A1: `var` is function-scoped and allows redeclaration; `let` is block-scoped and disallows redeclaration in the same block.

Q2: Can `const` object properties be changed?
A2: Yes, the reference cannot change, but object properties can be mutated.

Q3: Are all declarations hoisted?
A3: Yes, but `let` and `const` are in a Temporal Dead Zone until initialized.

Q4: Why prefer `let`/`const` over `var`?
A4: Safer scope, prevents bugs, improves maintainability.

Q5: Can `let` or `const` be used in global scope?
A5: Yes, they become block-scoped globals, unlike `var` which becomes a global property.
*/
