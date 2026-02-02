/* 221_add_getters_setters_defineproperty.js

=====================================================
Adding Getters and Setters using Object.defineProperty() – Interview-Ready Answer
=====================================================

Definition:
- Getter: A method defined to read a property value using Object.defineProperty(), 
  often used for computed or controlled access.
- Setter: A method defined to assign a property value using Object.defineProperty(), 
  with optional validation or logic before assignment.

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
- Object.defineProperty() allows detailed control over property:
  - configurable: Can the property be deleted or changed
  - enumerable: Appears in loops or Object.keys()
  - writable: Can be written directly (if no setter)
- Getters are accessed like properties, no arguments allowed.
- Setters accept exactly one argument.
- Provides encapsulation and computed properties on existing objects.

-----------------------------------------------------
Examples:

const obj = {};
Object.defineProperty(obj, "name", {
  get() {
    return this._name || "Default Name";
  },
  set(value) {
    if(value.length > 0) this._name = value;
  },
  enumerable: true,
  configurable: true
});

obj.name = "Alice";
console.log(obj.name); // "Alice"
obj.name = "";
console.log(obj.name); // "Alice" (setter validation applied)

// Another example with computed property
const person = { firstName: "Bob", lastName: "Smith" };
Object.defineProperty(person, "fullName", {
  get() { return `${this.firstName} ${this.lastName}`; },
  set(name) {
    const parts = name.split(" ");
    this.firstName = parts[0];
    this.lastName = parts[1];
  },
  enumerable: true
});
console.log(person.fullName); // "Bob Smith"
person.fullName = "Alice Johnson";
console.log(person.firstName, person.lastName); // "Alice Johnson"

-----------------------------------------------------
Real-Life Analogies:
-----------------------------------------------------
- Getter: Peeking into a locked drawer without opening it.
- Setter: Placing items into the drawer while following rules.
- defineProperty gives control over who can see, change, or delete the contents.

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Object.defineProperty() allows defining getters and setters on any object.
- Getters provide computed or protected read access.
- Setters provide controlled write access, including validation.

-----------------------------------------------------
Example / Usage:

const product = {};
Object.defineProperty(product, "price", {
  get() { return this._price || 0; },
  set(value) { if(value >= 0) this._price = value; },
  enumerable: true
});
product.price = 100;
console.log(product.price); // 100
product.price = -50;
console.log(product.price); // 100 (setter prevents negative)

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between object literal getter/setter and defineProperty?
A1: Literal syntax is simpler; defineProperty allows control over descriptors.

Q2: Can getters/setters be enumerable using defineProperty?
A2: Yes, by setting enumerable: true.

Q3: Can a setter exist without a getter?
A3: Yes, assignment works, reading returns undefined.

Q4: Can defineProperty override existing property?
A4: Yes, if configurable: true.

Q5: Why use defineProperty for getters/setters?
A5: For adding computed or controlled properties to existing objects with full descriptor control.
*/
