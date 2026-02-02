/* 215_anonymous_function.js

=====================================================
Anonymous Functions in JavaScript
=====================================================

Definition (Interview-friendly):
- "Anonymous functions are functions without a name. They are often 
  used as callbacks or assigned to variables for later use."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Assigned to a Variable
   - Example:
     const greet = function() {
         console.log("Hello!");
     };
     greet(); // "Hello!"

2. As a Callback
   - Example:
     setTimeout(function() {
         console.log("Executed after 1 second");
     }, 1000);

3. Using Arrow Functions (Anonymous)
   - Example:
     const sum = (a, b) => a + b;
     console.log(sum(2, 3)); // 5

4. Immediately Invoked Function Expression (IIFE)
   - Example:
     (function() {
         console.log("IIFE executed");
     })();

5. Edge Cases
   - Cannot be referenced by name for recursion unless assigned to a variable
   - No hoisting for function expressions; must be defined before use

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Anonymous function is like **a nameless helper**:
  - You can use it immediately or assign it for later, but it doesn’t have an official name.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between named and anonymous function?
A1: Named functions have a name and are hoisted; anonymous functions do not have a name and are not hoisted.

Q2: Can anonymous functions be recursive?
A2: Only if assigned to a variable or referenced through arguments.callee (not recommended).

Q3: Why use anonymous functions?
A3: For callbacks, event handlers, or temporary computations.

Q4: Are arrow functions anonymous?
A4: Usually yes, unless assigned to a variable.

Q5: Any drawbacks?
A5: Harder to debug stack traces and cannot be hoisted.
*/
