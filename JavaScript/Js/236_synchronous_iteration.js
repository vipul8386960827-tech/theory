/* 236_synchronous_iteration.js

=====================================================
Synchronous Iteration – Interview-Ready Answer
=====================================================

Definition:
- "Synchronous iteration is the process of accessing elements of a collection 
  one by one in a blocking manner, where each step completes before the next begins."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Blocking Nature**  
   - Each iteration step waits for the previous one to finish.  
   - No asynchronous operations involved.

2. **Iterables Supported**  
   - Arrays, Strings, Maps, Sets, NodeLists, and any object implementing the iterator protocol.

3. **Syntax Examples**  
   - `for...of`, `forEach()`, `for` loop, and manual iterator `next()` calls.

-----------------------------------------------------
Examples:

// Example 1: for loop
const arr = [1, 2, 3];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // 1, 2, 3
}

// Example 2: for...of loop
for (const val of arr) {
  console.log(val); // 1, 2, 3
}

// Example 3: Array.forEach
arr.forEach(val => console.log(val)); // 1, 2, 3

// Example 4: Manual iterator
const iterator = arr[Symbol.iterator]();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Each element is processed sequentially.  
- Synchronous iteration is simple but cannot handle asynchronous operations natively.  
- Guarantees order of execution.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Imagine a single cashier processing one customer at a time. Each customer waits until the previous is done.

-----------------------------------------------------
Example / Usage:

const set = new Set([10, 20, 30]);
for (const val of set) {
  console.log(val); // 10, 20, 30
}

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between synchronous and asynchronous iteration?  
A1: Synchronous waits for each operation to complete; asynchronous allows non-blocking operations.

Q2: Can `forEach` handle async functions?  
A2: No, `forEach` does not wait for Promises; use `for...of` with `await`.

Q3: Are iterators synchronous by default?  
A3: Yes, all standard iterators are synchronous unless using async iterators.

Q4: What is the order of iteration?  
A4: Always follows the sequence of the iterable (index or insertion order).

Q5: How to process asynchronous data sequentially?  
A5: Use `for...of` with `await` or `for await...of` for async iterables.
*/
