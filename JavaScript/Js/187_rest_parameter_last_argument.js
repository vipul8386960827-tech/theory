/* 187_rest_parameter_last_argument.js

=====================================================
Rest Parameter Must Be the Last Argument
=====================================================

Definition (Interview-friendly):
- "In JavaScript, the rest parameter collects all remaining arguments 
  into an array and must always be the last parameter in a function."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Correct Usage
   - Example:
     function greet(greeting, ...names) {
         names.forEach(name => console.log(`${greeting}, ${name}`));
     }
     greet("Hello", "Alice", "Bob"); 
     // Output:
     // Hello, Alice
     // Hello, Bob

2. Multiple Parameters Before Rest
   - Example:
     function calculate(a, b, ...nums) {
         console.log(a, b);  // first two arguments
         console.log(nums);  // remaining arguments as array
     }
     calculate(1, 2, 3, 4, 5); 
     // Output:
     // 1 2
     // [3,4,5]

3. Incorrect Usage
   - Example:
     function f(...args, extra) {} // ❌ SyntaxError
     // ❌ Rest parameter must be last

4. Difference from arguments Object
   - Rest parameter is a real array and can coexist with named parameters
   - Example:
     function f(a, b, ...rest) { console.log(rest); }

5. Edge Cases
   - Only one rest parameter allowed per function

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Rest parameter is like **a bag for leftover items**:
  - It must come last to collect whatever remains after the named items.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can you have more than one rest parameter?
A1: No, only one rest parameter is allowed.

Q2: Can rest parameter appear in the middle?
A2: No, it must be the last parameter.

Q3: Difference between rest parameter and arguments object?
A3: Rest parameter is a real array; arguments is array-like and includes all arguments.

Q4: Can rest parameter have default values?
A4: Not directly; individual elements can be handled after collection.

Q5: Is rest parameter mandatory?
A5: No, it collects remaining arguments if present; otherwise, it becomes an empty array.
*/
