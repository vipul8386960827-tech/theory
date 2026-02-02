/* 208_weakmap_vs_map.js

=====================================================
WeakMap vs Map in JavaScript
=====================================================

Definition (Interview-friendly):
- "Map is a collection of key-value pairs where keys can be any type 
  and it is iterable. WeakMap is a collection of key-value pairs where 
  keys are objects only, not iterable, and are weakly referenced for garbage collection."

-----------------------------------------------------
Key Differences:
-----------------------------------------------------

1. Allowed Keys
   - Map: Any value (objects, primitives)
     Example:
       const m = new Map();
       m.set("name", "Alice");
       m.set(10, "Number");
   - WeakMap: Only objects
     Example:
       const wm = new WeakMap();
       wm.set({id:1}, "Alice");

2. Iterability
   - Map: Iterable (for...of, forEach)
     console.log([...m.entries()]);
   - WeakMap: Not iterable, no size property

3. Garbage Collection
   - Map: Holds strong references; objects remain until manually deleted
   - WeakMap: Weak references; objects are GC’d when no other references exist

4. Methods
   - Both: set(), get(), has(), delete()
   - Map additionally: clear(), keys(), values(), entries()

5. Use Cases
   - Map: General key-value storage
   - WeakMap: Private data storage or temporary object tracking

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Map: **A normal ledger** – records all entries permanently until removed
- WeakMap: **A temporary notebook for objects** – data disappears when object is gone

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can WeakMap keys be primitives?
A1: No, only objects.

Q2: Can WeakMap be iterated?
A2: No, it is not iterable.

Q3: Can Map prevent garbage collection of objects?
A3: Yes, because it holds strong references.

Q4: When would you choose WeakMap over Map?
A4: When storing metadata or private data without preventing GC.

Q5: Do Map and WeakMap preserve insertion order?
A5: Map does; WeakMap has no order because it is not iterable.
*/
