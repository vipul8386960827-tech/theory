/* 284_extend_classes.js

=====================================================
Extending Classes in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Extending classes in JavaScript allows one class (child) to inherit 
  properties and methods from another class (parent) using the `extends` keyword."

Key Points to Highlight:
- Purpose: Enable code reuse and implement inheritance.
- `extends` → used in class declaration to inherit a parent class.
- `super()` → calls the parent class constructor.
- Child class can override parent methods (method overriding).
- Works with ES6 class syntax, not with function constructors.

Examples:

// Parent class
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

// Child class extends parent
class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks`);
  }
}

const dog = new Dog('Buddy');
dog.speak(); // Buddy barks

Code Explanation:
- `Dog` inherits properties from `Animal`.
- Overriding `speak` allows child-specific behavior.
- `super()` can be used in child constructor to call parent constructor.

Real-Life Analogy:
- Like a child inheriting traits from parents but having its own unique behavior.

Example / Usage:

class Cat extends Animal {
  speak() {
    super.speak(); // optionally call parent method
    console.log(`${this.name} meows`);
  }
}

const cat = new Cat('Whiskers');
cat.speak();
// Whiskers makes a sound
// Whiskers meows

Follow-Up Interview Questions:
- Q1: Can a class extend multiple classes in JS?
  A1: No, JS supports single inheritance, but mixins can simulate multiple inheritance.
- Q2: What happens if super() is not called in child constructor?
  A2: ReferenceError occurs; must call before using `this`.
- Q3: Can child class access private fields of parent?
  A3: No, private fields (#field) are not accessible in child.
- Q4: Difference between method overriding and overloading in JS?
  A4: JS does not support overloading; overriding is possible in child.
- Q5: Can you extend built-in classes like Array?
  A5: Yes, with proper ES6 class syntax, e.g., `class MyArray extends Array {}`.
*/
