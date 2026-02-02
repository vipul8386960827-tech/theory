/* 352_iterator_protocol.js

=====================================================
Iterator Protocol in JavaScript
=====================================================

Definition:
- The **Iterator Protocol** defines how an object produces a sequence of values.
- An object is considered an *iterator* when it implements a `next()` method that returns:
  - `value`: the next value in the sequence.
  - `done`: a boolean indicating whether the iteration is complete.

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

const iterator = createIterator([10, 20, 30]);
console.log(iterator.next()); // { value: 10, done: false }
console.log(iterator.next()); // { value: 20, done: false }
console.log(iterator.next()); // { value: 30, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

-----------------------------------------------------
Iterable vs Iterator
-----------------------------------------------------
- **Iterable**: An object that implements the *Iterable Protocol* 
  → it must have a method at `Symbol.iterator` that returns an iterator.
- **Iterator**: The object returned from `Symbol.iterator`, which implements `next()`.

Example with Iterable:
const iterable = [1, 2, 3]; // arrays are iterable
const iteratorObj = iterable[Symbol.iterator]();
console.log(iteratorObj.next()); // { value: 1, done: false }

-----------------------------------------------------
Manual Iteration with Protocol
-----------------------------------------------------
const str = "Hi";
const strIterator = str[Symbol.iterator]();

console.log(strIterator.next()); // { value: 'H', done: false }
console.log(strIterator.next()); // { value: 'i', done: false }
console.log(strIterator.next()); // { value: undefined, done: true }

-----------------------------------------------------
Key Notes:
-----------------------------------------------------
1. The protocol ensures a standard way to consume sequences.
2. `for..of` and spread operator (`...`) use the iterator protocol internally.
3. Plain objects `{}` are NOT iterable by default; you must define `Symbol.iterator` to make them iterable.

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Iterator protocol is like a **universal remote control**:
  - As long as devices (iterables) follow the remote’s standard (protocol), you can control them the same way.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: How does the iterator protocol differ from the iterable protocol?  
A1: Iterator protocol defines `next()`, iterable protocol defines `Symbol.iterator` which must return an iterator.

Q2: Why aren’t plain objects iterable?  
A2: Because they do not implement the iterable protocol (`Symbol.iterator`).

Q3: How do generators relate to the iterator protocol?  
A3: Generators automatically implement the iterator protocol and return iterators with `next()`.

Q4: Can you make your own object iterable?  
A4: Yes, by adding a `Symbol.iterator` method that returns an iterator object.
*/
