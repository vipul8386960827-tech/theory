/* 235_iterator.js

=====================================================
Iterator in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "An iterator is an object that provides a `next()` method 
   which returns the next value in a sequence, enabling sequential access to elements."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Allows traversing elements of collections like arrays, sets, or maps.  
   - Supports `for...of` loops and manual iteration.

2. **Iterator Protocol**  
   - Object must have a `next()` method.  
   - `next()` returns an object with:
     - `value`: current element  
     - `done`: boolean indicating completion

3. **Built-in Iterables**  
   - Arrays, Strings, Maps, Sets, NodeLists implement the iterable protocol.

-----------------------------------------------------
Examples:

// Example 1: Manual iteration over an array
const arr = [10, 20, 30];
const iterator = arr[Symbol.iterator]();

console.log(iterator.next()); // { value: 10, done: false }
console.log(iterator.next()); // { value: 20, done: false }
console.log(iterator.next()); // { value: 30, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// Example 2: Using for...of loop
for (const val of arr) {
  console.log(val); // 10, 20, 30
}

// Example 3: Custom iterator
const customIterable = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0;
    const data = this.data;
    return {
      next() {
        if (index < data.length) {
          return { value: data[index++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};

for (const val of customIterable) {
  console.log(val); // 1, 2, 3
}
  */

// Generator to compute squares of numbers on demand
function* computeSquares(numbers) {
  for (let num of numbers) {
    // yield the square of each number
    yield num * num;
  }
}

const numbers = [2, 3, 5, 7];
const squareGenerator = computeSquares(numbers);

console.log(squareGenerator.next()); // { value: 4, done: false }   → 2*2
console.log(squareGenerator.next()); // { value: 9, done: false }   → 3*3
console.log(squareGenerator.next()); // { value: 25, done: false }  → 5*5
console.log(squareGenerator.next()); // { value: 49, done: false }  → 7*7
console.log(squareGenerator.next()); // { value: undefined, done: true } → iteration finished

 /*

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Iterators provide controlled access to collection elements.  
- `Symbol.iterator` returns the iterator object.  
- `next()` allows both manual and automatic iteration.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Iterator = bookmark in a book, keeping track of where you left off while reading pages sequentially.

-----------------------------------------------------
Example / Usage:

const set = new Set([100, 200, 300]);
const setIterator = set[Symbol.iterator]();
console.log(setIterator.next()); // { value: 100, done: false }
console.log(setIterator.next()); // { value: 200, done: false }

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between iterator and iterable?  
A1: Iterable has `Symbol.iterator` method; iterator has `next()` method returning {value, done}.

Q2: Can we make a custom object iterable?  
A2: Yes, by implementing `Symbol.iterator` method.

Q3: How does `for...of` loop work with iterators?  
A3: It calls the iterator's `next()` internally until `done` is true.

Q4: Are strings iterable?  
A4: Yes, strings implement the iterable protocol.

Q5: Can an iterator be reset?  
A5: Not by default; you must create a new iterator instance.
*/
