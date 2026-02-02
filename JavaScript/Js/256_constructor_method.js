/* 256_constructor_method.js

=====================================================
Constructor Method in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "A constructor method is a special function in a class that 
   is called automatically when a new instance of the class 
   is created, used to initialize object properties."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Initialize object properties.  
   - Can take parameters to customize instance creation.

2. **Syntax in Classes**  
   - Only one `constructor` method allowed per class.  
   - Example:  
     ```js
     class Person {
       constructor(name, age) {
         this.name = name;
         this.age = age;
       }
     }
     ```

3. **Automatic Invocation**  
   - Invoked when using `new` keyword.  
   - `this` refers to the newly created object.

4. **Return Value**  
   - Returns the new instance by default.  
   - Explicitly returning a non-object value is ignored.  

-----------------------------------------------------
Examples:

// Basic constructor
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
const kaizer = new User("Kaizer", 25);
console.log(kaizer.name); // Kaizer
console.log(kaizer.age);  // 25

// Constructor with default parameters
class Employee {
  constructor(name = "Unknown", role = "Staff") {
    this.name = name;
    this.role = role;
  }
}
const emp = new Employee();
console.log(emp.name); // Unknown
console.log(emp.role); // Staff

// Returning explicit object
class Example {
  constructor() {
    return { custom: "object" };
  }
}
const obj = new Example();
console.log(obj.custom); // "object"

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- `constructor` initializes new instances of a class.  
- Accepts arguments to set initial property values.  
- Only one constructor per class is allowed.  
- Automatically invoked with `new`.  

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Constructor = blueprint step that sets initial values when building a new object.  
- Example: When creating a new car, constructor sets color, engine type, and seats.

-----------------------------------------------------
Example / Usage:

class Car {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
  display() {
    console.log(`${this.make} ${this.model}`);
  }
}

const car1 = new Car("Tesla", "Model 3");
car1.display(); // Tesla Model 3

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can a class have multiple constructors?  
A1: No, only one constructor per class is allowed.

Q2: What happens if constructor returns a non-object value?  
A2: The returned value is ignored; the new instance is returned instead.

Q3: Can constructors be used in function-based objects?  
A3: Yes, functions can act as constructors with `new` keyword.

Q4: Are constructors mandatory in classes?  
A4: No, if omitted, a default constructor is provided automatically.

Q5: How is `this` used inside constructor?  
A5: Refers to the newly created instance of the class.  
*/
