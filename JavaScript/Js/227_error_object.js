/* 227_error_object.js

=====================================================
Error Object in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "The Error object in JavaScript represents runtime errors. 
   It provides information about what went wrong, including 
   an error message and stack trace."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. Built-in object used for error handling.  
2. Provides properties:  
   - `name`: type of error (e.g., "Error", "TypeError").  
   - `message`: human-readable description.  
   - `stack`: stack trace (useful for debugging).  
3. Created using `new Error(message)` or error subclasses.  
4. Common error constructors:  
   - `Error` → generic error.  
   - `TypeError` → wrong type.  
   - `ReferenceError` → undefined variable.  
   - `SyntaxError` → invalid code syntax.  
   - `RangeError` → out-of-range values.  
5. Used inside `try...catch` for error handling.  

-----------------------------------------------------
Examples:

// Example 1: Creating an error object
let err = new Error("Something went wrong");
console.log(err.name);    // "Error"
console.log(err.message); // "Something went wrong"

// Example 2: Using specific error types
try {
  JSON.parse("invalid JSON"); // causes SyntaxError
} catch (e) {
  console.log(e.name);    // "SyntaxError"
  console.log(e.message); // "Unexpected token i in JSON"
}

// Example 3: Custom error throw
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero not allowed");
  }
  return a / b;
}

try {
  console.log(divide(10, 0));
} catch (e) {
  console.log(e.message); // "Division by zero not allowed"
}

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- The `Error` object encapsulates error details.  
- Throwing an error stops execution unless caught.  
- Catching an error (`try...catch`) gives access to its properties.  

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Like a red warning light in a car: it alerts you something is wrong 
  and gives a code/message for diagnosis.

-----------------------------------------------------
Example / Usage:

try {
  throw new ReferenceError("x is not defined");
} catch (e) {
  console.log(`Error Type: ${e.name}`);     // ReferenceError
  console.log(`Error Message: ${e.message}`); // x is not defined
}

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What are the main properties of the Error object?  
A1: `name`, `message`, and `stack`.  

Q2: Difference between `Error` and `TypeError`?  
A2: `Error` is generic; `TypeError` indicates incorrect type usage.  

Q3: Can we create custom error types?  
A3: Yes, by extending the `Error` class with `class CustomError extends Error`.  

Q4: When is an error thrown automatically in JavaScript?  
A4: During runtime (e.g., undefined variable → `ReferenceError`).  

Q5: Why is stack trace useful?  
A5: It shows where the error occurred, helping with debugging.  
*/
