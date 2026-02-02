/* 185_js_operators.js

=====================================================
JavaScript Operators
=====================================================

Definition (Interview-friendly):
- "Operators are special symbols used to perform operations on values 
  or variables in JavaScript. They include arithmetic, assignment, 
  comparison, logical, and more."

-----------------------------------------------------
Common Operators:
-----------------------------------------------------

1. Arithmetic Operators
   - +, -, *, /, %, ++, --
   - Example:
     let a = 10, b = 3;
     console.log(a + b); // 13
     console.log(a % b); // 1

2. Assignment Operators
   - =, +=, -=, *=, /=, %=
   - Example:
     let x = 5;
     x += 3; // x = 8

3. Comparison Operators
   - ==, ===, !=, !==, >, <, >=, <=
   - Example:
     console.log(5 == "5"); // true
     console.log(5 === "5"); // false

4. Logical Operators
   - && (AND), || (OR), ! (NOT)
   - Example:
     console.log(true && false); // false

5. Ternary (Conditional) Operator
   - condition ? expr1 : expr2
   - Example:
     let age = 20;
     let canVote = age >= 18 ? "Yes" : "No";
     console.log(canVote); // "Yes"

6. typeof and instanceof
   - typeof: returns type of variable
   - instanceof: checks prototype chain
   - Example:
     console.log(typeof 10); // "number"
     console.log([] instanceof Array); // true

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Operators are like **tools in a toolbox**:
  - Each tool performs a specific action on the material (values).

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between == and ===?
A1: == compares values after type coercion; === compares value and type.

Q2: Can operators be overloaded in JS?
A2: No, JS does not support operator overloading.

Q3: What happens if you use + with strings and numbers?
A3: + concatenates if either operand is a string.

Q4: Difference between && and & in JS?
A4: && is logical AND (short-circuit), & is bitwise AND.

Q5: What is the difference between || and ?? (nullish coalescing)?
A5: || returns first truthy value; ?? returns first defined (not null/undefined) value.
*/
