/* 457_error_stack.js

=====================================================
Error Stack in JavaScript
=====================================================

Definition (What I should say in the interview):
- "The `Error` object in JavaScript includes a `stack` property that provides a **stack trace**, showing the sequence of function calls leading to the error. 
   It is useful for debugging and understanding how and where an error occurred in your code."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **Error.stack**
   - A string representing the point in the code where the Error was instantiated.
   - Includes function names, file names, and line/column numbers.
   - Browser and Node.js formats may vary slightly.

2. **Creating an Error**
   - `const err = new Error('Something went wrong');`
   - `err.stack` provides the stack trace for debugging.

3. **Custom Errors**
   - Custom error classes inherit `stack` property from `Error`.
   - Allows maintaining consistent stack traces across application errors.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
function a() {
  b();
}

function b() {
  c();
}

function c() {
  const err = new Error('Test Error');
  console.log(err.stack);
}

a();

/* Sample Output:
Error: Test Error
    at c (<anonymous>:8:17)
    at b (<anonymous>:4:3)
    at a (<anonymous>:1:3)
    at <anonymous>:12:1

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Debugging complex function calls and understanding error flow.
- Logging detailed error information in production systems.
- Monitoring stack traces in error tracking services (like Sentry, LogRocket).
- Creating custom error classes for better debugging.
- Useful in Node.js for backend debugging and error reporting.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. The `stack` property is **non-standard but widely supported**.
2. In some environments, the stack may not include line numbers or function names.
3. Useful in combination with `try...catch` for debugging runtime errors.
4. Can be overridden for custom error messages, but typically retain the default stack for traceability.
5. Helps trace the origin of exceptions in large codebases.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of the Error stack as a **breadcrumb trail**:
  - It shows every step the code took before hitting the error, helping you retrace and debug.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between `message` and `stack` in an Error object?  
A1: `message` describes the error; `stack` shows the sequence of function calls leading to the error.

Q2: Can you modify the stack property?  
A2: Yes, but it is generally better to preserve the default stack for debugging.

Q3: How is stack useful in Node.js?  
A3: It helps trace errors in backend code, identify the source, and debug server-side issues.

Q4: Does every error have a stack property?  
A4: Yes, all `Error` instances have a stack, though the format may differ across environments.

Q5: Can custom errors inherit stack traces?  
A5: Yes, custom error classes extending `Error` automatically have the stack property.
*/
