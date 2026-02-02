/* 354_symbol_iterator.js

=====================================================
Symbol.iterator in JavaScript
=====================================================

Definition:
- `Symbol.iterator` is a well-known symbol that specifies the default **iterator method** of an object.
- If an object has a method under `Symbol.iterator`, it is considered **iterable**.
- This method must return an **iterator object** that follows the iterator protocol (must have a `next()` method).

-----------------------------------------------------
Built-in Iterables
-----------------------------------------------------
- Arrays
- Strings
- Sets
- Maps
- TypedArrays
- Arguments object
- DOM collections (like NodeList)

Example:
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

-----------------------------------------------------
for..of Uses Symbol.iterator
-----------------------------------------------------
const str = "JS";
for (let char of str) {
  console.log(char); // J, S
}
// Behind the scenes, `for..of` calls str[Symbol.iterator]()

-----------------------------------------------------
Custom Iterable Example
-----------------------------------------------------
const customIterable = {
  start: 1,
  end: 3,
  [Symbol.iterator]() {
    let current = this.start;
    let end = this.end;
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        } else {
          return { done: true };
        }
      },
    };
  },
};

for (let val of customIterable) {
  console.log(val); // 1, 2, 3
}

-----------------------------------------------------
Spread Operator Uses Symbol.iterator
-----------------------------------------------------
const letters = ["a", "b"];
console.log([...letters]); // ["a", "b"]

const customSpread = [...customIterable]; 
console.log(customSpread); // [1, 2, 3]

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Objects (`{}`) are not iterable by default because they don’t implement `Symbol.iterator`.
2. You can make any object iterable by defining `[Symbol.iterator]`.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- `Symbol.iterator` is like a **recipe book**:
  - If an object has it, you know exactly how to iterate through it (like following steps in the recipe).
  - Without it, you don’t know how to consume the object in a sequence.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What is the difference between an iterator and an iterable?  
A1: An iterable has a `Symbol.iterator` method that returns an iterator. An iterator is the object with a `next()` method.

Q2: Why can’t we use `for..of` on plain objects?  
A2: Because plain objects don’t have `Symbol.iterator` implemented.

Q3: How can you make a plain object iterable?  
A3: Define a `[Symbol.iterator]` method that returns an iterator.

Q4: How does the spread operator work internally?  
A4: It uses the object’s `Symbol.iterator` to expand values into a new array/string.
*/
