/* 
5_array_slice.js – Interview-Ready Answer:

"In JavaScript, the slice() method is used to create a shallow copy of a portion of an array 
into a new array without modifying the original array."

Key Points:

1️⃣ Syntax:
- arr.slice(start, end)
- start: index where extraction begins (inclusive).
- end: index where extraction ends (exclusive).
- If end is omitted → extracts till the end of the array.
- If start/end are negative → counts from the end.

2️⃣ Characteristics:
- Returns a new array (does not mutate the original array).
- Works with arrays and array-like objects (via call/apply).
- Shallow copy: nested objects/arrays are referenced, not cloned.

3️⃣ Common Use Cases:
- Copying an entire array.
- Extracting a subarray.
- Converting array-like objects (like arguments or NodeList) into arrays.

4️⃣ Real-life Analogies:
- Global Analogy: Cutting out pages from a book to make a photocopy → original book remains intact.
- India-specific Analogy: Taking a portion of biryani from a big pot into your plate without disturbing the main pot.
- Web Analogy: Extracting a few DOM nodes into a list while leaving the original NodeList unchanged.

5️⃣ Coding Examples:

let numbers = [10, 20, 30, 40, 50];

// 1. Basic usage
let part = numbers.slice(1, 3);
console.log(part);        // [20, 30]
console.log(numbers);     // [10, 20, 30, 40, 50] (unchanged)

// 2. Omitting end
console.log(numbers.slice(2)); 
// [30, 40, 50]

// 3. Negative indexes
console.log(numbers.slice(-3, -1)); 
// [30, 40]

// 4. Copy entire array
let copy = numbers.slice();
console.log(copy); 
// [10, 20, 30, 40, 50]

// 5. Converting array-like object
function demo() {
    let args = Array.prototype.slice.call(arguments);
    return args;
}
console.log(demo(1, 2, 3, 4)); 
// [1, 2, 3, 4]

// Explanation:
// - slice() never mutates the original array.
// - Works great for copying arrays and handling subsets.
// - Negative indices count from the end.

6️⃣ Possible Follow-Up Questions & Answers:

Q1: What is the difference between slice() and splice()?  
A1: slice() creates a new array without changing the original, while splice() mutates the array by adding/removing elements.

Q2: Does slice() perform deep copy or shallow copy?  
A2: It performs a shallow copy; nested objects are still references.

Q3: Can slice() be used on strings?  
A3: No, slice() is an Array method, but String has its own slice() method with similar behavior.

Q4: How can you clone an array besides slice()?  
A4: Using spread operator [...arr] or Array.from(arr).

Q5: What happens if start > end?  
A5: slice() returns an empty array.
*/
