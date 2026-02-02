/* 199_is_object_sealed.js

=====================================================
Checking if an Object is Sealed in JavaScript
=====================================================

Definition (Interview-friendly):
- "Object.isSealed(obj) checks whether an object is sealed, 
  meaning no new properties can be added or deleted. It returns 
  true if sealed, false otherwise."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Basic Usage
   - Example:
     const person = { name: "Alice", age: 25 };
     Object.seal(person);
     console.log(Object.isSealed(person)); // true

2. Unsealed Object
   - Example:
     const obj = { x: 10 };
     console.log(Object.isSealed(obj)); // false

3. Sealed Array
   - Example:
     const arr = [1, 2, 3];
     Object.seal(arr);
     console.log(Object.isSealed(arr)); // true

4. Nested Objects
   - Only the first-level object is checked; nested objects may remain unsealed.
   - Example:
     const nested = { inner: { a: 1 } };
     Object.seal(nested);
     console.log(Object.isSealed(nested.inner)); // false

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Checking if an object is sealed is like **seeing if an envelope is sealed**:
  - You can tell if no new papers can be added or removed.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can you seal an object after checking it?
A1: Yes, Object.seal(obj) can be called anytime.

Q2: Can Object.isSealed() detect frozen objects?
A2: Yes, frozen objects are also sealed, so it returns true.

Q3: Does sealing affect nested objects?
A3: No, only the top-level object is affected.

Q4: What happens in strict mode if you try to add a property to a sealed object?
A4: Throws a TypeError.

Q5: Difference between Object.isSealed() and Object.isFrozen()?
A5: isSealed checks if properties can be added/deleted; isFrozen also checks if existing properties are immutable.
*/
