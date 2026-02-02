/* 246_min_max_values.js

=====================================================
Finding Minimum and Maximum Values in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Finding the minimum or maximum means determining the smallest or largest 
  value from a set of numbers or array elements."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
- Use Math.min() and Math.max() for individual numbers or arrays (with spread operator).
- Use loops or reduce for arrays in older environments.
- Works with numbers; for objects, extract numeric property first.

-----------------------------------------------------
Examples:

// Using Math.min and Math.max with numbers
console.log(Math.min(5, 10, -3)); // -3
console.log(Math.max(5, 10, -3)); // 10

// Using Math with arrays and spread operator
const arr = [2, 7, 1, 9, 4];
const minVal = Math.min(...arr);
const maxVal = Math.max(...arr);
console.log(minVal, maxVal); // 1 9

// Using reduce method
const minReduce = arr.reduce((a, b) => a < b ? a : b);
const maxReduce = arr.reduce((a, b) => a > b ? a : b);
console.log(minReduce, maxReduce); // 1 9

// Edge case: empty array
const emptyArr = [];
console.log(Math.min(...emptyArr)); // Infinity
console.log(Math.max(...emptyArr)); // -Infinity

-----------------------------------------------------
Real-Life Analogies:
-----------------------------------------------------
- Minimum: lowest score in an exam.
- Maximum: highest score in an exam.
- Finding extremes in any dataset.

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Math.min and Math.max return smallest/largest values.
- Spread operator converts array into individual arguments.
- Reduce iteratively compares elements to find min/max.

-----------------------------------------------------
Example / Usage:

const scores = [45, 78, 92, 33, 67];
const minScore = Math.min(...scores);
const maxScore = Math.max(...scores);
console.log(`Min: ${minScore}, Max: ${maxScore}`); // Min: 33, Max: 92

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What happens with Math.min() or Math.max() on empty array?
A1: Math.min() → Infinity, Math.max() → -Infinity.

Q2: How to find min/max of objects by property?
A2: Use map to extract property and then Math.min/Math.max or reduce.

Q3: Time complexity of finding min/max using reduce?
A3: O(n), each element is checked once.

Q4: Can Math.min/Math.max handle large arrays efficiently?
A4: Spread operator may cause stack issues for very large arrays; use reduce in that case.

Q5: Difference between Math.min/max and sort()[0]/sort()[length-1]?
A5: Sort is O(n log n) and modifies array; min/max is O(n) and non-destructive.
*/
