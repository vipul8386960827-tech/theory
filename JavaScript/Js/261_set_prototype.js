/* 261_set_prototype.js

=====================================================
Setting Prototype – Interview-Ready Answer
=====================================================

Definition:
- "In JavaScript, you can set or change the prototype (i.e., the internal [[Prototype]]) 
  of an object using `Object.setPrototypeOf(obj, prototype)`. This allows the object 
  to inherit properties and methods from another object."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Establish inheritance between objects dynamically.  
   - Enable shared methods and properties without copying.

2. **Syntax**  
   - `Object.setPrototypeOf(obj, prototype)`

3. **Performance Note**  
   - Changing prototype at runtime can impact performance; use with caution.

-----------------------------------------------------
Examples:

// Example 1: Simple object inheritance
const parent = { greet() { console.log("Hello"); } };
const child = { name: "Kaizer" };

Object.setPrototypeOf(child, parent);
child.greet(); // Hello
console.log(Object.getPrototypeOf(child) === parent); // true

// Example 2: Class inheritance alternative
const vehicle = { type: "Vehicle" };
const car = { brand: "Tesla" };

Object.setPrototypeOf(car, vehicle);
console.log(car.type); // Vehicle

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- `Object.setPrototypeOf()` links `obj` to a prototype object.  
- After setting, `obj` can access prototype properties via the prototype chain.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Prototype = blueprint.  
- Setting prototype = child object gets access to features of the parent blueprint.

-----------------------------------------------------
Example / Usage:

const proto = { hello() { console.log("Hi"); } };
const obj = {};
Object.setPrototypeOf(obj, proto);
obj.hello(); // Hi
console.log(Object.getPrototypeOf(obj) === proto); // true

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between `__proto__` and `Object.setPrototypeOf`?  
A1: `__proto__` is legacy; `Object.setPrototypeOf` is standard and preferred.

Q2: Can you change prototype of a function?  
A2: Yes, functions are objects; you can set prototype but usually use `Function.prototype`.

Q3: Is it safe to set prototype at runtime?  
A3: It's possible but can degrade performance in performance-critical code.

Q4: What happens if you set prototype to null?  
A4: The object will have no prototype → no inherited properties except built-ins.

Q5: How does prototype chain affect property lookup after setting prototype?  
A5: JS searches the object first, then traverses the new prototype chain until property is found or reaches null.
*/
