/* 282_get_property_descriptors.js

=====================================================
Get Property Descriptors in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Property descriptors provide metadata about object properties, 
  including configurability, enumerability, writability, and value. 
  `Object.getOwnPropertyDescriptors(obj)` retrieves descriptors for all own properties."

Key Points to Highlight:
- Purpose: Inspect detailed property attributes, useful in advanced object manipulation.
- Descriptor Attributes:
  - value → current value of the property
  - writable → true if property can be changed
  - enumerable → true if property shows up in loops
  - configurable → true if property descriptor can be changed or property deleted
  - get → getter function (if accessor)
  - set → setter function (if accessor)
- Method:
  - Object.getOwnPropertyDescriptor(obj, prop) → single property
  - Object.getOwnPropertyDescriptors(obj) → all own properties

Examples:

const user = {
  name: 'Alice',
  age: 30
};

const desc = Object.getOwnPropertyDescriptor(user, 'name');
console.log(desc);
// { value: 'Alice', writable: true, enumerable: true, configurable: true }

const allDesc = Object.getOwnPropertyDescriptors(user);
console.log(allDesc);
// { name: {value: 'Alice', writable:true, enumerable:true, configurable:true}, age: {...} }

Code Explanation:
- Provides full metadata for object properties.
- Useful when creating copies, freezing objects, or defining new properties.

Real-Life Analogy:
- Like a product label showing material, size, color, and care instructions.

Example / Usage:

// Define non-writable property
Object.defineProperty(user, 'id', {
  value: 101,
  writable: false,
  enumerable: true,
  configurable: false
});

console.log(Object.getOwnPropertyDescriptors(user));

Follow-Up Interview Questions:
- Q1: Difference between getOwnPropertyDescriptor and getOwnPropertyDescriptors?
  A1: Descriptor → single property; Descriptors → all own properties.
- Q2: Can descriptors be changed?
  A2: Yes, if configurable is true, using Object.defineProperty().
- Q3: Are inherited properties included?
  A3: No, only own properties.
- Q4: How to make a property read-only?
  A4: Set writable: false.
- Q5: How to hide a property from loops?
  A5: Set enumerable: false.
*/
