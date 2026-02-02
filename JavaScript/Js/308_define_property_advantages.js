/* 308_define_property_advantages.js

=====================================================
Object.defineProperty Advantages – Interview-Ready Answer
=====================================================

Definition:
- "Object.defineProperty() allows precise control over object properties, 
  including configurability, enumerability, writability, and getter/setter behavior."

Key Points to Highlight:
- Allows adding or modifying a property with descriptors:
  - `value` → property value
  - `writable` → can it be changed?
  - `enumerable` → shows up in loops like `for...in`?
  - `configurable` → can property be deleted or reconfigured?
  - `get`/`set` → define accessor functions
- Enables creation of read-only or computed properties
- Useful for libraries, frameworks, and controlling object behavior

Examples:

const obj = {};
Object.defineProperty(obj, 'name', {
  value: 'Alice',
  writable: false,
  enumerable: true,
  configurable: false
});

console.log(obj.name); // Alice
obj.name = 'Bob';       // fails silently in strict mode
console.log(obj.name); // Alice

// Using getter and setter
const person = {};
Object.defineProperty(person, 'age', {
  get() { return this._age; },
  set(value) { this._age = value < 0 ? 0 : value; },
  enumerable: true
});

person.age = 25;
console.log(person.age); // 25
person.age = -5;
console.log(person.age); // 0

Code Explanation:
- `defineProperty` controls how a property behaves
- Can make properties read-only, hidden, or computed
- Provides fine-grained control over objects

Real-Life Analogy:
- Like controlling access to a room: who can enter, modify, or see contents

Example / Usage:

const obj2 = {};
Object.defineProperty(obj2, 'secret', {
  value: 'top-secret',
  writable: false,
  enumerable: false,
  configurable: false
});

console.log(obj2.secret); // top-secret
console.log(Object.keys(obj2)); // []

Follow-Up Interview Questions:
- Q1: Difference between direct assignment and defineProperty?
  A1: Direct assignment is simple; defineProperty allows descriptors control.
- Q2: Can you redefine a non-configurable property?
  A2: No, throws error in strict mode.
- Q3: When to use getter/setter?
  A3: For computed or validated properties.
- Q4: Does defineProperty work on existing properties?
  A4: Yes, can modify descriptors if configurable.
- Q5: Is defineProperty shallow or deep?
  A5: Shallow; only affects the specified property.
*/
