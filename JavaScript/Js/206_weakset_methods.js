/* 206_weakset_methods.js

=====================================================
WeakSet Methods in JavaScript
=====================================================

Definition (Interview-friendly):
- "WeakSet is a collection of unique objects with limited methods: 
  add(), delete(), and has(). It is not iterable and holds weak references 
  for automatic garbage collection."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. add() Method
   - Adds an object to the WeakSet.
   - Example:
     const ws = new WeakSet();
     const obj = { name: "Alice" };
     ws.add(obj);
     console.log(ws.has(obj)); // true

2. has() Method
   - Checks if an object exists in the WeakSet.
   - Example:
     console.log(ws.has(obj)); // true
     console.log(ws.has({}));  // false (different object)

3. delete() Method
   - Removes an object from the WeakSet.
   - Example:
     ws.delete(obj);
     console.log(ws.has(obj)); // false

4. Not Iterable
   - Cannot use for...of, forEach, or get size property.
   - Example:
     // for (let o of ws) {} // ❌ TypeError

5. Use Case
   - Track objects without preventing garbage collection.
   - Example:
     const visited = new WeakSet();
     function process(obj) {
         if (!visited.has(obj)) {
             visited.add(obj);
             // process object
         }
     }

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- WeakSet is like **a secret guest list**:
  - You can check if someone is on it or remove them, but you can't see everyone at once.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can WeakSet store primitive values?
A1: No, only objects.

Q2: Can you iterate over a WeakSet?
A2: No, WeakSet is not iterable.

Q3: Is there a size property for WeakSet?
A3: No, size is not available.

Q4: Can WeakSet prevent garbage collection?
A4: No, objects in WeakSet are weakly referenced and can be GC’d if no other references exist.

Q5: Difference between WeakSet and Set methods?
A5: Set has add(), delete(), has(), clear(), and is iterable; WeakSet lacks clear() and is not iterable.
*/
