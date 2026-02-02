/* 174_conditional_operator.js

=====================================================
Conditional (Ternary) Operator in JavaScript
=====================================================

Definition (Interview-friendly):
- "The conditional or ternary operator is a shorthand way to write 
  an if-else statement in a single line. It evaluates a condition 
  and returns one value if true, another if false."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Basic Usage
   - Syntax: condition ? valueIfTrue : valueIfFalse
   - Example:
     const age = 18;
     const status = age >= 18 ? "Adult" : "Minor";
     console.log(status); // "Adult"

2. Nested Ternary Operator
   - Can chain multiple conditions.
   - Example:
     const score = 85;
     const grade = score >= 90 ? "A" :
                   score >= 75 ? "B" : "C";
     console.log(grade); // "B"

3. Assigning Default Values
   - Example:
     const name = userName ? userName : "Guest";

4. Using in Functions
   - Example:
     function getFee(isMember) {
         return isMember ? "$2.00" : "$10.00";
     }
     console.log(getFee(true)); // "$2.00"

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Ternary operator is like a **quick yes/no decision**:
  - "If condition is true, do this; otherwise, do that" in one line.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between if-else and ternary operator?
A1: Ternary is shorthand for simple conditions; if-else is more readable for complex logic.

Q2: Can ternary operator be nested?
A2: Yes, but readability may decrease if overused.

Q3: Can ternary operator return different types?
A3: Yes, it can return numbers, strings, objects, or function results.

Q4: Can ternary operator be used without assigning to a variable?
A4: Yes, e.g., `condition ? doSomething() : doSomethingElse();`

Q5: What is a common pitfall of nested ternary operators?
A5: Reduced readability and higher chance of mistakes; prefer if-else for clarity.
*/
