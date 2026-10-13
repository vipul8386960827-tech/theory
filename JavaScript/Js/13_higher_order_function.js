/*
13_higher_order_function.js — Interview-Ready Answer

INTERVIEW DEFINITION:

"A higher-order function is a function that takes one or more
functions as arguments, returns a function, or both. Higher-order
functions are possible because JavaScript treats functions as
first-class citizens."


1. KEY POINTS

- A higher-order function (HOF) accepts or returns functions.
- It relies on JavaScript's first-class functions.
- It helps improve code reuse, abstraction, and modularity.
- Common examples include map(), filter(), reduce(), and
  forEach() when they receive callback functions.
- Higher-order functions can be used to implement patterns
  such as currying, partial application, and composition.


2. EXAMPLE: TAKING A FUNCTION AS AN ARGUMENT

function greetUser(name, formatter) {
  return formatter(name);
}

function upperCaseName(name) {
  return name.toUpperCase();
}

console.log(greetUser("Alice", upperCaseName)); // ALICE

// Explanation:
// greetUser is a higher-order function because it accepts
// formatter, which is another function, as an argument.
// upperCaseName is the callback function.


3. EXAMPLE: RETURNING A FUNCTION

function multiplier(x) {
  return function(y) {
    return x * y;
  };
}

const double = multiplier(2);

console.log(double(5)); // 10

// Explanation:
// multiplier is a higher-order function because it returns
// another function.
// The returned function remembers x through a closure.


4. BUILT-IN HIGHER-ORDER FUNCTIONS

const numbers = [1, 2, 3, 4];

const squares = numbers.map(n => n * n);

console.log(squares); // [1, 4, 9, 16]

// Explanation:
// map() accepts a callback function and applies it to each
// array element. Therefore, map() is a higher-order function.


5. PRACTICAL EXAMPLE: FILTERING DATA

const fruits = ["apple", "banana", "cherry"];

const startsWith = letter => item => item.startsWith(letter);

const filtered = fruits.filter(startsWith("b"));

console.log(filtered); // ["banana"]

// Explanation:
// startsWith returns a function, making startsWith a
// higher-order function.
// filter() also accepts a callback function.
// startsWith("b") creates a function that checks whether
// a fruit starts with "b".


6. CURRYING EXAMPLE

const add = x => y => x + y;

const add5 = add(5);

console.log(add5(10)); // 15

// Explanation:
// add returns another function.
// This is an example of currying, where a function that
// accepts multiple arguments conceptually is transformed
// into a sequence of functions, each accepting one argument.
// The returned function remembers x through a closure.


7. ADVANTAGES

- Code reuse: The same function can work with different callbacks.
- Abstraction: Separate the operation from the behavior.
- Modularity: Break complex logic into smaller functions.
- Flexibility: Customize behavior by passing different functions.


8. IMPORTANT INTERVIEW QUESTIONS

Q1. What is a higher-order function?

A1. A function that accepts one or more functions as arguments,
    returns a function, or both.

Q2. What is the difference between a first-class function
    and a higher-order function?

A2. First-class describes how JavaScript treats functions as
    values. Higher-order describes a function that accepts or
    returns other functions.

Q3. Can arrow functions be higher-order functions?

A3. Yes. Any function written using arrow or regular function
    syntax can be a higher-order function if it accepts or
    returns another function.

Q4. Give examples of built-in higher-order functions.

A4. map(), filter(), reduce(), and forEach() are common examples
    when used with callback functions. sort() also accepts a
    comparator callback.

Q5. What is the difference between a callback and a
    higher-order function?

A5. A callback is a function passed to another function.
    A higher-order function is the function that accepts
    or returns another function.

Q6. How does a higher-order function return a function?

A6. It returns a function as its result. For example:

    const multiplier = x => y => x * y;

    multiplier(2)(5); // 10

    The returned function can access x through a closure.


9. INTERVIEW CONCLUSION

"Higher-order functions allow us to pass behavior as an argument
or return behavior from a function. They help create reusable,
modular code and are commonly used in JavaScript array methods,
callbacks, and functional programming patterns."

*/