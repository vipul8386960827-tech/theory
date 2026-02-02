/* 
11_first_class_function.js – Interview-Ready Answer:

"In JavaScript, functions are *first-class citizens* (or first-class objects). 
This means functions are treated like any other value: they can be assigned, passed, and returned."

1️⃣ Definition:
- A first-class function is a function that can be:
  - Assigned to a variable,
  - Passed as an argument to another function,
  - Returned from another function.

2️⃣ Key Points to Highlight:
- Functions in JavaScript are objects (with properties and methods).
- Enables higher-order functions (functions that take/return other functions).
- Forms the foundation of functional programming concepts like map, filter, reduce, currying, etc.

3️⃣ Examples:

// Assigning a function to a variable
const greet = function(name) {
  return "Hello " + name;
};
console.log(greet("Alice")); // Hello Alice

// Passing function as an argument
function processUserInput(callback) {
  const name = "Bob";
  console.log(callback(name));
}
processUserInput(greet); // Hello Bob

// Returning a function from another function
function multiplier(x) {
  return function(y) {
    return x * y;
  };
}
const double = multiplier(2);
console.log(double(5)); // 10

4️⃣ Real-Life Analogies:
- Global Analogy: 
  - Function as money: you can hold it, give it to someone, or get it back as change.
- India-specific Analogy:
  - Function as a tiffin box: you can keep it, hand it over, or get it back filled with food.
- Web Analogy:
  - Function as an API: you can store it, send it to another service, and even get one back.

5️⃣ Code Explanation:
- Because functions are first-class, we can use them flexibly.
- They allow us to build abstractions like event handlers, callbacks, and promises.
- Without first-class functions, JavaScript would not support functional programming patterns.

6️⃣ Example / Usage:

// Higher-order function with array
const numbers = [1, 2, 3];
const squared = numbers.map(function(n) {
  return n * n;
});
console.log(squared); // [1, 4, 9]

// Returning arrow function
const adder = x => y => x + y;
const add10 = adder(10);
console.log(add10(5)); // 15

7️⃣ Follow-Up Interview Questions:

Q1: What are higher-order functions?  
A1: Functions that take other functions as arguments or return them.

Q2: Why are functions considered first-class in JavaScript?  
A2: Because they can be stored in variables, passed around, and returned like other values.

Q3: How do first-class functions enable callbacks?  
A3: Callbacks are simply functions passed as arguments, possible because of first-class treatment.

Q4: What is the difference between a first-class function and a higher-order function?  
A4: First-class refers to the property of functions; higher-order refers to specific functions that use them.

Q5: Can functions have properties like objects?  
A5: Yes, because functions are objects. Example: `function foo(){}; foo.prop = 123;`.
*/
