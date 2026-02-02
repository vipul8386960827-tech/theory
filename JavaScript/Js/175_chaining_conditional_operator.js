/* 175_chaining_conditional_operator.js

=====================================================
Chaining Conditional (Ternary) Operator in JavaScript
=====================================================

Definition (Interview-friendly):
- "Chaining the ternary operator allows multiple conditions to be evaluated
  in a single expression, returning different values based on which condition is true."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Basic Nested Ternary
   - Example:
     const score = 85;
     const grade = score >= 90 ? "A" :
                   score >= 75 ? "B" :
                   score >= 60 ? "C" : "F";
     console.log(grade); // "B"

2. Assigning Based on Multiple Conditions
   - Example:
     const age = 25;
     const category = age < 13 ? "Child" :
                      age < 20 ? "Teen" :
                      age < 60 ? "Adult" : "Senior";
     console.log(category); // "Adult"

3. Using in Functions
   - Example:
     function getFee(isMember, isStudent) {
         return isMember ? "$2.00" :
                isStudent ? "$5.00" : "$10.00";
     }
     console.log(getFee(false, true)); // "$5.00"

4. Readability Consideration
   - Avoid over-nesting; use if-else for complex conditions.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Chained ternary is like a **series of checkpoints**:
  - "If first condition, do this; else if second, do that; else fallback."

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can nested ternary affect readability?
A1: Yes, over-nesting makes code harder to read; use sparingly.

Q2: Difference between nested ternary and if-else?
A2: Nested ternary is concise; if-else is clearer for complex logic.

Q3: Can ternary operators return different types?
A3: Yes, strings, numbers, objects, or function calls.

Q4: Is there a limit to how many ternary operators can be chained?
A4: No hard limit, but readability and maintainability suffer with too many.

Q5: Best practice for using chained ternary?
A5: Keep it short (2-3 conditions max) or switch to if-else for clarity.
*/
