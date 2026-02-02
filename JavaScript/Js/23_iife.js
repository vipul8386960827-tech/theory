/* 
23_iife.js – Interview-Ready Answer:

"IIFE stands for Immediately Invoked Function Expression. It is a JavaScript function 
that runs immediately after it is defined. IIFEs are commonly used to create a private scope 
and avoid polluting the global namespace."

1️⃣ Key Points to Highlight:

1. Syntax:
- Classic IIFE:
(function() {
  console.log("IIFE executed");
})();
- Arrow function IIFE:
(() => {
  console.log("Arrow IIFE executed");
})();

2. Purpose:
- Creates a new scope to encapsulate variables.
- Avoids global variable pollution.
- Useful in legacy JavaScript before `let` and `const` were available.

3. Return Values:
- IIFE can return a value which can be stored in a variable.

Example:
const result = (function(a, b) {
  return a + b;
})(5, 10);
console.log(result); // 15

4. Arguments:
- IIFEs can take parameters like normal functions.

Example:
(function(name) {
  console.log("Hello " + name);
})("Kaizer"); // "Hello Kaizer"

5. Real-Life Analogies:

- Global Analogy:
  - IIFE = self-contained capsule that performs a task immediately and then disappears.
- India-specific Analogy:
  - IIFE = a food delivery that arrives, is consumed, and leaves, leaving no mess.
- Web Analogy:
  - IIFE = a script that executes immediately to initialize variables without
    affecting other scripts.

6. Code Explanation:
- Wrapping the function in parentheses ensures it is treated as an expression.
- The trailing `()` executes it immediately.
- Helps maintain modularity and encapsulation in older JavaScript code.

7. Example / Usage:

// Classic IIFE
(function() {
  let secret = "I am private";
  console.log(secret);
})();
// console.log(secret); // ReferenceError (cannot access private variable)

// Arrow function IIFE
(() => {
  const message = "Executed immediately!";
  console.log(message);
})();

// IIFE with parameters
const sum = (function(a, b) {
  return a + b;
})(2, 3);
console.log(sum); // 5

8️⃣ Follow-Up Interview Questions:

Q1: What is an IIFE and why is it used?  
A1: A function that executes immediately after definition, used to create a private scope and
   avoid global pollution.

Q2: Can IIFEs accept arguments?  
A2: Yes, like normal functions.

Q3: Are IIFEs still relevant in modern JS?  
A3: Less so, because `let`, `const`, and modules reduce the need, but still useful for
   legacy code.

Q4: What’s the difference between function declaration and IIFE?  
A4: Function declaration creates a named function in scope but does not execute immediately.
   IIFE executes immediately and usually has no name.

Q5: Can arrow functions be used as IIFEs?  
A5: Yes, just wrap them in parentheses and invoke with `()`.
*/
