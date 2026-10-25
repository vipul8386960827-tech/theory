/*
1_get_property_descriptors.js

=====================================================
PROPERTY DESCRIPTORS IN JAVASCRIPT
=====================================================

DEFINITION:
Property descriptors define the characteristics of an object's
properties, including how they can be read, changed, enumerated,
or deleted.

=====================================================
1. DESCRIPTOR ATTRIBUTES AND THEIR DEFAULT VALUES
=====================================================

A) value
   - Stores the current value of the property.
   - Default: undefined when omitted in Object.defineProperty().

B) writable
   - true  → The property's value can be changed through assignment.
   - false → The property's value cannot be changed through assignment.
   - Default in an object literal: true.
   - Default in Object.defineProperty(): false.

C) enumerable
   - true  → Included in Object.keys(), Object.values(),
             Object.entries(), and for...in loops.
   - false → Excluded from these normal enumeration operations.
   - The property can still be accessed directly.
   - Default in an object literal: true.
   - Default in Object.defineProperty(): false.

D) configurable
   - true  → The property can generally be deleted or its
             descriptor changed.
   - false → Deletion and most descriptor changes are prohibited.
   - Default in an object literal: true.
   - Default in Object.defineProperty(): false.

E) get
   - Getter function that runs when a property is read.
   - Default: undefined when no getter is defined.

F) set
   - Setter function that runs when a value is assigned.
   - Default: undefined when no setter is defined.

IMPORTANT:
A data descriptor uses value and writable.
An accessor descriptor uses get and set.
You cannot combine both types in one descriptor.

=====================================================
2. DEFAULTS IN AN OBJECT LITERAL
=====================================================

const user = {
  name: "Alice"
};

console.log(
  Object.getOwnPropertyDescriptor(user, "name")
);

// {
//   value: "Alice",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }

Explanation:
Properties created through ordinary object literals have
writable, enumerable, and configurable set to true.

=====================================================
3. DEFAULTS WITH Object.defineProperty()
=====================================================

const person = {};

Object.defineProperty(person, "name", {
  value: "Alice"
});

console.log(
  Object.getOwnPropertyDescriptor(person, "name")
);

// {
//   value: "Alice",
//   writable: false,
//   enumerable: false,
//   configurable: false
// }

Explanation:
When writable, enumerable, and configurable are omitted
from a new property descriptor passed to Object.defineProperty(),
they default to false.

=====================================================
4. WHAT EACH FLAG DOES
=====================================================

writable: false
----------------
const obj = {};

Object.defineProperty(obj, "age", {
  value: 30,
  writable: false
});

obj.age = 40;
console.log(obj.age); // 30 in non-strict mode

The assignment does not change the value.
In strict mode, it throws a TypeError.

enumerable: false
-----------------
const obj = {};

Object.defineProperty(obj, "secret", {
  value: "hidden"
});

console.log(obj.secret);       // "hidden"
console.log(Object.keys(obj)); // []

The property exists but is excluded from normal enumeration.

configurable: false
-------------------
const obj = {};

Object.defineProperty(obj, "id", {
  value: 101,
  writable: true,
  configurable: false
});

obj.id = 202;
console.log(obj.id); // 202

delete obj.id;
console.log(obj.id); // 202

The value can change because writable is true, but the
property cannot be deleted.

=====================================================
5. GETTERS AND SETTERS
=====================================================

const person = {
  firstName: "Alice",
  lastName: "Smith"
};

Object.defineProperty(person, "fullName", {
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  set(value) {
    const [first, ...rest] = value.split(" ");
    this.firstName = first;
    this.lastName = rest.join(" ");
  },
  enumerable: true,
  configurable: true
});

console.log(person.fullName); // "Alice Smith"

person.fullName = "Bob Jones";

console.log(person.firstName); // "Bob"

Explanation:
get runs when the property is read.
set runs when the property is assigned a value.

For an accessor descriptor:
- get defaults to undefined.
- set defaults to undefined.
- enumerable and configurable default to false when omitted
  in Object.defineProperty().

=====================================================
6. INTERVIEW SUMMARY
=====================================================

                     Object literal   defineProperty()
writable                 true             false
enumerable               true             false
configurable             true             false

These defaults apply when creating ordinary data properties.
Object.defineProperty() can also modify existing properties,
subject to the rules for configurable and writable.

- writable     → Can the value be changed through assignment?
- enumerable   → Does the property appear in normal enumeration?
- configurable → Can the property be deleted or reconfigured?
- get          → What happens when the property is read?
- set          → What happens when the property is assigned?
*/