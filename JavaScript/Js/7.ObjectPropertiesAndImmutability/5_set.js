/*
=====================================================
SETTERS IN JAVASCRIPT
=====================================================

DEFINITION:
- A setter is a special method inside an object that
  executes when we assign a value to a property.
- We use the "set" keyword to define a setter.
- A setter receives the assigned value as its parameter.

=====================================================
1. BASIC EXAMPLE
=====================================================
*/

const user = {
  _age: 30,

  set age(value) {
    this._age = value;
  }
};

user.age = 35;

console.log(user._age); // 35

/*
EXPLANATION:
- set age(value) defines a setter.
- user.age = 35 automatically invokes the setter.
- The assigned value, 35, is passed to value.
- this._age = value updates the underlying property.

IMPORTANT:
We write user.age = 35, NOT user.age(35).
A setter is triggered by property assignment.

=====================================================
2. WHY DO WE USE SETTERS?
=====================================================

Suppose we want to prevent a user's age from being negative.

Without validation, an ordinary property allows this:
*/

const person = {
  age: 30
};

person.age = -10;

console.log(person.age); // -10

/*
PROBLEM:
- The object accepts an invalid age.
- We have no automatic validation.

WITH A SETTER:
*/

const validatedUser = {
  _age: 30,

  set age(value) {
    if (value >= 0) {
      this._age = value;
    } else {
      console.log("Age cannot be negative");
    }
  }
};

validatedUser.age = 35;

console.log(validatedUser._age); // 35

validatedUser.age = -10;
// "Age cannot be negative"

console.log(validatedUser._age); // 35

/*
BENEFIT:
- The setter validates the incoming value.
- Valid values are accepted.
- Invalid values are rejected.
- The previous valid value remains unchanged.

=====================================================
3. WHY DO WE USE _age?
=====================================================

- _age is a naming convention indicating an internal property.
- It is not truly private; code can still access it directly.
- We use a different property name to avoid recursively
  invoking the same setter.

INCORRECT EXAMPLE:

set age(value) {
  this.age = value;
}

PROBLEM:
- this.age = value invokes the same setter again.
- This causes infinite recursion and eventually a stack error.

CORRECT EXAMPLE:

set age(value) {
  this._age = value;
}

=====================================================
4. SETTER WITH A PRICE VALIDATION EXAMPLE
=====================================================
*/

const product = {
  _price: 100,

  set price(value) {
    if (value > 0) {
      this._price = value;
    } else {
      console.log("Price must be positive");
    }
  }
};

product.price = 250;

console.log(product._price); // 250

product.price = -50;
// "Price must be positive"

console.log(product._price); // 250

/*
EXPLANATION:
- Assigning product.price invokes the setter.
- The setter checks whether the new price is positive.
- Only valid prices update _price.

=====================================================
5. SETTER VS NORMAL METHOD
=====================================================
*/

// Normal method:
const example1 = {
  setAge(value) {
    this._age = value;
  },
  _age: 30
};

example1.setAge(35); // Parentheses required

// Setter:
const example2 = {
  _age: 30,

  set age(value) {
    this._age = value;
  }
};

example2.age = 35; // No parentheses

/*
KEY DIFFERENCE:
- Normal method: explicitly called with parentheses.
- Setter: automatically invoked by property assignment.

=====================================================
6. INTERVIEW-READY ANSWER
=====================================================

A setter is a special method defined using the "set" keyword.
It executes whenever a value is assigned to its property.

Setters are useful for validating and controlling incoming
values before updating an object's internal state.

For example, we can use a setter to prevent a product's price
from becoming negative.

=====================================================
REMEMBER
=====================================================

- set       -> Defines a setter.
- Assignment -> Triggers the setter.
- value     -> Receives the assigned value.
- this      -> Refers to the object in these examples.
- No ()     -> Use property assignment to invoke a setter.
- Avoid assigning to the same property inside its setter.

*/