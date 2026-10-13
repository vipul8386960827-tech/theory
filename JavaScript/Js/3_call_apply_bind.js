/*
3_call_apply_bind.js – Interview-Ready Notes

1. Definition:

In JavaScript, call(), apply(), and bind() are methods available on
functions that allow us to explicitly control the value of 'this'.

They are useful for controlling 'this' and borrowing methods from
other objects.

2. Difference Between call(), apply(), and bind():

call():
- Invokes the function immediately.
- Passes arguments individually, separated by commas.

apply():
- Invokes the function immediately.
- Passes arguments as an array or array-like object.

bind():
- Does not invoke the function immediately.
- Returns a new function with 'this' bound to the specified object.
- The returned function can be called later.

3. Coding Example:
*/

const obj1 = {
  name: "Deepika",
  age: 30,

  greet: function (location = "Mumbai") {
    console.log(
      `Hello ${this.name}. Your age is ${this.age} and your location is ${location}`
    );
  }
};

const person = {
  name: "Vipul",
  age: 30
};

// call(): Executes immediately with individual arguments.
// obj1.greet.call(person, "Rajasthan");

// apply(): Executes immediately with arguments in an array.
// obj1.greet.apply(person, ["Rajasthan"]);

// bind(): Returns a new function that can be called later.
const personGreet = obj1.greet.bind(person);
// personGreet("India");

/*
4. Interview Follow-up Questions:

Q1: What is the difference between call() and bind()?

A: call() executes the function immediately, whereas bind() returns
a new function that can be executed later.

Q2: When would you use apply() instead of call()?

A: When the arguments are already available as an array or an
array-like object.

Q3: Can bind() preset arguments?

A: Yes. bind() can preset arguments as well as the 'this' value.
This is known as partial application.

Q4: What happens when null or undefined is passed as 'this'?

A: In a non-strict ordinary function, null and undefined are
replaced by the global object. In strict mode, they remain
null and undefined. Arrow functions use lexical 'this'.

5. Quick Revision:

call()  -> Executes immediately; arguments passed individually.
apply() -> Executes immediately; arguments passed as an array.
bind()  -> Returns a new function for later execution.

Interview Answer:

"call(), apply(), and bind() allow us to control the 'this' value
of a function. The difference is that call() accepts individual
arguments, apply() accepts an array of arguments, and bind()
returns a new function that we can execute later."
*/