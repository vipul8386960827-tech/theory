/* 127_loop_object.js

=====================================================
Looping Through Objects in JavaScript
=====================================================

Definition:
Objects in JavaScript are collections of key-value pairs.  
Unlike arrays, objects are not inherently iterable, but there are 
several ways to loop through their keys and values.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. **for...in loop**
   - Iterates over all enumerable properties (including inherited ones).
   - Often combined with `hasOwnProperty()` to avoid inherited keys.

   Example:
   for (let key in obj) {
     if (obj.hasOwnProperty(key)) {
       console.log(key, obj[key]);
     }
   }

2. **Object.keys()**
   - Returns an array of an object’s own keys.
   - Commonly used with `forEach`, `map`, or `for...of`.

   Example:
   Object.keys(obj).forEach(key => console.log(key, obj[key]));

3. **Object.values()**
   - Returns an array of values only.
   - Example:
     Object.values(obj).forEach(value => console.log(value));

4. **Object.entries()**
   - Returns an array of [key, value] pairs.
   - Useful for destructuring in loops.

   Example:
   for (let [key, value] of Object.entries(obj)) {
     console.log(key, value);
   }

5. **for...of (with Object methods)**
   - Works on arrays returned by `Object.keys/values/entries`.

-----------------------------------------------------
Examples:
-----------------------------------------------------
const user = { name: "Alice", age: 25, country: "India" };

// Method 1: for...in
for (let key in user) {
  if (user.hasOwnProperty(key)) {
    console.log(key, user[key]);
  }
}

// Method 2: Object.keys
Object.keys(user).forEach(key => {
  console.log(key, user[key]);
});

// Method 3: Object.values
Object.values(user).forEach(value => {
  console.log(value);
});

// Method 4: Object.entries
for (let [key, value] of Object.entries(user)) {
  console.log(key, value);
}

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Looping through an object is like checking rooms in a house:
  - `for...in` → check every room, even borrowed ones.
  - `Object.keys()` → get only your house keys.
  - `Object.entries()` → get both the room name and what’s inside.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What’s the difference between `for...in` and `for...of`?  
A1: `for...in` is for object keys, `for...of` is for iterable values (like arrays).

Q2: Why should you use `hasOwnProperty()` with `for...in`?  
A2: To avoid looping over properties inherited from the prototype chain.

Q3: Which method is most modern and preferred?  
A3: `Object.entries()` with `for...of` or array methods (clean and readable).

Q4: Can objects be directly iterated with `for...of`?  
A4: No, objects are not iterable by default; you must use `Object.keys/values/entries`.
*/
