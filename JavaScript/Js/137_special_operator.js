/* 137_special_operator.js

=====================================================
Special Operators in JavaScript
=====================================================

Definition:
- Special operators are unique JavaScript operators that perform operations not covered by basic arithmetic or logical operators.
- They include typeof, instanceof, in, delete, void, and others.

-----------------------------------------------------
Common Special Operators:
-----------------------------------------------------
1. typeof
   - Returns a string indicating the type of a value.
   - Example: typeof 123 → "number", typeof "abc" → "string"

2. instanceof
   - Checks if an object is an instance of a constructor.
   - Example: [] instanceof Array → true, {} instanceof Object → true

3. in
   - Checks if a property exists in an object.
   - Example: 'name' in { name: "Alice" } → true

4. delete
   - Deletes a property from an object.
   - Example: let obj = {a:1}; delete obj.a → true; obj → {}

5. void
   - Evaluates an expression and returns undefined.
   - Example: void(0) → undefined

6. yield
   - Used in generators to pause and resume functions.
   - Example: function* gen() { yield 1; yield 2; }

7. await
   - Used with async functions to wait for a Promise to resolve.
   - Example: let result = await fetch(url);

-----------------------------------------------------
Example:
-----------------------------------------------------
let person = { name: "Alice", age: 25 };

// typeof
console.log(typeof person.age); // "number"

// instanceof
console.log(person instanceof Object); // true

// in
console.log('name' in person); // true

// delete
delete person.age;
console.log(person); // { name: "Alice" }

// void
console.log(void(0)); // undefined

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Special operators are like **special tools in a toolbox**:  
  - Each serves a unique purpose that normal tools (basic operators) cannot perform.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What is the difference between typeof null and typeof {}?  
A1: typeof null → "object" (historical JS quirk), typeof {} → "object".

Q2: Can delete remove variables declared with var?  
A2: No, delete only removes object properties, not variables declared with var, let, or const.

Q3: How is void(0) commonly used?  
A3: Often used in hyperlinks (`href="javascript:void(0)"`) to prevent navigation.

Q4: Difference between in operator and hasOwnProperty()?  
A4: in checks in object and its prototype chain, hasOwnProperty only checks own properties.
*/
