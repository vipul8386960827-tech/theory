/* 142_function_parameters_count.js

=====================================================
Function Parameters Count in JavaScript
=====================================================

Definition:
- You can determine the number of parameters a function is declared with
  using the `length` property of the function.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Using `length` Property
   - Returns the number of parameters defined in the function signature.
   - Example:
     function add(a, b, c) {}
     console.log(add.length); // 3

2. Using `arguments` Object
   - Provides the number of arguments actually passed at runtime.
   - Example:
     function add(a, b, c) {
       console.log(arguments.length);
     }
     add(1, 2);       // 2
     add(1, 2, 3, 4); // 4

3. Default Parameters Effect
   - Parameters with default values are counted only if they are before any non-default parameters.
   - Example:
     function greet(a, b = 2, c) {}
     console.log(greet.length); // 2

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Function parameters count is like **the number of slots in a box**:
  - `length` tells you how many slots are declared.
  - `arguments.length` tells you how many slots are actually filled.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between `function.length` and `arguments.length`?
A1: `function.length` is declared parameters; `arguments.length` is actual passed arguments.

Q2: Do default parameters affect `length`?
A2: Yes, only parameters without default values count towards `length`.

Q3: Can arrow functions access `arguments`?
A3: No, arrow functions do not have their own `arguments` object.

Q4: How to get parameter names of a function?
A4: You can parse `function.toString()` or use libraries like `get-parameter-names`.

Q5: Why is `function.length` useful?
A5: Useful for validation, currying, or creating flexible APIs.
*/
