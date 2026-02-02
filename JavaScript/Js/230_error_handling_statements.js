/* 230_error_handling_statements.js

=====================================================
Error Handling Statements in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Error handling statements allow developers to catch and manage 
   runtime errors gracefully, preventing application crashes and 
   providing meaningful feedback."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **try...catch**  
   - Executes code in `try` block, and if an error occurs, control moves to `catch`.  
   - Syntax:  
     ```js
     try {
       // code that may throw
     } catch (error) {
       // handle error
     }
     ```

2. **finally**  
   - Optional block that runs regardless of error occurrence.  
   - Often used for cleanup.  
   - Syntax:  
     ```js
     try { ... } catch(e) { ... } finally { ... }
     ```

3. **throw**  
   - Used to create custom errors.  
   - Can throw any type, but usually `Error` objects are preferred.  
   - Example: `throw new Error("Custom error")`

4. **Error Object**  
   - `catch` receives an error object containing `name`, `message`, `stack`.

-----------------------------------------------------
Examples:

// Example 1: Basic try...catch
try {
  let x = y; // y is undefined
} catch (e) {
  console.log(e.name);    // ReferenceError
  console.log(e.message); // y is not defined
}

// Example 2: try...catch...finally
try {
  console.log("Try block");
  throw new Error("Something went wrong");
} catch (e) {
  console.log("Caught:", e.message);
} finally {
  console.log("Finally runs always");
}

// Example 3: Custom throw
function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}

try {
  console.log(divide(10, 0));
} catch (e) {
  console.log(e.message); // "Cannot divide by zero"
}

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- `try` runs code that might fail.  
- `catch` handles the error without breaking execution.  
- `finally` always executes for cleanup.  
- `throw` lets you create custom errors for specific conditions.  

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Try block = attempt a risky task.  
- Catch block = handle the problem if it fails.  
- Finally block = clean up regardless of success or failure.  
- Throw = alert someone that something went wrong intentionally.  

-----------------------------------------------------
Example / Usage:

try {
  let data = JSON.parse("invalid JSON");
} catch (err) {
  console.log(`Error Name: ${err.name}`);    // SyntaxError
  console.log(`Error Message: ${err.message}`); // Unexpected token i in JSON
} finally {
  console.log("Parsing attempt finished");
}

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between `throw` and `return`?  
A1: `throw` signals an error; `return` exits a function normally.  

Q2: Can `catch` run without `try`?  
A2: No, `catch` must be paired with `try`.  

Q3: What is the purpose of `finally`?  
A3: To execute code regardless of error occurrence (e.g., cleanup).  

Q4: Can you throw non-Error objects?  
A4: Yes, but using `Error` is recommended for consistency.  

Q5: How does error propagation work?  
A5: Uncaught errors bubble up the call stack until caught or terminate execution.  
*/
