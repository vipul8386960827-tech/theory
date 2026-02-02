/* 129_arguments_object.js

=====================================================
The `arguments` Object in JavaScript
=====================================================

Definition:
- The `arguments` object is an **array-like object** available inside all 
  non-arrow functions.  
- It contains all arguments passed to the function, regardless of the 
  number of parameters declared.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. **Array-like, not a real array**
   - Has `length` property.
   - Indexed elements like `arguments[0]`, `arguments[1]`.
   - Does NOT have array methods (`map`, `forEach`, etc.) directly.

2. **Works only in non-arrow functions**
   - Arrow functions do not have their own `arguments` object.
   - They use the `arguments` of the closest non-arrow function.

3. **Useful for variable number of arguments**
   - Allows functions to accept arguments without explicitly naming them.

4. **Rest operator (`...args`) vs `arguments`**
   - Rest operator is modern, gives a real array.
   - Preferred over `arguments`.

-----------------------------------------------------
Examples:
-----------------------------------------------------
// Example 1: Basic usage
function sum() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}
console.log(sum(1, 2, 3, 4)); // 10

// Example 2: Access individual arguments
function greet() {
  console.log("First:", arguments[0]);
  console.log("Second:", arguments[1]);
}
greet("Hello", "World"); 
// First: Hello
// Second: World

// Example 3: Arrow function limitation
const arrowFn = () => {
  console.log(arguments); // ❌ ReferenceError in strict mode
};

// Example 4: Rest operator alternative
function sumRest(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
console.log(sumRest(1, 2, 3, 4)); // 10

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Think of `arguments` like a **guest list at a party**:
  - It records everyone who entered, even if you didn’t expect them.
  - But it’s not as flexible as a real array (you can’t easily sort or filter it).

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why is `arguments` not a real array?  
A1: For historical reasons, it’s an array-like object. Modern JavaScript prefers rest parameters.

Q2: Can you use `arguments` in arrow functions?  
A2: No. Arrow functions don’t have their own `arguments`.

Q3: Which is better: `arguments` or rest parameters?  
A3: Rest parameters (`...args`) because they return a real array and are more readable.

Q4: How can you convert `arguments` into a real array?  
A4: Use `Array.from(arguments)` or `[...arguments]`.
*/
