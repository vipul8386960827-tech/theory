/* 351_iterators.js

=====================================================
Iterators in JavaScript
=====================================================

Definition:
- An iterator is an object that defines a sequence and potentially a return value upon its completion.
- It adheres to the Iterator Protocol: an object must have a `next()` method that returns an object with:
  - `value`: the current value in the sequence
  - `done`: a boolean (true if sequence is finished)

-----------------------------------------------------
Iterator Protocol Example
-----------------------------------------------------
function createIterator(array) {
  let index = 0;
  return {
    next: function () {
      if (index < array.length) {
        return { value: array[index++], done: false };
      } else {
        return { value: undefined, done: true };
      }
    },
  };
}

const iterator = createIterator([1, 2, 3]);
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

-----------------------------------------------------
Built-in Iterables
-----------------------------------------------------
- In JavaScript, objects like Arrays, Strings, Maps, and Sets are iterable.
- They have a default iterator method at `Symbol.iterator`.

Example:
const arr = [10, 20, 30];
const arrIterator = arr[Symbol.iterator]();

console.log(arrIterator.next()); // { value: 10, done: false }
console.log(arrIterator.next()); // { value: 20, done: false }
console.log(arrIterator.next()); // { value: 30, done: false }
console.log(arrIterator.next()); // { value: undefined, done: true }

-----------------------------------------------------
For..of with Iterators
-----------------------------------------------------
- `for..of` automatically consumes an iterator.
Example:
for (let num of arr) {
  console.log(num); // 10, 20, 30
}

-----------------------------------------------------
Custom Iterable Object
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

for (let value of customIterable) {
  console.log(value); // 1, 2, 3
}

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Iterators are like **bookmarks in a book**:
  - Each `next()` call moves the bookmark forward until the book ends (`done: true`).

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What is the difference between an iterator and an iterable?  
A1: An iterable has a `Symbol.iterator` method that returns an iterator. An iterator has the `next()` method.

Q2: Can you stop iteration early in `for..of`?  
A2: Yes, using `break`, `return`, or `throw`.

Q3: How are generators related to iterators?  
A3: Generators automatically create iterators and simplify iterator logic with `yield`.

Q4: Which built-in objects are not iterable in JS?  
A4: Objects like plain `{}` are not iterable by default unless you define `Symbol.iterator`.
*/
