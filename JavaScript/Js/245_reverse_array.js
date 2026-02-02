/* 245_reverse_array.js

=====================================================
Reverse an Array in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Reversing an array means creating a new array or modifying the original 
  so that the order of elements is flipped, with the last element becoming 
  the first, and so on."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
- Can reverse in-place using Array.prototype.reverse().
- Can create a reversed copy using spread operator and reverse().
- Useful in algorithms that require backward iteration or reversing data.

-----------------------------------------------------
Examples:

// In-place reverse
const arr1 = [1, 2, 3, 4];
arr1.reverse();
console.log(arr1); // [4, 3, 2, 1]

// Reverse without modifying original
const arr2 = [5, 6, 7, 8];
const reversed = [...arr2].reverse();
console.log(reversed); // [8, 7, 6, 5]
console.log(arr2);     // [5, 6, 7, 8] (original intact)

// Reverse using loop
const arr3 = [9, 10, 11];
const reversedLoop = [];
for(let i = arr3.length - 1; i >= 0; i--) {
  reversedLoop.push(arr3[i]);
}
console.log(reversedLoop); // [11, 10, 9]

-----------------------------------------------------
Real-Life Analogies:
-----------------------------------------------------
- Think of a queue where the last person comes to the front.
- Reading a book from last page to first page.

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Array.reverse() modifies the original array.
- Using spread operator creates a copy before reversing.
- Loop method manually builds a new reversed array.

-----------------------------------------------------
Example / Usage:

const nums = [1, 2, 3, 4, 5];
const revNums = [...nums].reverse();
console.log(revNums); // [5, 4, 3, 2, 1]
console.log(nums);    // [1, 2, 3, 4, 5] (unchanged)

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Does Array.reverse() create a new array?
A1: No, it reverses the array in-place.

Q2: How to reverse without modifying original array?
A2: Use spread operator or slice() before reverse().

Q3: Time complexity of reversing an array?
A3: O(n), as each element is processed once.

Q4: Can Array.reverse() be chained with other array methods?
A4: Yes, e.g., arr.reverse().map(...)

Q5: How to reverse a string using array methods?
A5: Split into array → reverse → join back to string.
*/
