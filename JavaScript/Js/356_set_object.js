/* 356_set_object.js

=====================================================
Set Object in JavaScript
=====================================================

Definition (What I should say in the interview):
- "The Set object in JavaScript is a built-in collection that stores **unique values** 
   of any type, whether primitive or objects. It automatically removes duplicates, 
   so each value can appear only once. Sets are useful when you need to maintain 
   a list of distinct items and want efficient operations for adding, checking, 
   and deleting elements. They also preserve insertion order, which means 
   the order of elements is remembered during iteration."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Stores **unique values** only – duplicates are ignored.
2. Values can be of any type: numbers, strings, objects, or functions.
3. Maintains insertion order of elements.
4. Provides built-in methods like `add`, `delete`, `has`, `clear`.
5. Implements `Symbol.iterator` – iterable with `for..of` or spread operator.
6. Efficient for checking existence compared to arrays (`has` vs `includes`).

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const mySet = new Set();

// Adding values
mySet.add(1);
mySet.add(2);
mySet.add(2); // Duplicate ignored
mySet.add("Hello");
mySet.add({ id: 101 });

// Checking existence
console.log(mySet.has(2)); // true
console.log(mySet.has(3)); // false

// Size
console.log(mySet.size); // 4

// Deleting
mySet.delete(1);
console.log(mySet.has(1)); // false

// Clearing
// mySet.clear(); // Empties the set

-----------------------------------------------------
Iteration
-----------------------------------------------------
const setExample = new Set(["a", "b", "c"]);

// for..of
for (let val of setExample) {
  console.log(val);
}

// forEach
setExample.forEach(val => console.log(val));

// Spread
console.log([...setExample]); // ["a", "b", "c"]

-----------------------------------------------------
Difference Between Set and Array
-----------------------------------------------------
1. Set stores **unique values**, Array can have duplicates.
2. Set has built-in efficient methods `has`, `add`, `delete` which are faster 
   than Array's `includes`, `push`, `splice` for large data.
3. Arrays have index-based access; Sets are not index-based.
4. Sets are iterable in insertion order, similar to Arrays.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of a Set like a **club membership list**:
  - Each member is unique; duplicates are not allowed.
  - You can quickly check if someone is a member, add new members, 
    or remove them.
  - The order you add members is remembered.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can Set store objects as values?  
A1: Yes, Sets can store objects, functions, or primitive types, 
    but uniqueness is by reference for objects, not content.

Q2: How can you remove duplicates from an array using Set?  
A2: Use `const uniqueArray = [...new Set(arrayWithDuplicates)]`.

Q3: Does Set have a size property?  
A3: Yes, `set.size` returns the number of unique elements in the Set.

Q4: How is iteration different between Set and Map?  
A4: Both are iterable with `for..of`, but Map stores key-value pairs, 
    whereas Set stores only values.
*/
