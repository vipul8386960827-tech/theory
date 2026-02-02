/* 
7_slice_vs_splice.js – Interview-Ready Answer:

"In JavaScript, slice() and splice() are two array methods that sound similar 
but behave very differently in terms of immutability and array modification."

Key Points:

1️⃣ slice():
- Syntax: arr.slice(start, end)
- Creates a shallow copy of a portion of the array.
- Does NOT mutate the original array.
- End index is exclusive.
- Useful for copying or extracting subarrays.

2️⃣ splice():
- Syntax: arr.splice(start, deleteCount, item1, item2, …)
- Adds, removes, or replaces elements in an array.
- Mutates (changes) the original array.
- Returns an array of removed elements.

3️⃣ Main Differences:
- Mutability → slice: non-mutating | splice: mutating.
- Return Value → slice: new array copy | splice: removed elements.
- Use Cases → slice: extract/copy | splice: insert/delete/replace.

4️⃣ Real-life Analogies:
- Global Analogy: 
  - slice = photocopying a few pages from a book (original book intact).
  - splice = tearing out pages from the actual book and replacing them.
- India-specific Analogy: 
  - slice = serving yourself a portion of biryani from the pot.
  - splice = removing some items from the pot and adding new ones → pot changes.
- Web Analogy: 
  - slice = selecting a subset of DOM nodes to read.
  - splice = directly modifying/removing DOM nodes.

5️⃣ Coding Examples:

let arr = [10, 20, 30, 40, 50];

// Using slice()
let sliced = arr.slice(1, 4);
console.log(sliced);   // [20, 30, 40]
console.log(arr);      // [10, 20, 30, 40, 50] (unchanged)

// Using splice()
let spliced = arr.splice(1, 3, 99, 100);
console.log(spliced);  // [20, 30, 40] (removed elements)
console.log(arr);      // [10, 99, 100, 50] (mutated)

6️⃣ Explanation:
- slice(): Non-mutating → creates a copy of selected portion.
- splice(): Mutating → edits array in-place.

7️⃣ Possible Follow-Up Questions & Answers:

Q1: Which method is safer to use when immutability is required?  
A1: slice(), since it does not change the original array.

Q2: What does splice() return if deleteCount is 0?  
A2: An empty array, but it can still insert new elements at the start index.

Q3: Can slice() handle negative indices?  
A3: Yes, negative indices count from the end of the array.

Q4: Can splice() be used just for insertion?  
A4: Yes, by setting deleteCount = 0.

Q5: Which one is commonly used in functional programming practices?  
A5: slice(), because functional programming emphasizes immutability.
*/
