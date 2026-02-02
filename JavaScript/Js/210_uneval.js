/* 210_uneval.js

=====================================================
uneval() in JavaScript
=====================================================

Definition (Interview-friendly):
- "uneval() is a non-standard JavaScript function that returns a 
  string representing the source code of an object, array, function, 
  or other expression."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Basic Usage
   - Example:
     const obj = { name: "Alice", age: 25 };
     const str = uneval(obj);
     console.log(str); // "({name:"Alice", age:25})"

2. Functions
   - Example:
     function greet() { console.log("Hello"); }
     console.log(uneval(greet)); 
     // "function greet() { console.log("Hello"); }"

3. Arrays
   - Example:
     const arr = [1,2,3];
     console.log(uneval(arr)); // "[1,2,3]"

4. Non-Standard Feature
   - Supported in Firefox, not recommended for production code
   - Alternative: JSON.stringify() for objects and arrays

5. Use Case
   - Mainly for debugging or storing object representation temporarily

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- uneval() is like **taking a snapshot of the source code**:
  - You get a textual representation of the object or function.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Is uneval() standard in all browsers?
A1: No, it is non-standard; mainly supported in Firefox.

Q2: Difference between uneval() and JSON.stringify()?
A2: uneval() returns executable code representation; JSON.stringify() returns JSON string.

Q3: Can uneval() handle functions?
A3: Yes, it returns the function’s source code as a string.

Q4: Should you use uneval() in production?
A4: No, it is not standard and may not work in all environments.

Q5: Alternative for standard environments?
A5: Use JSON.stringify() for objects/arrays or Function.toString() for functions.
*/
