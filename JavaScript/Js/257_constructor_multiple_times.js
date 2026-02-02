/* 257_constructor_multiple_times.js

=====================================================
Constructor Called Multiple Times – Interview-Ready Answer
=====================================================

Definition:
- "In JavaScript classes, the constructor is a special method that is 
   invoked every time a new instance of the class is created using the `new` keyword. 
   Each instance gets its own separate properties initialized."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. Single Constructor per Class  
   - A class can only have one `constructor` method.  
   - Defining multiple constructors will result in a syntax error.

2. Called Per Instance  
   - Constructor runs each time `new ClassName()` is executed.  
   - Initializes properties and sets up the instance.

3. Default Values & Parameters  
   - Can pass different parameters to customize each instance.

-----------------------------------------------------
Examples:

// Example 1: Constructor called for each instance
class User {
  constructor(name, age) {
    console.log("Constructor called");
    this.name = name;
    this.age = age;
  }
}

const user1 = new User("Kaizer", 25); // Constructor called
const user2 = new User("Alice", 30);  // Constructor called

console.log(user1.name); // Kaizer
console.log(user2.name); // Alice

// Example 2: Default parameters
class Employee {
  constructor(role = "Staff") {
    this.role = role;
  }
}
const emp1 = new Employee();
const emp2 = new Employee("Manager");
console.log(emp1.role); // Staff
console.log(emp2.role); // Manager

// Example 3: Only one constructor allowed
// class Example {
//   constructor(a) { }
//   constructor(a, b) { } // SyntaxError: A class may only have one constructor
// }

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Each `new` invocation calls the constructor.  
- Only one constructor method per class is allowed.  
- Multiple instances can have different property values via constructor parameters.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Blueprint analogy: Every time a new house is built from the blueprint, 
  the constructor sets up the initial structure and features individually.

-----------------------------------------------------
Example / Usage:

class Car {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
}

const car1 = new Car("Tesla", "Model S");
const car2 = new Car("BMW", "X5");

console.log(car1.make); // Tesla
console.log(car2.make); // BMW

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can a class have multiple constructors?  
A1: No, only one constructor per class is allowed.

Q2: What happens when `new` is called?  
A2: The constructor runs, initializing a new instance with its properties.

Q3: Can constructors return values?  
A3: Returning objects overrides the instance; returning non-objects is ignored.

Q4: How to create multiple instances with different values?  
A4: Pass different arguments to the constructor when creating each instance.

Q5: Can you call a constructor manually?  
A5: Not directly; use `new ClassName()` to invoke it.
*/
