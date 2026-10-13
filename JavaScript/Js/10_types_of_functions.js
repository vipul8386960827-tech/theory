/*
TYPES / FORMS / CLASSIFICATIONS OF FUNCTIONS IN JAVASCRIPT
==========================================================

1. FUNCTION DECLARATION
Definition:
A function defined using the function keyword followed by a name.

Example:
function greet() {
  console.log("Hello");
}

greet(); // Hello


2. FUNCTION EXPRESSION
Definition:
A function created as an expression and assigned to a variable
or used in another expression.

Example:
const greet = function() {
  console.log("Hello");
};

greet(); // Hello


3. ARROW FUNCTION
Definition:
A function written using the => syntax. It inherits this from
its surrounding lexical scope.

Example:
const greet = () => console.log("Hello");

greet(); // Hello


4. ANONYMOUS FUNCTION
Definition:
A function expression without an explicit function name.

Example:
setTimeout(function() {
  console.log("Hello");
}, 1000);


// 5. NAMED FUNCTION EXPRESSION
Definition:
A function expression with an explicit name.

Example:
const greet = function sayHello() {
  console.log("Hello");
};

greet(); // Hello


6. IMMEDIATELY INVOKED FUNCTION EXPRESSION (IIFE)
Definition:
A function expression invoked immediately after it is defined.

Example:
(function() {
  console.log("Executed immediately");
})();


// 7. CALLBACK FUNCTION
Definition:
A function passed to another function to be invoked by it.

Example:
function process(callback) {
  callback();
}

process(() => console.log("Callback executed"));


// 8. HIGHER-ORDER FUNCTION
Definition:
A function that accepts a function as an argument, returns a
function, or both.

Example:
function calculate(a, b, operation) {
  return operation(a, b);
}

console.log(calculate(5, 3, (a, b) => a + b)); // 8


9. CONSTRUCTOR FUNCTION
Definition:
A regular function conventionally used with new to initialize
a newly created object.

Example:
function Person(name) {
  this.name = name;
}

const person = new Person("Vipul");

console.log(person.name); // Vipul


10. GENERATOR FUNCTION
Definition:
A function declared using function* that can pause and resume
execution using yield.

Example:
function* generateNumbers() {
  yield 1;
  yield 2;
}

const generator = generateNumbers();

console.log(generator.next().value); // 1
console.log(generator.next().value); // 2


11. ASYNC FUNCTION
Definition:
A function declared using async that always returns a Promise
and allows await inside its body.

Example:
async function greet() {
  return "Hello";
}

greet().then(console.log); // Hello


12. RECURSIVE FUNCTION
Definition:
A function that calls itself until a base condition is reached.

Example:
function factorial(n) {
  if (n <= 1) return 1;

  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120


13. CURRIED FUNCTION
Definition:
A function that transforms a multi-argument operation into
a sequence of functions, each accepting one argument.

Example:
const add = a => b => a + b;

console.log(add(2)(3)); // 5


14. UNARY FUNCTION
Definition:
A function designed to accept one argument.

Example:
const square = n => n * n;

console.log(square(4)); // 16


15. BINARY FUNCTION
Definition:
A function designed to accept two arguments.

Example:
const add = (a, b) => a + b;

console.log(add(2, 3)); // 5


16. NULLARY FUNCTION
Definition:
A function designed to accept no arguments.

Example:
const greet = () => "Hello";

console.log(greet()); // Hello


17. VARIADIC FUNCTION
Definition:
A function that can accept any number of arguments.

Example:
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3, 4)); // 10


18. PURE FUNCTION
Definition:
A function that consistently returns the same output for the
same inputs and has no observable side effects.

Example:
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5


19. IMPURE FUNCTION
Definition:
A function that depends on or changes external state, or
otherwise produces observable side effects.

Example:
let total = 0;

function addToTotal(value) {
  total += value;
  return total;
}

console.log(addToTotal(5)); // 5


20. FACTORY FUNCTION
Definition:
A function that creates and returns an object without requiring
the new keyword.

Example:
function createPerson(name) {
  return { name };
}

const person = createPerson("Vipul");

console.log(person.name); // Vipul


21. METHOD
Definition:
A function associated with an object or class.

Example:
const person = {
  name: "Vipul",

  greet() {
    console.log("Hello", this.name);
  }
};

person.greet(); // Hello Vipul


22. ASYNC GENERATOR FUNCTION
Definition:
An async generator combines asynchronous execution with
generator behavior and can yield values over time.

Example:
async function* generateNumbers() {
  yield 1;
  yield 2;
}

async function run() {
  for await (const number of generateNumbers()) {
    console.log(number);
  }
}

run(); // Logs 1 and 2 asynchronously


23. PARTIALLY APPLIED FUNCTION
Definition:
A function created by fixing some arguments of another
function while leaving the remaining arguments to be supplied.

Example:
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2);

console.log(double(5)); // 10


24. COMPOSED FUNCTION
Definition:
A function created by combining functions so that the output
of one function becomes the input of another.

Example:
const double = n => n * 2;
const increment = n => n + 1;

const compose = (f, g) => x => f(g(x));

const result = compose(double, increment);

console.log(result(3)); // 8


INTERVIEW NOTE:
These are not mutually exclusive categories.

For example:
- An arrow function can be a callback.
- A curried function can also be an arrow function.
- A unary function describes the number of arguments.
- A pure function describes behavior.
- A higher-order function describes how functions are used.
- A method is a function associated with an object or class.

Prioritize function declarations, expressions, arrow functions,
callbacks, higher-order functions, closures, IIFEs, currying,
pure functions, and this behavior for frontend interviews.
*/