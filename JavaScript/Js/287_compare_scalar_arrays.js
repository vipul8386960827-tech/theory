/* 287_compare_scalar_arrays.js

=====================================================
Compare Scalar Arrays in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Comparing scalar arrays means checking whether two arrays 
  containing primitive values (numbers, strings, booleans) are equal in content and order."

Key Points to Highlight:
- Scalars: primitive types (number, string, boolean)
- Arrays must have same length and same elements at each index
- Can use loops, every(), or JSON.stringify for comparison
- JSON.stringify approach works only for simple scalar arrays

Examples:

const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
const arr3 = [3, 2, 1];

// Using every() method
function arraysEqual(a, b) {
  return a.length === b.length && a.every((val, index) => val === b[index]);
}

console.log(arraysEqual(arr1, arr2)); // true
console.log(arraysEqual(arr1, arr3)); // false

// Using JSON.stringify
console.log(JSON.stringify(arr1) === JSON.stringify(arr2)); // true
console.log(JSON.stringify(arr1) === JSON.stringify(arr3)); // false

Code Explanation:
- every() iterates and compares each element with corresponding index
- JSON.stringify converts arrays to string for simple equality check
- Works only for primitive arrays, not nested objects

Real-Life Analogy:
- Like comparing two lists of numbers or names to see if they match exactly in order.

Example / Usage:

const scoresA = [10, 20, 30];
const scoresB = [10, 20, 30];

if (arraysEqual(scoresA, scoresB)) {
  console.log("Scores match exactly!");
} else {
  console.log("Scores differ");
}

Follow-Up Interview Questions:
- Q1: Does JSON.stringify work for nested arrays or objects?
  A1: Not reliable; use deep equality check for complex structures.
- Q2: How to compare arrays ignoring order?
  A2: Sort both arrays first, then compare element by element.
- Q3: Can Set be used for comparison?
  A3: Only if ignoring order and duplicates matter.
- Q4: Why not use == or === for arrays?
  A4: Arrays are reference types; == or === compares reference, not content.
- Q5: Time complexity of every() approach?
  A5: O(n), where n is array length.
*/
