/* 283_property_descriptor_attributes.js

=====================================================
Property Descriptor Attributes in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Property descriptors define metadata for object properties, 
  including value, writability, enumerability, configurability, 
  and getter/setter functions."

Key Points to Highlight:
- Purpose: Control and inspect how object properties behave.
- Descriptor Attributes:
  - value → current value of the property
  - writable → true if property can be modified
  - enumerable → true if property shows up in loops
  - configurable → true if descriptor can be changed or property deleted
  - get → getter function (for accessor properties)
  - set → setter function (for accessor properties)
- Methods:
  - Object.getOwnPropertyDescriptor(obj, prop) → single property descriptor
  - Object.defineProperty(obj, prop, descriptor) → set/modify descriptor
  - Object.getOwnPropertyDescriptors(obj) → all own properties

Examples:

const user = {
  name: 'Alice'
};

// Get descriptor
const desc = Object.getOwnPropertyDescriptor(user, 'name');
console.log(desc);
// { value: 'Alice', writable: true, enumerable: true, configurable: true }

// Define non-writable property
Object.defineProperty(user, 'id', {
  value: 101,
  writable: false,
  enumerable: true,
  configurable: false
});

console.log(Object.getOwnPropertyDescriptor(user, 'id'));
// { value: 101, writable: false, enumerable: true, configurable: false }

Code Explanation:
- value → current data stored
- writable → allows modification
- enumerable → controls visibility in loops
- configurable → allows further changes or deletion
- get/set → accessor functions for dynamic property values

Real-Life Analogy:
- Like a product label detailing whether the item is editable, visible, or removable.

Example / Usage:

// Accessor property
Object.defineProperty(user, 'fullName', {
  get() { return `${this.name} Smith`; },
  set(value) { this.name = value.split(' ')[0]; },
  enumerable: true,
  configurable: true
});

user.fullName = 'Bob Johnson';
console.log(user.name);      // Bob
console.log(user.fullName);  // Bob Smith

Follow-Up Interview Questions:
- Q1: Difference between data property and accessor property?
  A1: Data → value + writable; Accessor → get/set functions.
- Q2: Can writable or configurable attributes be changed later?
  A2: Configurable must be true; otherwise cannot modify descriptor.
- Q3: Are non-enumerable properties visible in Object.keys()?
  A3: No, only enumerable properties are listed.
- Q4: Why use property descriptors?
  A4: Fine-grained control over property behavior.
- Q5: How to make a property read-only?
  A5: Set writable: false in descriptor.
*/
