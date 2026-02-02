/* 357_weakmap_object.js

=====================================================
WeakMap Object in JavaScript
=====================================================

Definition (What I should say in the interview):
- "WeakMap is a special kind of Map in JavaScript where the **keys must be objects** 
   and the references to these keys are held weakly. This means if there are no 
   other references to a key object, it can be garbage collected, which helps 
   prevent memory leaks. WeakMaps are not iterable and do not have a `size` property, 
   making them ideal for storing private data or metadata associated with objects 
   without affecting garbage collection."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Keys must be objects; primitive values are not allowed.
2. Holds **weak references** to keys – allows garbage collection if no other references exist.
3. Not iterable – cannot use `for..of`, `forEach`, or spread operator.
4. No `size` property – cannot directly know how many entries exist.
5. Provides methods: `set`, `get`, `has`, `delete`.
6. Useful for associating private data or metadata with objects.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const wm = new WeakMap();

let obj1 = { name: "Kaizer" };
let obj2 = { name: "Alex" };

// Setting values
wm.set(obj1, "Developer");
wm.set(obj2, "Designer");

// Getting values
console.log(wm.get(obj1)); // Developer
console.log(wm.get(obj2)); // Designer

// Checking existence
console.log(wm.has(obj1)); // true

// Deleting
wm.delete(obj2);
console.log(wm.has(obj2)); // false

// Garbage collection example
obj1 = null; // obj1 key is now eligible for garbage collection
// WeakMap automatically removes it, freeing memory

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Storing private data for objects in libraries or frameworks.
- Attaching metadata to DOM elements or class instances without memory leaks.
- Caching information associated with objects that may be deleted later.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. WeakMap keys must always be objects; primitive types will throw an error.
2. Not iterable – you cannot loop over WeakMap entries.
3. Helps prevent memory leaks by allowing automatic removal of keys 
   that are no longer referenced elsewhere.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of WeakMap like a **sticky note on an object**:
  - You attach extra information to an object.
  - When the object is gone, the note disappears automatically.
  - You cannot look at all sticky notes in the room (no iteration), 
    but each note is tied to an object.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can WeakMap store primitive keys?  
A1: No, keys must be objects. Using primitive keys throws an error.

Q2: Can you iterate over a WeakMap?  
A2: No, WeakMap is not iterable. This is intentional to allow garbage collection.

Q3: Does WeakMap have a size property?  
A3: No, there is no `size` property because entries may disappear automatically.

Q4: When would you use WeakMap over Map?  
A4: Use WeakMap when you want to associate data with objects without preventing 
    garbage collection, such as storing private data for class instances 
    or DOM elements.
*/
