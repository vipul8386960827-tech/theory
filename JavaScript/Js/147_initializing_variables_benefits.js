/* 147_initializing_variables_benefits.js

=====================================================
Initializing Variables in JavaScript: Benefits
=====================================================

Definition:
- Initializing a variable means assigning it a value at the time of declaration.
- Helps avoid undefined behavior and improves code clarity.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Avoiding `undefined`
   - Example:
     let count;
     console.log(count); // undefined
     let count2 = 0;
     console.log(count2); // 0

2. Default Values for Logic
   - Ensures variables have a known starting value.
   - Example:
     let total = 0;
     for (let i = 0; i < 5; i++) {
         total += i;
     }

3. Improves Code Readability
   - Other developers can understand the intended initial state.
   - Example:
     const name = ""; // clearly a string intended

4. Prevents Runtime Errors
   - Using uninitialized variables can lead to unexpected behavior.
   - Example:
     let sum;
     // sum += 5; // NaN
     let sum2 = 0;
     sum2 += 5; // 5 ✅

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Initializing variables is like **starting a car with fuel**:
  - You ensure the variable is ready for operations and avoids surprises.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between declaration and initialization?
A1: Declaration defines the variable; initialization assigns a starting value.

Q2: Does `const` require initialization?
A2: Yes, `const` must be initialized at declaration.

Q3: Can you initialize variables later?
A3: Yes, with `let` or `var`, but `const` must be initialized immediately.

Q4: Why is initialization important in loops?
A4: Ensures counters or accumulators start from a known value.

Q5: Can initialization help with type safety?
A5: Yes, initializing with correct type avoids unintended coercion.
*/
