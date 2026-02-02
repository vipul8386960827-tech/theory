/* 458_error_cause.js

=====================================================
Error Cause in JavaScript
=====================================================

Definition (What I should say in the interview):
- "The `cause` property in JavaScript Errors, introduced in ES2022, allows developers to **chain errors** by specifying the underlying reason for an error. 
   This helps in debugging complex applications by providing context about the root cause of failures, especially when wrapping one error inside another."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **Error Cause**
   - `new Error(message, { cause: originalError })`
   - The `cause` property holds the original error or object that triggered the current error.
   - Enhances error traceability in layered or async code.

2. **Accessing Cause**
   - `err.cause` gives the original error.
   - Works with built-in Error subclasses like `TypeError`, `RangeError`, etc.

3. **Custom Error Wrapping**
   - Allows wrapping lower-level errors with high-level application context without losing the original stack.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
try {
  try {
    JSON.parse("invalid JSON");
  } catch (innerErr) {
    throw new Error("Failed to parse configuration", { cause: innerErr });
  }
} catch (err) {
  console.log(err.message); // Failed to parse configuration
  console.log(err.cause);   // SyntaxError: Unexpected token i in JSON at position 0
}

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Wrapping errors in libraries or frameworks for better debugging.
- Maintaining clear error chains in asynchronous or nested operations.
- Providing context in API responses or logging systems.
- Debugging complex flows in Node.js or browser applications.
- Combining with custom error classes for consistent error handling.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. The `cause` property is optional; if not provided, it is `undefined`.
2. Preserves the original error stack while adding higher-level context.
3. Helps prevent losing information when rethrowing errors.
4. Supported in modern browsers and Node.js 16+.
5. Encourages better error handling patterns and maintainable code.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of `cause` as a **link in a chain**:
  - Each error can point to the previous error that caused it, making debugging easier.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How does Error cause improve debugging?  
A1: It provides context about the underlying error, helping trace the root problem in complex applications.

Q2: Can all Error types have a cause?  
A2: Yes, all built-in and custom Error subclasses can have a `cause`.

Q3: Is the `cause` property mandatory?  
A3: No, it is optional.

Q4: How does it affect stack traces?  
A4: It preserves the original stack trace while providing additional context via `cause`.

Q5: Can this be used in asynchronous operations?  
A5: Yes, it is especially useful for wrapping errors in async/await flows or Promise chains.
*/
