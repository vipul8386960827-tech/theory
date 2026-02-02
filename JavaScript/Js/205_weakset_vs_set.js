/* 205_weakset_vs_set.js

=====================================================
WeakSet vs Set in JavaScript
=====================================================

Definition (Interview-friendly):
- "Set is a collection of unique values, iterable, and can store any type. 
  WeakSet is a collection of unique objects only, not iterable, and holds 
  weak references for garbage collection."

-----------------------------------------------------
Key Differences:
-----------------------------------------------------

1. Allowed Values
   - Set: Can store any type (numbers, strings, objects).
     Example:
       const s = new Set([1, "a", {x:10}]);
   - WeakSet: Only objects.
     Example:
       const ws = new WeakSet();
       ws.add({name: "Alice"}); // ✅ allowed

2. Iterability
   - Set: Iterable using for...of or forEach.
     Example:
       for (let val of s) console.log(val);
   - WeakSet: Not iterable; cannot loop through elements.

3. Size Property
   - Set: Has size property.
     Example:
       console.log(s.size);
   - WeakSet: No size property.

4. Garbage Collection
   - Set: Holds strong references; objects are not GC’d until removed.
   - WeakSet: Holds weak references; objects are GC’d if no other reference exists.

5. Methods
   - Both: add(), delete(), has()
   - WeakSet: Cannot clear all at once; Set has clear().

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Set: **Guest list with permanent tracking** – everyone is visible.
- WeakSet: **Temporary guest list** – guests disappear if they leave and are no longer referenced.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can WeakSet store primitive values?
A1: No, only objects.

Q2: Can you iterate over a WeakSet?
A2: No, WeakSet is not iterable.

Q3: Why use WeakSet instead of Set?
A3: To track objects without preventing garbage collection.

Q4: Can WeakSet be cleared manually?
A4: No clear() method; individual objects can be deleted using delete().

Q5: Are Sets garbage collected automatically?
A5: No, Set holds strong references, so objects remain until removed.
*/
