/* 141_function_properties.js

=====================================================
Function Properties in JavaScript
=====================================================

Definition:
- Functions in JavaScript are objects and can have properties.
- You can attach custom properties or access built-in properties.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. `length` Property
   - Returns the number of declared parameters.
   - Example:
     function add(a, b, c) {}
     console.log(add.length); // 3

2. `name` Property
   - Returns the function's name.
   - Example:
     function greet() {}
     console.log(greet.name); // "greet"

3. Custom Properties
   - You can attach your own properties to functions.
   - Example:
     function counter() {}
     counter.count = 0;
     counter.count++;
     console.log(counter.count); // 1

4. `prototype` Property
   - Functions have a prototype used when creating objects with `new`.
   - Example:
     function Person(name) {
       this.name = name;
     }
     Person.prototype.sayHi = function() {
       console.log("Hi " + this.name);
     };
     const p = new Person("Alice");
     p.sayHi(); // "Hi Alice"

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Function properties are like **extra labels or features on a tool**:
  - Built-in labels (length, name)
  - Custom labels you can attach for your own use

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can arrow functions have custom properties?
A1: Yes, but they do not have `prototype`.

Q2: Difference between `length` and `arguments.length`?
A2: `length` is declared parameters; `arguments.length` is actual passed arguments.

Q3: Can function properties be enumerable?
A3: Custom properties are enumerable by default; built-in ones usually are not.

Q4: Why is `prototype` important for functions?
A4: It allows inheritance when using constructor functions with `new`.

Q5: Can you delete a function property?
A5: Yes, using `delete functionName.property`.
*/
