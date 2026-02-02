/* 286_array_includes.js

=====================================================
Array.includes() in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "The includes() method checks if an array contains a certain value 
  and returns true or false."

Key Points to Highlight:
- Returns boolean: true if element exists, false otherwise.
- Syntax: array.includes(valueToFind, fromIndex)
- fromIndex is optional (default 0)
- Works with NaN (unlike indexOf)

Examples:

const arr = [1, 2, 3, NaN];

console.log(arr.includes(2));      // true
console.log(arr.includes(4));      // false
console.log(arr.includes(NaN));    // true
console.log(arr.includes(3, 3));   // false (start from index 3)

Code Explanation:
- Checks for element using strict equality (===), except for NaN.
- Returns true immediately if element found, else false.

Real-Life Analogy:
- Like checking if a book exists on a shelf; returns yes or no.

Example / Usage:

const fruits = ['apple', 'banana', 'mango'];

if(fruits.includes('banana')) {
  console.log('Banana is available');
} else {
  console.log('Banana not found');
}
// Output: Banana is available

Follow-Up Interview Questions:
- Q1: Difference between includes() and indexOf()?
  A1: includes returns boolean; indexOf returns index or -1; includes works with NaN.
- Q2: Can includes search from a specific index?
  A2: Yes, using the fromIndex parameter.
- Q3: Does includes mutate the array?
  A3: No, it does not modify the array.
- Q4: Is includes case-sensitive for strings?
  A4: Yes, 'Apple' !== 'apple'.
- Q5: Can includes check objects inside arrays?
  A5: Only checks reference equality for objects, not deep equality.
*/
