/*
5_first_class_function.js — Interview-Ready Answer

INTERVIEW DEFINITION:

"In JavaScript, functions are first-class citizens. This means
functions can be assigned to variables, passed as arguments to
other functions, and returned from other functions, just like
other values."


1. ASSIGNING A FUNCTION TO A VARIABLE

const greet = function(name) {
  return "Hello " + name;
};

console.log(greet("Alice")); // Hello Alice

// Explanation:
// We assign a function to the variable greet and invoke it
// using greet().


2. PASSING A FUNCTION AS AN ARGUMENT

function processUserInput(callback) {
  const name = "Bob";
  console.log(callback(name));
}

processUserInput(greet); // Hello Bob

// Explanation:
// We pass greet as an argument to processUserInput.
// The receiving function invokes it as a callback.


3. RETURNING A FUNCTION FROM ANOTHER FUNCTION

function multiplier(x) {
  return function(y) {
    return x * y;
  };
}

const double = multiplier(2);

console.log(double(5)); // 10

// Explanation:
// multiplier returns another function.
// The returned function remembers x through a closure.


4. HIGHER-ORDER FUNCTIONS

// A higher-order function is a function that takes another
// function as an argument, returns a function, or both.

const numbers = [1, 2, 3];

const squared = numbers.map(function(n) {
  return n * n;
});

console.log(squared); // [1, 4, 9]

// Explanation:
// map() accepts a callback function, so map is a
// higher-order function.


5. FIRST-CLASS FUNCTIONS VS HIGHER-ORDER FUNCTIONS

// First-class functions:
// Describes how JavaScript treats functions as values.
// They can be assigned, passed, and returned.

// Higher-order functions:
// Functions that accept other functions as arguments
// or return functions.


6. IMPORTANT INTERVIEW QUESTIONS

Q1. What are first-class functions?

A1. Functions that can be assigned to variables, passed as
    arguments, and returned from other functions.

Q2. What are higher-order functions?

A2. Functions that accept other functions as arguments,
    return functions, or both.

Q3. What is a callback function?

A3. A function passed to another function to be invoked
    by that function.

Q4. What is the difference between first-class and
    higher-order functions?

A4. First-class describes the way functions are treated
    as values. Higher-order describes functions that
    operate on other functions.

Q5. How are first-class functions used in frontend development?

A5. They enable event handlers, callbacks, array methods
    such as map(), filter(), and reduce(), and many
    asynchronous programming patterns.


7. INTERVIEW CONCLUSION

"First-class functions allow JavaScript functions to be
handled like other values. This enables callbacks and
higher-order functions, which are widely used in frontend
development, especially with event handlers and array methods."

*/