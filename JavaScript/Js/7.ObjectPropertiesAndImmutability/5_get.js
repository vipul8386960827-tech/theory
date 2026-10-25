/*
=====================================================
GETTERS IN JAVASCRIPT
=====================================================

DEFINITION:
- A getter is a special method inside an object that
  executes a function when we access a property.
- We use the "get" keyword to define a getter.
- We access a getter like a normal property, without
  using parentheses ().

=====================================================
1. BASIC EXAMPLE
=====================================================
*/

const user = {
  firstName: "Alice",
  lastName: "Smith",

  get fullName() {
    return this.firstName + " " + this.lastName;
  }
};

console.log(user.fullName); // "Alice Smith"

/*
EXPLANATION:
- get fullName() defines a getter.
- user.fullName automatically executes the getter.
- this.firstName refers to user.firstName.
- this.lastName refers to user.lastName.
- The getter returns the calculated full name.

IMPORTANT:
We write user.fullName, NOT user.fullName().
A getter behaves like a property, not a normal method.

=====================================================
2. WHY DO WE USE GETTERS?
=====================================================

Without a getter, we might store the full name separately:

const user = {
  firstName: "Alice",
  lastName: "Smith",
  fullName: "Alice Smith"
};

user.firstName = "Bob";

console.log(user.fullName); // "Alice Smith"

PROBLEM:
- fullName does not update automatically.
- It still contains the old value.

WITH A GETTER:
*/

const person = {
  firstName: "Alice",
  lastName: "Smith",

  get fullName() {
    return this.firstName + " " + this.lastName;
  }
};

person.firstName = "Bob";

console.log(person.fullName); // "Bob Smith"

/*
BENEFIT:
- The getter calculates the value whenever it is accessed.
- It always uses the latest firstName and lastName values.
- We do not need to store fullName separately.

=====================================================
3. GETTER WITH A CALCULATED VALUE
=====================================================
*/

const product = {
  price: 100,

  get doubledPrice() {
    return this.price * 2;
  }
};

console.log(product.doubledPrice); // 200

/*
EXPLANATION:
- Accessing product.doubledPrice executes the getter.
- this.price refers to product.price.
- The getter returns 100 * 2, which is 200.

=====================================================
4. GETTER VS NORMAL METHOD
=====================================================
*/

// Normal method:
const example1 = {
  getFullName() {
    return "Alice Smith";
  }
};

console.log(example1.getFullName()); // Parentheses required

// Getter:
const example2 = {
  get fullName() {
    return "Alice Smith";
  }
};

console.log(example2.fullName); // No parentheses

/*
KEY DIFFERENCE:
- Normal method: called using parentheses.
- Getter: executed automatically when the property is read.

=====================================================
5. INTERVIEW-READY ANSWER
=====================================================

A getter is a special method defined using the "get" keyword.
It executes when we access a property, allowing us to
calculate or return a value dynamically.

Getters are useful for computed properties and for providing
a property-like interface to values derived from other data.

For example, we can calculate a user's full name from their
firstName and lastName without storing fullName separately.

=====================================================
REMEMBER
=====================================================

- get       -> Defines a getter.
- Read      -> Triggers the getter.
- return    -> Provides the value to the caller.
- this      -> Refers to the object in this example.
- No ()     -> Access a getter like a normal property.

*/