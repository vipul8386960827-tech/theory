/* 258_call_parent_constructor.js

=====================================================
Calling Parent Constructor – Interview-Ready Answer
=====================================================

Definition:
- "In JavaScript classes, the `super()` function is used within a 
  child class constructor to call the parent class constructor, 
  allowing the child to inherit and initialize properties from the parent."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Ensures proper initialization of parent class properties.  
   - Required when a child class has its own constructor.

2. **Syntax**  
   - `super(arguments)` calls the parent constructor.  
   - Must be called before using `this` in the child constructor.

3. **Inheritance**  
   - Enables extending classes while reusing parent initialization logic.

-----------------------------------------------------
Examples:

// Parent class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

// Child class
class Employee extends Person {
  constructor(name, age, role) {
    super(name, age); // Call parent constructor
    this.role = role;
  }
}

const emp = new Employee("Kaizer", 25, "Developer");
console.log(emp.name); // Kaizer
console.log(emp.age);  // 25
console.log(emp.role); // Developer

// Error example: Using `this` before `super`
// class Wrong extends Person {
//   constructor(name) {
//     this.name = name; // ❌ ReferenceError
//     super(name);
//   }
// }

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- `super()` invokes the parent constructor to initialize inherited properties.  
- Must be called before accessing `this` in a subclass.  
- Supports passing arguments to parent constructor.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Blueprint analogy: Child house uses parent blueprint for base structure, then adds its own features.

-----------------------------------------------------
Example / Usage:

class Vehicle {
  constructor(type) {
    this.type = type;
  }
}

class Car extends Vehicle {
  constructor(type, brand) {
    super(type); // Call parent constructor
    this.brand = brand;
  }
}

const car = new Car("Car", "Tesla");
console.log(car.type);  // Car
console.log(car.brand); // Tesla

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What happens if you omit `super()` in a subclass constructor?  
A1: Using `this` before calling `super()` will throw a ReferenceError.

Q2: Can `super()` be used outside the constructor?  
A2: Yes, `super.methodName()` can be used to call parent methods.

Q3: Is `super()` mandatory in child constructor?  
A3: Only if the child defines its own constructor; otherwise, default is inherited.

Q4: Can arguments be passed to parent constructor?  
A4: Yes, pass them via `super(arg1, arg2, ...)`.

Q5: Can you call `super()` multiple times in the same constructor?  
A5: No, only once per constructor before using `this`.
*/
