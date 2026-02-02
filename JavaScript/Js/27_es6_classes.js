/* 
27_es6_classes.js – Interview-Ready Answer:

"ES6 introduced the `class` syntax in JavaScript as a cleaner, more intuitive way to 
create objects and handle inheritance. It is syntactic sugar over JavaScript's prototype-based inheritance."

1️⃣ Key Points to Highlight:

1. Class Declaration:
- Syntax: 
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    return `Hello, my name is ${this.name}`;
  }
}

2. Class Expression:
- Can be anonymous or named:
const Animal = class {
  constructor(type) {
    this.type = type;
  }
  speak() {
    return `${this.type} makes a sound`;
  }
};

3. Constructor Method:
- Special method for initializing object properties.
- Only one constructor per class is allowed.
- Called automatically when creating a new instance.

4. Inheritance:
- Use `extends` to inherit from another class.
- Use `super()` to call the parent constructor.

Example:
class Employee extends Person {
  constructor(name, age, role) {
    super(name, age);
    this.role = role;
  }
  getRole() {
    return this.role;
  }
}

5. Static Methods:
- Methods defined with `static` can be called on the class itself, not on instances.

Example:
class Utils {
  static square(x) {
    return x * x;
  }
}
console.log(Utils.square(5)); // 25

6. Real-Life Analogies:

- Global Analogy:
  - Class = blueprint; Object = house built from blueprint.
- India-specific Analogy:
  - Class = recipe for a dish; Object = actual dish cooked from recipe.
- Web Analogy:
  - Class = template for UI component; Object = rendered component instance.

7. Differences from ES5 Prototypes:
- Cleaner syntax for inheritance.
- Methods defined inside class are non-enumerable.
- Still uses prototype chain internally.

8. Code Explanation:

- `class` is syntactic sugar over function constructors and prototypes.
- Supports inheritance with `extends`.
- Static methods belong to the class itself.
- All methods in class are non-enumerable and added to prototype.

9️⃣ Example / Usage:

// Creating a class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    return `Hello, my name is ${this.name}`;
  }
}

const person1 = new Person("Kaizer", 28);
console.log(person1.greet()); // "Hello, my name is Kaizer"

// Inheritance
class Employee extends Person {
  constructor(name, age, role) {
    super(name, age);
    this.role = role;
  }
  getRole() {
    return this.role;
  }
}

const emp = new Employee("Amit", 30, "Developer");
console.log(emp.greet()); // "Hello, my name is Amit"
console.log(emp.getRole()); // "Developer"

// Static method
class MathUtils {
  static multiply(a, b) {
    return a * b;
  }
}
console.log(MathUtils.multiply(5, 4)); // 20

10️⃣ Follow-Up Interview Questions:

Q1: What is the difference between ES6 class and ES5 constructor functions?  
A1: ES6 classes provide cleaner syntax, support `extends`, `super`, and static methods. 
   Internally, they still use prototype inheritance.

Q2: Can classes be hoisted?  
A2: No, class declarations are not hoisted. They must be defined before use.

Q3: Can you have multiple constructors in a class?  
A3: No, only one constructor per class is allowed.

Q4: What are static methods?  
A4: Methods that belong to the class itself, not instances.

Q5: Are methods inside classes enumerable?  
A5: No, class methods are non-enumerable.
*/
