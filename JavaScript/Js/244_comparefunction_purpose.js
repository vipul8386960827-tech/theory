/* 244_comparefunction_purpose.js

=====================================================
Compare Function in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "A compare function in JavaScript is a callback function provided to the 
  `Array.prototype.sort()` method to determine the order of elements."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Controls how array elements are sorted.  
   - Returns a number to indicate order:
     - Negative → `a` comes before `b`  
     - Zero → `a` and `b` are equal  
     - Positive → `a` comes after `b`

2. **Why Needed**  
   - By default, `sort()` converts elements to strings and sorts lexicographically.  
   - Numeric or custom sorting requires a compare function.

-----------------------------------------------------
Examples:

// Example 1: Ascending numeric sort
const numbers = [40, 1, 5, 100];
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 5, 40, 100]

// Example 2: Descending numeric sort
numbers.sort((a, b) => b - a);
console.log(numbers); // [100, 40, 5, 1]

// Example 3: Sorting objects by property
const people = [{name: "Alice", age: 25}, {name: "Bob", age: 20}];
people.sort((a, b) => a.age - b.age);
console.log(people); // [{name: "Bob", age: 20}, {name: "Alice", age: 25}]

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- The compare function receives two elements (`a` and `b`).  
- Returns negative, zero, or positive to define sorting order.  
- Allows numeric, string, or custom complex sorting.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Like a referee comparing two players: decides who ranks higher, equal, or lower.

-----------------------------------------------------
Example / Usage:

const scores = [50, 10, 100, 5];
scores.sort((a, b) => a - b); // ascending
console.log(scores); // [5, 10, 50, 100]

const items = [{price: 200}, {price: 50}, {price: 100}];
items.sort((a, b) => a.price - b.price);
console.log(items); // [{price: 50}, {price: 100}, {price: 200}]

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What happens if compare function returns 0?  
A1: Elements are considered equal; their relative order is maintained (stable sort).

Q2: Can compare function handle strings?  
A2: Yes, e.g., `(a, b) => a.localeCompare(b)`.

Q3: Is compare function mandatory for sort()?  
A3: No, but default sort is lexicographic.

Q4: Can you sort descending without reversing?  
A4: Yes, adjust compare function to `b - a` for numbers.

Q5: How to sort objects by multiple criteria?  
A5: Use nested conditions inside the compare function.
*/
