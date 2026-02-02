/* 238_call_stack.js

=====================================================
JavaScript Call Stack – Interview-Ready Answer
=====================================================

Definition:
- "The call stack is a data structure in JavaScript that keeps track of 
  function calls. It follows the Last In, First Out (LIFO) principle, 
  ensuring that the most recently called function executes first."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Tracks execution of functions.  
   - Helps in managing synchronous function calls and returning results.

2. **Stack Nature**  
   - Last In, First Out (LIFO): last function called is executed first.  
   - When a function completes, it is popped from the stack.

3. **Error Handling**  
   - Stack overflow occurs when recursive or nested calls exceed stack size.

-----------------------------------------------------
Examples:

// Example 1: Simple function calls
function first() {
  console.log("Inside first");
  second();
  console.log("Exiting first");
}

function second() {
  console.log("Inside second");
}

first();

// Output:
// Inside first
// Inside second
// Exiting first

// Example 2: Recursive call
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(3)); // 6

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Functions are pushed to the call stack when called.  
- Stack executes top function first.  
- After function completes, it is popped and execution returns to previous function.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Think of a stack of plates: you add plates on top and remove the top one first.

-----------------------------------------------------
Example / Usage:

function a() {
  console.log("Function a start");
  b();
  console.log("Function a end");
}

function b() {
  console.log("Function b executing");
}

a();

// Output:
// Function a start
// Function b executing
// Function a end

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between call stack and event loop?  
A1: Call stack handles synchronous execution; event loop handles asynchronous callbacks.

Q2: What causes stack overflow?  
A2: Excessive or infinite recursive calls without termination.

Q3: How can you debug call stack issues?  
A3: Using browser dev tools, breakpoints, and stack traces.

Q4: Is the call stack shared between threads?  
A4: No, JavaScript is single-threaded; each execution context has its own stack.

Q5: How does stack relate to memory?  
A5: Each function call creates an execution context on the stack, including local variables and references.
*/
