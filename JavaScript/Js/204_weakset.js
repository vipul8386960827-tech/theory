/* 204_weakset.js

=====================================================
WeakSet in JavaScript
=====================================================

Definition (Interview-friendly):
- "A WeakSet is a collection of objects only, where each object can appear 
  only once. WeakSet holds weak references, meaning objects can be garbage 
  collected if there are no other references."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Creating a WeakSet
   - Example:
     const ws = new WeakSet();
     const obj1 = { name: "Alice" };
     ws.add(obj1);
     console.log(ws.has(obj1)); // true

2. Only Objects Allowed
   - Example:
     // ws.add(10); // ❌ TypeError: Invalid value
     ws.add({}); // ✅ allowed

3. No Iteration
   - WeakSets are not iterable; you cannot loop through them.

4. Automatic Garbage Collection
   - When an object in WeakSet has no other references, it is removed automatically.

5. Use Cases
   - Tracking objects without preventing garbage collection.
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
- WeakSet is like a **guest list with invisible tracking**:
  - Guests (objects) are tracked temporarily, and if they leave (no other reference), they are automatically removed.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can WeakSet store primitive values?
A1: No, only objects.

Q2: Can we get the size of a WeakSet?
A2: No, WeakSet does not expose size property or allow iteration.

Q3: Difference between Set and WeakSet?
A3: Set stores any values and is iterable; WeakSet stores only objects and is not iterable.

Q4: Why use WeakSet over Set?
A4: To avoid preventing garbage collection for objects being tracked temporarily.

Q5: Can you clear a WeakSet manually?
A5: No, individual removal is possible with delete(), but no clear() method exists.
*/
