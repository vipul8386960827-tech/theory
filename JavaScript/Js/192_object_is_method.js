/* 192_object_is_method.js

=====================================================
Object.is() Method in JavaScript
=====================================================

Definition (Interview-friendly):
- "Object.is() determines whether two values are the same value, 
  similar to === but handles special cases like NaN and -0 correctly."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Comparing Numbers
   - Example:
     console.log(Object.is(25, 25)); // true
     console.log(Object.is(25, "25")); // false

2. Handling NaN
   - Example:
     console.log(Object.is(NaN, NaN)); // true
     console.log(NaN === NaN);          // false

3. Handling -0 and +0
   - Example:
     console.log(Object.is(+0, -0)); // false
     console.log(+0 === -0);         // true

4. Comparing Strings and Booleans
   - Example:
     console.log(Object.is("hello", "hello")); // true
     console.log(Object.is(true, true));       // true
     console.log(Object.is(true, false));      // false

5. Use Case
   - Useful when exact sameness is required, including edge cases like NaN or signed zeros

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Object.is() is like **a precise balance scale**:
  - It distinguishes even subtle differences like +0 vs -0 or NaN vs NaN.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between Object.is() and ===?
A1: === treats NaN !== NaN and +0 === -0; Object.is() treats NaN === NaN and +0 !== -0.

Q2: Can Object.is() compare objects?
A2: Yes, but only by reference. Different object instances are not the same.

Q3: Is Object.is() widely supported?
A3: Yes, supported in all modern browsers.

Q4: Use cases for Object.is()?
A4: Comparing values where NaN or signed zero handling is important.

Q5: Alternative for deep comparison?
A5: Object.is() only checks primitive values or references; use custom deep comparison for objects.
*/
