/* 358_weakset_object.js

=====================================================
WeakSet Object in JavaScript
=====================================================

Definition (What I should say in the interview):
- "WeakSet is a special kind of Set in JavaScript that can only store **objects** 
   as its values. The references to these objects are held weakly, which means 
   if an object is no longer referenced elsewhere, it can be garbage collected. 
   WeakSets are not iterable and do not have a size property, making them useful 
   for storing unique objects temporarily or tracking objects without preventing 
   memory cleanup."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Values must be objects; primitive values are not allowed.
2. Holds **weak references** – allows garbage collection if objects are no longer referenced.
3. Not iterable – cannot use `for..of`, `forEach`, or spread operator.
4. No `size` property – cannot directly know how many objects exist.
5. Provides methods: `add`, `has`, `delete`.
6. Useful for tracking objects or storing temporary sets of objects safely.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const ws = new WeakSet();

let obj1 = { name: "Kaizer" };
let obj2 = { name: "Alex" };

// Adding objects
ws.add(obj1);
ws.add(obj2);
ws.add(obj2); // Duplicate ignored

// Checking existence
console.log(ws.has(obj1)); // true
console.log(ws.has({ name: "Kaizer" })); // false (different reference)

// Deleting
ws.delete(obj2);
console.log(ws.has(obj2)); // false

// Garbage collection example
obj1 = null; // obj1 is now eligible for garbage collection
// WeakSet automatically removes it

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Tracking visited DOM elements in a web page.
- Temporarily marking objects in algorithms without preventing GC.
- Storing private data associated with objects without leaking memory.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. WeakSet values must always be objects; primitive types will throw an error.
2. Not iterable – you cannot loop over WeakSet entries.
3. Helps prevent memory leaks by allowing automatic removal of unreferenced objects.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of WeakSet like a **guest list tied to objects**:
  - Only objects can be on the list.
  - When a guest (object) leaves and no one else is referencing it, 
    it is automatically removed from the list.
  - You cannot see the entire list at once (no iteration), but membership can be checked.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can WeakSet store primitive values?  
A1: No, only objects are allowed.

Q2: Can you iterate over a WeakSet?  
A2: No, WeakSet is not iterable by design to allow garbage collection.

Q3: Does WeakSet have a size property?  
A3: No, there is no `size` property because objects may disappear automatically.

Q4: When would you use WeakSet over Set?  
A4: Use WeakSet when you want to store unique objects temporarily without 
    preventing garbage collection, such as tracking objects in memory-sensitive applications.
*/
