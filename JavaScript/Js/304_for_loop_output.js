/* 304_for_loop_output.js

=====================================================
For Loop Output in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "A `for` loop is used to repeat a block of code a specific number of times 
  based on an initialization, condition, and increment/decrement."

Key Points to Highlight:
- Syntax: for(initialization; condition; update) { ... }
- Initialization runs once before the loop starts
- Condition is checked before each iteration; if false, loop exits
- Update executes after each iteration
- Supports break and continue for control flow

Examples:

// Basic for loop
for(let i = 0; i < 5; i++) {
  console.log(i);
}
// Output: 0 1 2 3 4

// Using break
for(let i = 0; i < 5; i++) {
  if(i === 3) break;
  console.log(i);
}
// Output: 0 1 2

// Using continue
for(let i = 0; i < 5; i++) {
  if(i === 2) continue;
  console.log(i);
}
// Output: 0 1 3 4

Code Explanation:
- Initialization sets starting point
- Condition controls loop execution
- Update modifies counter each iteration
- break exits loop early
- continue skips current iteration

Real-Life Analogy:
- Like a checklist: start from first item, move to next, stop when condition met, or skip items selectively

Example / Usage:

// Sum first 5 numbers
let sum = 0;
for(let i = 1; i <= 5; i++) {
  sum += i;
}
console.log(sum); // 15

Follow-Up Interview Questions:
- Q1: Difference between for, while, and do-while?
  A1: while checks condition first; do-while executes at least once; for includes init/update.
- Q2: Can we omit parts of the for loop?
  A2: Yes, e.g., for(;;) is an infinite loop.
- Q3: How to loop backwards?
  A3: for(let i = 5; i >= 0; i--) { ... }
- Q4: Can variables declared in for be accessed outside?
  A4: Depends on scope: let/const = block scope, var = function scope.
- Q5: Difference between break and return in loops?
  A5: break exits loop; return exits function entirely.
*/
