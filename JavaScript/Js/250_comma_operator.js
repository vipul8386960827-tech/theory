/* 250_comma_operator.js

=====================================================
Comma Operator in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "The comma operator (`,`) allows multiple expressions to be 
   evaluated in sequence, returning the value of the last expression."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. Evaluates expressions from left to right.  
2. Returns the result of the last expression.  
3. Often used in `for` loops for compactness.  
4. Rarely used elsewhere because it reduces readability.  
5. Different from separating function arguments with commas.  

-----------------------------------------------------
Examples:

// Example 1: Basic usage
let result = (1, 2, 3);
console.log(result); // 3

// Example 2: Multiple expressions
let x = 0;
let y = (x += 1, x += 2, x += 3);
console.log(y); // 6

// Example 3: In for loops
for (let i = 0, j = 3; i < j; i++, j--) {
  console.log(i, j);
}
// Output:
// 0 3
// 1 2

// Example 4: With assignment
let a;
a = (10, 20, 30);
console.log(a); // 30

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Imagine doing three chores in a row (washing, cooking, cleaning) 
  but only reporting the last one (cleaning).  
  The other tasks still happen, but only the last result matters.

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Each expression before the last is evaluated and discarded.  
- The final expression’s result is returned.  
- Useful for compact syntax, especially in loop initializers or increments.  

-----------------------------------------------------
Example / Usage:

let value = (console.log("first"), console.log("second"), 42);
console.log(value); 
// prints: "first", "second" 
// returns: 42

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What does the comma operator return?  
A1: The value of the last evaluated expression.  

Q2: Where is the comma operator commonly used?  
A2: In `for` loops to update multiple variables.  

Q3: Is it recommended to use the comma operator often?  
A3: No, because it reduces readability; use it only when necessary.  

Q4: How is the comma operator different from separating arguments with commas?  
A4: Argument commas separate function inputs, while the comma operator 
    evaluates multiple expressions and returns the last.  

Q5: Does the comma operator change execution order?  
A5: No, it always evaluates left to right.  
*/
