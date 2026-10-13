/*
10_arrow_functions.js — Interview-Ready Answer

"Arrow functions were introduced in ES6. They provide concise
function syntax and differ from regular functions mainly in how
they handle this, arguments, and constructor behavior."

1. KEY DIFFERENCES

- Syntax:
  Arrow functions use the => syntax.

- this:
  Arrow functions inherit this from their surrounding lexical scope.
  Regular functions determine this based on how they are called.

- arguments:
  Arrow functions do not have their own arguments object.
  Use rest parameters (...args) when you need to collect arguments.

- Constructors:
  Arrow functions cannot be called with new.

- Hoisting:
  Arrow functions assigned to const or let cannot be accessed
  before initialization.

2. EXAMPLES: UNDERSTANDING this

// Regular function: this refers to the calling object.
const obj1 = {
  name: "Vipul",
  greet: function () {
    console.log("Hello", this.name);
  }
};

obj1.greet(); // Hello Vipul


// Arrow function: this comes from the surrounding scope,
// not automatically from obj2.
const obj2 = {
  name: "Vipul",
  greet: () => {
    console.log("Hello", this.name);
  }
};

obj2.greet(); // Usually Hello undefined in a browser script
              // Exact result depends on the surrounding scope.


// Arrow function inside a regular method inherits that method's this.
const obj3 = {
  name: "Vipul",
  greet: function () {
    const arr = () => {
      console.log("Hello", this.name);
    };

    arr();
  }
};

obj3.greet(); // Hello Vipul


3. COMMON USE CASE

// Concise callbacks for array methods.
const nums = [1, 2, 3, 4];

const squares = nums.map(n => n * n);

console.log(squares); // [1, 4, 9, 16]


4. arguments vs REST PARAMETERS

// Arrow functions do not have their own arguments object.
// Use rest parameters to collect arguments.
const test = (...args) => {
  console.log(args);
};

test(1, 2, 3); // [1, 2, 3]


5. THE EASIEST WAY TO REMEMBER

// ARROW FUNCTIONS
// - Do not have their own this.
// - Inherit this from the surrounding lexical scope.
// - Their this does not automatically refer to the object
//   calling the arrow function.
// - call(), apply(), and bind() cannot change their this.

// REGULAR FUNCTIONS
// - Have their own this binding.
// - The value of this depends on how the function is called.
// - When called as obj.method(), this refers to obj.
// - When called independently in strict mode, this is undefined.
// - call(), apply(), and bind() can explicitly set their this.

// MEMORY TRICK:
// Arrow function = this comes from where it is defined.
// Regular function = this comes from how it is called.


6. IMPORTANT INTERVIEW QUESTIONS

Q1. What is the main difference between arrow and regular functions?

A. Arrow functions inherit this lexically, while regular functions
   determine this based on how they are called.

Q2. Can arrow functions be used as object methods?

A. Yes, but their this does not automatically refer to the object.
   Regular methods are generally preferable when using this.

Q3. Can arrow functions be used as constructors?

A. No. Arrow functions cannot be invoked with new.

Q4. Do arrow functions have their own arguments object?

A. No. Use rest parameters (...args) to collect arguments.

Q5. Why are arrow functions commonly used in array methods?

A. They provide concise callback syntax and can inherit this
   from the surrounding lexical scope.

Q6. Can call(), apply(), or bind() change an arrow function's this?

A. No. An arrow function's this is lexically inherited and cannot
   be changed using call(), apply(), or bind().

Q7. What is the difference between function scope and lexical this?

A. Function scope determines where variables such as var are
   accessible. Lexical this means an arrow function inherits this
   from its surrounding context rather than creating its own.


7. INTERVIEW CONCLUSION

"Arrow functions are useful for concise callbacks and preserving
the surrounding this context. Regular functions are preferable
when a method needs its own this binding or when constructor
behavior is required."

*/