/* 
6_array_splice.js – Interview-Ready Answer:

"In JavaScript, the splice() method is used to add, remove, or replace elements 
in an array. Unlike slice(), splice() mutates (changes) the original array."

Key Points:

1️⃣ Syntax:
- arr.splice(start, deleteCount, item1, item2, ...)
- start: index where changes begin.
- deleteCount: number of elements to remove.
- item1, item2, ...: elements to add at the start position.

2️⃣ Characteristics:
- Returns an array containing the deleted elements.
- Modifies the original array (in-place).
- Can be used to insert, delete, or replace elements.

3️⃣ Use Cases:
- Removing elements from an array.
- Inserting new elements at a specific index.
- Replacing existing elements with new ones.

4️⃣ Real-life Analogies:
- Global Analogy: Editing a playlist → removing, adding, or replacing songs in the actual list.
- India-specific Analogy: Replacing chapati in your thali with a fresh one → actual thali changes.
- Web Analogy: Updating DOM nodes in-place instead of creating a copy.

5️⃣ Coding Examples:

let numbers = [10, 20, 30, 40, 50];

// 1. Removing elements
let removed = numbers.splice(2, 2); 
console.log(removed);   // [30, 40]
console.log(numbers);   // [10, 20, 50]

// 2. Inserting elements
numbers.splice(1, 0, 15, 17); 
console.log(numbers);   // [10, 15, 17, 20, 50]

// 3. Replacing elements
numbers.splice(2, 1, 99); 
console.log(numbers);   // [10, 15, 99, 20, 50]

// 4. Removing all elements from a starting index
numbers.splice(3); 
console.log(numbers);   // [10, 15, 99]

// Explanation:
// - splice() modifies the original array.
// - Return value is the array of deleted elements.
// - Works as a powerful tool to mutate arrays.

6️⃣ Possible Follow-Up Questions & Answers:

Q1: What is the main difference between slice() and splice()?  
A1: slice() creates a shallow copy without modifying the original array, splice() mutates the original array.

Q2: What does splice() return?  
A2: An array of removed elements.

Q3: Can splice() be used just to insert without removing?  
A3: Yes, by setting deleteCount to 0.

Q4: How do you remove all elements from an array using splice()?  
A4: arr.splice(0, arr.length) removes everything.

Q5: Does splice() create a shallow copy or deep copy?  
A5: Neither — splice() mutates the array; removed items are shallow-copied into the return array.
*/
