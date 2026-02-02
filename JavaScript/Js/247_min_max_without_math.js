/* 247_min_max_without_math.js

=====================================================
Finding Minimum and Maximum Without Math.min/Math.max
=====================================================

Definition:
- "You can find the smallest and largest values in an array manually 
  using loops or array methods instead of relying on Math.min/Math.max."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
- Initialize min with Infinity and max with -Infinity (or first element).
- Iterate through the array comparing each element.
- Update min/max accordingly.
- Works for large arrays without spread operator stack issues.
- Time complexity: O(n).

-----------------------------------------------------
Examples:

// Using a simple for loop
const arr = [5, 2, 9, 1, 7];
let minVal = arr[0];
let maxVal = arr[0];

for (let i = 1; i < arr.length; i++) {
  if (arr[i] < minVal) minVal = arr[i];
  if (arr[i] > maxVal) maxVal = arr[i];
}
console.log(minVal, maxVal); // 1 9

// Using for...of loop
minVal = Infinity;
maxVal = -Infinity;

for (const num of arr) {
  if (num < minVal) minVal = num;
  if (num > maxVal) maxVal = num;
}
console.log(minVal, maxVal); // 1 9

// Using reduce
const minReduce = arr.reduce((a, b) => (a < b ? a : b));
const maxReduce = arr.reduce((a, b) => (a > b ? a : b));
console.log(minReduce, maxReduce); // 1 9

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Imagine checking exam papers: you keep track of the highest score 
  and lowest score as you go through each paper.

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Loop through array elements one by one.
- Compare each element to current min/max.
- Replace min or max when a smaller or larger element is found.
- After the loop, min and max hold final values.

-----------------------------------------------------
Example / Usage:

const numbers = [12, 45, 7, 89, 34];
let min = numbers[0];
let max = numbers[0];

for (let i = 1; i < numbers.length; i++) {
  if (numbers[i] < min) min = numbers[i];
  if (numbers[i] > max) max = numbers[i];
}
console.log(`Min: ${min}, Max: ${max}`); 
// Min: 7, Max: 89

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What is the time complexity of this approach?
A1: O(n), as every element is checked once.

Q2: How does this handle an empty array?
A2: Needs explicit check, otherwise accessing arr[0] may cause errors.

Q3: Why might this be better than using Math.min(...arr)?
A3: Avoids stack overflow with very large arrays.

Q4: Can reduce be used instead of loops?
A4: Yes, reduce can accumulate min or max in O(n).

Q5: How would you extend this to objects?
A5: Iterate over objects and compare based on a property, e.g., age in a list of users.
*/
