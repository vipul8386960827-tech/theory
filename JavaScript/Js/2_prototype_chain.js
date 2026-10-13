/*
2_prototype_chain.js – Interview-Ready Answer

1. Definition:

The prototype chain in JavaScript is a mechanism that allows objects
to inherit properties and methods from other objects.

When we access a property, JavaScript first checks the object itself.
If the property is not found, it searches the object's prototype
and continues up the prototype chain until the property is found
or the chain ends at null.

2. Coding Example:
*/

function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log("Hello, I am " + this.name);
};

const p1 = new Person("Vipul");

p1.sayHello(); // Hello, I am Vipul

/*
Explanation:

- p1 has its own 'name' property.
- sayHello is defined on Person.prototype, not directly on p1.
- JavaScript finds sayHello through the prototype chain.
- Object.getPrototypeOf(p1) === Person.prototype is true.

3. Important Points:

- Every ordinary object has an internal [[Prototype]] link,
  which can be inspected using Object.getPrototypeOf(obj).
- Object.prototype provides common methods such as toString().
- If a property is not found anywhere in the chain, the lookup
  returns undefined.
- The chain eventually ends at null.
- JavaScript classes also use prototypes for instance-method
  inheritance.

4. Follow-up Questions:

Q1: What is the difference between prototype and __proto__?

A: prototype is a property on constructor functions used when
creating objects with new. __proto__ is a legacy accessor for
an object's internal prototype.

Q2: What is prototypal inheritance?

A: It is the mechanism through which an object can access properties
and methods defined on its prototype or elsewhere in its prototype
chain.

Q3: How can you create an object without a prototype?

A: Object.create(null) creates an object whose prototype is null.

Q4: How do classes relate to prototypes?

A: Methods defined in a JavaScript class body are generally placed
on the class's prototype and shared by its instances.
*/