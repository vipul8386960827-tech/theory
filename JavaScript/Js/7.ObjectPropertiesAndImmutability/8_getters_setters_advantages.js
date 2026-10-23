/* 221_getters_vs_setters_definition.js

=====================================================
Getters vs Setters in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- Getter: A method that allows you to read or access the value of an 
  object property like a normal property, often used for computed values 
  or controlled access.
- Setter: A method that allows you to assign a value to an object property 
  while controlling or validating the assignment.

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
- Getter:
  - Accessed like a property, not called as a function.
  - Cannot accept arguments.
  - Used for computed or derived values.
- Setter:
  - Assign values like a normal property.
  - Accepts exactly one argument.
  - Can include validation logic before assignment.
- Both improve encapsulation and API design.
- Can be defined using object literal syntax or Object.defineProperty().

-----------------------------------------------------
Examples:

// Using Getter
const person1 = {
  firstName: "Alice",
  lastName: "Smith",
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
};
console.log(person1.fullName); // "Alice Smith"

// Using Setter
const person2 = {
  _age: 0,
  set age(value) {
    if(value >= 0) this._age = value;
  },
  get age() {
    return this._age;
  }
};
person2.age = 25;
console.log(person2.age); // 25

// Using Object.defineProperty
const obj = {};
Object.defineProperty(obj, "value", {
  get() { return this._v; },
  set(v) { if(v > 0) this._v = v; },
  enumerable: true,
  configurable: true
});
obj.value = 10;
console.log(obj.value); // 10

-----------------------------------------------------
Real-Life Analogies:
-----------------------------------------------------
- Getter: Peeking into a box to see what’s inside.
- Setter: Placing an item into a box following rules.
- They provide controlled access to internal data.

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Getters allow read access without exposing internal property directly.
- Setters allow controlled write access, including validation.
- Together they encapsulate object state and enable computed properties.

-----------------------------------------------------
Example / Usage:

const product = {
  _price: 0,
  get price() { return this._price; },
  set price(val) { if(val > 0) this._price = val; }
};
product.price = 50; 
console.log(product.price); // 50

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can a getter be used without a setter?
A1: Yes, it can be read-only.

Q2: Can a setter exist without a getter?
A2: Yes, assignment works, but reading returns undefined.

Q3: Can a setter accept multiple parameters?
A3: No, only one parameter is allowed.

Q4: Difference between getter and normal function?
A4: Getter is accessed like a property; normal function requires parentheses.

Q5: Why use getters/setters instead of public properties?
A5: For controlled access, validation, computed values, and better encapsulation.
*/
