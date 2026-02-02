/* 353_for_of_loop.js

=====================================================
for..of Loop in JavaScript
=====================================================

Definition:
- The `for..of` loop is used to iterate over **iterable objects** (like arrays, strings, maps, sets, etc.).
- It uses the **iterator protocol** behind the scenes.
- It retrieves **values** directly, unlike `for..in` which iterates over keys/properties.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const numbers = [10, 20, 30];
for (let num of numbers) {
  console.log(num); // 10, 20, 30
}

-----------------------------------------------------
Iterating Over Strings
-----------------------------------------------------
const str = "Hi!";
for (let char of str) {
  console.log(char); // H, i, !
}

-----------------------------------------------------
Iterating Over Sets
-----------------------------------------------------
const set = new Set([1, 2, 3]);
for (let val of set) {
  console.log(val); // 1, 2, 3
}

-----------------------------------------------------
Iterating Over Maps
-----------------------------------------------------
const map = new Map([
  ["name", "Alice"],
  ["age", 25],
]);

for (let [key, value] of map) {
  console.log(key, value); // name Alice | age 25
}

-----------------------------------------------------
Difference: for..in vs for..of
-----------------------------------------------------
- **for..in**: Iterates over keys (indices in arrays, property names in objects).
- **for..of**: Iterates over values (direct elements in arrays, strings, sets, maps).

Example:
const arr = ["a", "b", "c"];

for (let i in arr) {
  console.log(i); // 0, 1, 2 (indexes)
}

for (let val of arr) {
  console.log(val); // a, b, c (values)
}

-----------------------------------------------------
Breaking Out of for..of
-----------------------------------------------------
- Use `break` or `continue` as usual.
for (let num of [1, 2, 3, 4]) {
  if (num === 3) break;
  console.log(num); // 1, 2
}

-----------------------------------------------------
Spread Operator with Iterables
-----------------------------------------------------
- Spread operator uses the same iterator protocol as `for..of`.
const arr2 = [..."abc"]; 
console.log(arr2); // ["a", "b", "c"]

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Think of `for..of` as **reading pages directly** in a book (values).
- `for..in` is like **reading the page numbers** (keys/indices).

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What types of objects are iterable in JS?  
A1: Arrays, strings, maps, sets, typed arrays, arguments object, and custom objects with `Symbol.iterator`.

Q2: Why doesn’t `for..of` work on plain objects?  
A2: Because plain objects are not iterable by default. They lack `Symbol.iterator`.

Q3: How would you iterate over a plain object’s values?  
A3: Use `Object.values(obj)` with `for..of`, or `Object.keys(obj)` / `Object.entries(obj)`.

Q4: Can you use `await` inside a `for..of` loop?  
A4: Yes, with `for await..of` for async iterables.
*/
c 