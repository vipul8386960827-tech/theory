/* 229_error_names.js

=====================================================
Error Names in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Error names in JavaScript are string identifiers of the type 
   of error that occurred, accessible via the `name` property 
   of an Error object."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. Common Error Names:  
   - `Error` → generic error  
   - `TypeError` → wrong type usage  
   - `ReferenceError` → undefined variable  
   - `SyntaxError` → invalid code syntax  
   - `RangeError` → value out of allowed range  
   - `URIError` → invalid encode/decode URI  
   - `EvalError` → errors related to eval() (rare)  

2. `name` property is read-only and helps identify error type.  
3. Useful in `try...catch` blocks to handle errors differently 
   based on type.  
4. Custom errors can have custom names.  

-----------------------------------------------------
Examples:

// Example 1: Generic Error
let err = new Error("Something went wrong");
console.log(err.name);    // "Error"
console.log(err.message); // "Something went wrong"

// Example 2: TypeError
try {
  null.f();
} catch (e) {
  console.log(e.name);    // "TypeError"
  console.log(e.message); // "Cannot read properties of null"
}

// Example 3: ReferenceError
try {
  console.log(x); // x is not defined
} catch (e) {
  console.log(e.name);    // "ReferenceError"
  console.log(e.message); // "x is not defined"
}

// Example 4: Custom Error
class CustomError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "CustomError";
  }
}
const myErr = new CustomError("My custom issue");
console.log(myErr.name);    // "CustomError"
console.log(myErr.message); // "My custom issue"

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- `Error.name` identifies the error type.  
- Helps in conditional error handling.  
- Built-in errors cover most runtime issues; custom errors can extend for app-specific cases.  

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Think of error names like traffic lights:  
  - Red (ReferenceError) → missing signal, stop immediately  
  - Yellow (TypeError) → caution, wrong type detected  
  - Green (no error) → everything fine  

-----------------------------------------------------
Example / Usage:

try {
  throw new TypeError("Invalid type!");
} catch (e) {
  if (e.name === "TypeError") {
    console.log("Handle type errors separately");
  }
}

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can you change the name of an error?  
A1: Yes, by assigning `this.name` in a custom error class.  

Q2: Difference between `Error` and `TypeError`?  
A2: `Error` is generic; `TypeError` occurs when an operation is performed on the wrong type.  

Q3: How to differentiate errors in `catch` block?  
A3: Use `e.name` to check the type and handle accordingly.  

Q4: Are all JavaScript errors objects?  
A4: Yes, all built-in errors inherit from the Error object.  

Q5: Why is `name` property useful in debugging?  
A5: It quickly identifies the type of error without reading the full message.  
*/
