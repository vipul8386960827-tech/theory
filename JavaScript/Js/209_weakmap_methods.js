/* 209_weakmap_methods.js

=====================================================
WeakMap Methods in JavaScript
=====================================================

Definition (Interview-friendly):
- "WeakMap provides a limited set of methods to manage key-value pairs 
  where keys are objects: set(), get(), has(), and delete(). 
  It is not iterable and keys are weakly referenced."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. set() Method
   - Adds or updates a key-value pair
   - Example:
     const wm = new WeakMap();
     const key = { id: 1 };
     wm.set(key, "Alice");
     console.log(wm.get(key)); // "Alice"

2. get() Method
   - Retrieves the value associated with a key
   - Example:
     console.log(wm.get(key)); // "Alice"
     console.log(wm.get({}));  // undefined (different object)

3. has() Method
   - Checks if a key exists
   - Example:
     console.log(wm.has(key)); // true
     console.log(wm.has({}));  // false

4. delete() Method
   - Removes a key-value pair
   - Example:
     wm.delete(key);
     console.log(wm.has(key)); // false

5. Not Iterable
   - WeakMaps cannot be looped or checked for size

6. Use Case
   - Store private data for objects without preventing garbage collection
   - Example:
     const privateData = new WeakMap();
     class Person {
         constructor(name) { privateData.set(this, { name }); }
         getName() { return privateData.get(this).name; }
     }
     const p = new Person("Alice");
     console.log(p.getName()); // "Alice"

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- WeakMap is like **a secure locker tied to objects**:
  - When the object is gone, the locker and its data disappear automatically.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can WeakMap keys be primitives?
A1: No, only objects.

Q2: Can you iterate over a WeakMap?
A2: No, it is not iterable.

Q3: Difference between Map and WeakMap methods?
A3: Map has set(), get(), delete(), clear(), and is iterable; WeakMap lacks clear() and is not iterable.

Q4: Does WeakMap prevent garbage collection?
A4: No, objects are weakly referenced and can be garbage collected.

Q5: Common use of WeakMap?
A5: Storing private metadata or temporary information tied to objects.
*/
