/* 
1_create_objects.js – Interview-Ready Answer:

"In JavaScript, objects are collections of key-value pairs used to store structured data. 
There are multiple ways to create objects, each with its own use cases."

Key Points:

1️⃣ Object Literal:
- Most common and simplest way to create an object.
- Syntax: let obj = { key: value };
- Easy to read and write, best for small objects.

2️⃣ Using new Object():
- Uses the built-in Object constructor.
- Syntax: let obj = new Object();
- Less commonly used compared to object literals.

3️⃣ Constructor Function:
- Define a function and use 'this' to set properties.
- Create multiple similar objects using 'new' keyword.
- Used before ES6 classes were introduced.

4️⃣ ES6 Class:
- Cleaner syntax for creating objects with methods and properties.
- Uses 'class' keyword, supports inheritance via 'extends'.

5️⃣ Object.create():
- Creates a new object with a specified prototype.
- Useful for prototype-based inheritance.

6️⃣ Real-life Analogies:
- Object Literal: Writing down details of one person directly in a notebook.
- Constructor Function: A form template used to create multiple people’s records.
- Class: Modern template system that’s cleaner and supports inheritance.
- Object.create: Making a copy based on an existing prototype (like cloning a base design).

7️⃣ Coding Examples:

// 1. Object Literal
let person1 = {
    name: "Rahul",
    age: 25
};

// 2. Using new Object()
let person2 = new Object();
person2.name = "Priya";
person2.age = 30;

// 3. Constructor Function
function Person(name, age) {
    this.name = name;
    this.age = age;
}
let person3 = new Person("Amit", 28);

// 4. ES6 Class
class PersonClass {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
let person4 = new PersonClass("Neha", 26);

// 5. Object.create()
let proto = { greet: function() { return "Hello!"; } };
let person5 = Object.create(proto);
person5.name = "Karan";
person5.age = 32;

// Explanation:
// - person1: Direct object (simple and quick).
// - person2: Using constructor Object() (rarely used in practice).
// - person3: Constructor function (old way for reusable objects).
// - person4: ES6 Class (modern, clean, preferred for OOP).
// - person5: Object.create() (prototypal inheritance).

8️⃣ Possible Follow-Up Questions & Answers:

Q1: Which method is most commonly used to create objects?  
A1: Object literals, as they are concise and easy to use.

Q2: Difference between Constructor Function and Class?  
A2: Both achieve the same purpose, but classes are syntactic sugar with cleaner syntax and built-in inheritance support.

Q3: When would you use Object.create()?  
A3: When you want to directly create an object with a specific prototype for inheritance.

Q4: Can you add methods inside an object literal?  
A4: Yes, by defining a function as a value for a property.

Q5: What is the difference between an object and a JSON object?  
A5: JSON is a data format (string), while a JavaScript object is an in-memory structure.
*/
