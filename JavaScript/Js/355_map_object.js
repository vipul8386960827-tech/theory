/* 355_map_object.js

=====================================================
Map Object in JavaScript
=====================================================

Definition (What I should say in the interview):
- "The Map object in JavaScript is a built-in data structure that stores key-value 
   pairs, but unlike plain objects, a Map allows keys of any type – including objects, 
   functions, or even NaN. Maps also maintain insertion order, which means the order 
   in which you add elements is preserved when you iterate over them. 
   Maps are generally preferred over plain objects when you need a reliable key-value 
   store with guaranteed iteration order and better performance for frequent additions 
   and deletions."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Keys can be of any type (primitive values, objects, functions).
2. Maintains insertion order of elements.
3. Has a `size` property to directly get the number of elements.
4. Provides built-in methods like `set`, `get`, `has`, `delete`, and `clear`.
5. Iterates using `for..of`, `forEach`, or spread because it implements `Symbol.iterator`.
6. Better performance compared to plain objects for frequent add/remove operations.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const map = new Map();

// Adding values
map.set("name", "Kaizer");
map.set(1, "Number key");
map.set({ id: 101 }, "Object key");

// Retrieving values
console.log(map.get("name")); // Kaizer
console.log(map.get(1)); // Number key

// Checking existence
console.log(map.has("name")); // true

// Size
console.log(map.size); // 3

// Deleting
map.delete(1);
console.log(map.has(1)); // false

-----------------------------------------------------
Iteration
-----------------------------------------------------
const myMap = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

// for..of iteration
for (let [key, value] of myMap) {
  console.log(key, value);
}

// forEach iteration
myMap.forEach((value, key) => {
  console.log(key, value);
});

// Spread
console.log([...myMap]); // [["a", 1], ["b", 2], ["c", 3]]

-----------------------------------------------------
Difference Between Map and Object
-----------------------------------------------------
1. Keys in an Object are always strings or symbols, 
   but in a Map, keys can be any data type.
2. Map maintains insertion order, Object does not guarantee it.
3. Map has a `size` property, Object requires manual calculation.
4. Map is optimized for frequent additions and deletions, 
   while Object can become slower for such use cases.
5. Objects are best suited for structured data (like JSON), 
   while Maps are better for collections with dynamic keys.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of a Map like a **locker system**:
  - Each locker (key) can have any type of lock – numbers, strings, objects.
  - Items (values) are stored inside.
  - The lockers remain in the order they were added.
  - You can quickly check if a locker exists and remove it if needed.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why would you use a Map instead of an Object?  
A1: Maps allow keys of any type, maintain insertion order, and provide better 
    performance for frequent key-value operations.

Q2: How is iteration different in Map and Object?  
A2: Map is directly iterable with `for..of` because it implements Symbol.iterator, 
    whereas Object requires methods like Object.keys() or Object.entries().

Q3: Can you convert a Map to an Object and vice versa?  
A3: Yes, use Object.fromEntries(myMap) to convert Map → Object, 
    and new Map(Object.entries(obj)) to convert Object → Map.

Q4: Is Map a subclass of Object?  
A4: No, Map is its own data structure, though both store key-value pairs. 
    Maps have their own prototype methods and are not derived from Object.
*/
