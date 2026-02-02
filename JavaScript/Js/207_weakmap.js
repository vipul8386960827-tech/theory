/* 207_weakmap.js

=====================================================
WeakMap in JavaScript
=====================================================

Definition (Interview-friendly):
- "A WeakMap is a collection of key-value pairs where keys are objects only. 
  Keys are weakly referenced, allowing garbage collection when no other references exist. 
  Values can be any type."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Creating a WeakMap
   - Example:
     const wm = new WeakMap();
     const key = { id: 1 };
     wm.set(key, "Alice");
     console.log(wm.get(key)); // "Alice"

2. Only Objects as Keys
   - Example:
     // wm.set(10, "Number"); // ❌ TypeError
     wm.set({}, "Object");      // ✅ allowed

3. has() Method
   - Checks if a key exists
     console.log(wm.has(key)); // true

4. delete() Method
   - Removes a key-value pair
     wm.delete(key);
     console.log(wm.has(key)); // false

5. Not Iterable
   - WeakMaps cannot be iterated or have size property.

6. Use Case
   - Storing private data for objects without preventing garbage collection.
   - Example:
     const privateData = new WeakMap();
     class Person {
         constructor(name) {
             privateData.set(this, { name });
         }
         getName() {
             return privateData.get(this).name;
         }
     }
     const p = new Person("Alice");
     console.log(p.getName()); // "Alice"

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- WeakMap is like **a private storage for objects**:
  - The object is the key, and its private data is stored safely. 
  - When the object is gone, the data disappears automatically.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can WeakMap keys be primitives?
A1: No, only objects.

Q2: Can you iterate over a WeakMap?
A2: No, WeakMap is not iterable.

Q3: Difference between Map and WeakMap?
A3: Map keys can be any type and is iterable; WeakMap keys are objects only and not iterable.

Q4: Can WeakMap prevent garbage collection?
A4: No, weak references allow GC when no other references exist.

Q5: Common use of WeakMap?
A5: To store private or metadata associated with objects.
*/
