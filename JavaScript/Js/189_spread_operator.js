/* 189_spread_operator.js

=====================================================
Spread Operator in JavaScript
=====================================================

Definition (Interview-friendly):
- "The spread operator (...) allows an iterable (like an array or object) 
  to be expanded into individual elements, useful for copying, merging, 
  or passing multiple values."

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Copying Arrays
   - Example:
     const arr1 = [1,2,3];
     const arr2 = [...arr1];
     console.log(arr2); // [1,2,3]

2. Merging Arrays
   - Example:
     const arrA = [1,2];
     const arrB = [3,4];
     const merged = [...arrA, ...arrB];
     console.log(merged); // [1,2,3,4]

3. Function Arguments
   - Example:
     function sum(a,b,c) { return a+b+c; }
     const nums = [1,2,3];
     console.log(sum(...nums)); // 6

4. Copying Objects
   - Example:
     const obj1 = {a:1, b:2};
     const obj2 = {...obj1};
     console.log(obj2); // {a:1, b:2}

5. Adding/Overwriting Properties
   - Example:
     const obj3 = {...obj1, b:10, c:5};
     console.log(obj3); // {a:1, b:10, c:5}

6. Edge Cases
   - Only works on iterables (arrays, strings, objects)
   - Non-iterables throw an error

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Spread operator is like **spreading a deck of cards**:
  - You take each card (element) out individually for use.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between spread operator and rest parameter?
A1: Spread expands elements; rest collects elements into an array.

Q2: Can spread be used on strings?
A2: Yes, [..."abc"] => ["a","b","c"]

Q3: Does spread create deep copy?
A3: No, it creates shallow copy only.

Q4: Can you use spread with sets or maps?
A4: Yes, since they are iterable.

Q5: What happens if used on non-iterables?
A5: Throws TypeError.
*/
