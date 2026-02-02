/* 248_empty_statement_purpose.js

=====================================================
Empty Statement in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "An empty statement in JavaScript is a semicolon (`;`) used where a statement is expected, 
   but no action is to be performed."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. Represented by a single semicolon `;`.
2. It does nothing — just acts as a placeholder.
3. Often used in loops where the body is intentionally left empty.
4. Can sometimes lead to confusion if misused, so use only when necessary.
5. Improves clarity in rare cases where the loop logic is fully handled in the header.

-----------------------------------------------------
Examples:

// Example 1: For loop with empty statement
let arr = [1, 2, 3, 4, 5];
let i = 0;
for (; i < arr.length; i++); // <- empty statement
console.log(i); // 5 (loop completes without body execution)

// Example 2: While loop with empty body
let j = 0;
while (j < 3); // infinite loop (danger!)
console.log("This will never run");

// Example 3: For loop skipping values
let nums = [10, 20, 30];
for (let k = 0; k < nums.length && console.log(nums[k]); k++); 
// prints 10, 20, 30 without loop body

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Imagine signing your name on an attendance sheet but skipping the class.  
  The record shows you attended, but nothing actually happened — that's an empty statement.

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- The semicolon `;` tells JavaScript that a statement is present but intentionally does nothing.
- Useful when all work is done inside the loop condition or increment.
- Dangerous if used mistakenly (may create infinite loops or skipped logic).

-----------------------------------------------------
Example / Usage:

// Using empty statement to find index
let str = "JavaScript";
let idx = 0;
for (; str[idx] !== "S"; idx++); 
console.log("Index of 'S':", idx); // 4

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What is the purpose of the empty statement?
A1: To act as a placeholder when a statement is required syntactically but no action is intended.

Q2: Can empty statements cause bugs?
A2: Yes, especially in loops where the semicolon may mistakenly terminate the loop early.

Q3: Where are empty statements practically used?
A3: Mostly in loops when the logic is contained entirely within the condition or increment section.

Q4: Is it recommended to use empty statements?
A4: Rarely. It’s better to use explicit code blocks for readability unless brevity is critical.

Q5: What is the difference between an empty block `{}` and an empty statement `;`?
A5: `{}` defines an empty block scope, while `;` is a single no-op statement.
*/
