/* 186_rest_parameter.js

=====================================================
Rest Parameter in JavaScript
=====================================================

Definition (Interview-friendly):
- "Rest parameters allow a function to accept an indefinite number of 
  arguments as an array, providing a flexible way to handle multiple inputs."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Basic Usage
   - Example:
     function sum(...numbers) {
         return numbers.reduce((acc, val) => acc + val, 0);
     }
     console.log(sum(1,2,3)); // 6
     console.log(sum(4,5,6,7)); // 22

2. Rest with Other Parameters
   - Example:
     function greet(greeting, ...names) {
         names.forEach(name => console.log(`${greeting}, ${name}`));
     }
     greet("Hello", "Alice", "Bob"); 
     // "Hello, Alice"
     // "Hello, Bob"

3. Difference from arguments Object
   - arguments is array-like, not a real array
   - Rest parameter is a real array with all array methods

4. Combining with Destructuring
   - Example:
     function process(first, second, ...rest) {
         console.log(first, second); // first two args
         console.log(rest);           // remaining args as array
     }
     process(1,2,3,4,5); // 1 2 [3,4,5]

5. Edge Cases
   - Can only be the last parameter in the function signature
   - Example:
     function f(...args, extra) {} // ❌ SyntaxError

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Rest parameter is like **a backpack that can hold all extra items**:
  - You don’t need to know in advance how many items there will be.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between rest parameter and arguments object?
A1: Rest parameter is a real array; arguments is array-like and includes all arguments.

Q2: Can you have multiple rest parameters?
A2: No, only one rest parameter allowed, must be last.

Q3: Can rest parameters have default values?
A3: Not directly; individual elements can be processed after collection.

Q4: Does rest parameter capture missing arguments as undefined?
A4: Only the provided arguments are collected; missing arguments are not included.

Q5: Can you use rest with destructured objects?
A5: Yes, using object rest syntax: const {a, ...rest} = obj;
*/
