/* 
10_arrow_functions.js – Interview-Ready Answer:

"Arrow functions (introduced in ES6) are a shorter syntax for writing functions in JavaScript, 
but they also come with different behavior regarding `this`, `arguments`, and constructors."

1️⃣ Definition:
- Arrow functions are a concise way to write functions using the `=>` syntax.
- They do not have their own `this`, `arguments`, `super`, or `new.target`.

2️⃣ Key Points to Highlight:
- Syntax → shorter and cleaner than traditional functions.
- `this` → arrow functions inherit `this` from their surrounding lexical scope (unlike normal functions).
- Cannot be used as constructors (no `new` keyword with them).
- No `arguments` object (must use rest parameters `...args` instead).
- Great for callbacks and array methods.

const obj1={
  name:'vipul',
  greet:function(){
    console.log('hello',this.name)
  }
}
obj1.greet()

const obj2={
  name:'vipul',
  greet:()=>{
    console.log('hello',this.name)
  }
}
obj2.greet()

const obj3={
  name:'vipul',
greet:function(){
  const arr = ()=>{
    console.log('hello',this.name)
  }
  arr()
}
}
obj3.greet()

4️⃣ Real-Life Analogies:
- Global Analogy: 
  - Normal functions = employee who always needs to be told "who the boss is" (dynamic this).
  - Arrow functions = employee who always knows their boss from the start (lexical this).
- India-specific Analogy:
  - Normal function = temporary worker who may forget who he is reporting to.
  - Arrow function = permanent staff who always reports to the same manager.
- Web Analogy:
  - Normal function in event handler = `this` might point to the element clicked.
  - Arrow function in event handler = `this` will remain bound to its lexical scope.

5️⃣ Code Explanation:
- Arrow functions reduce boilerplate.
- They are especially useful for callbacks (map, filter, reduce).
- But avoid them in object methods or when you need `arguments` or constructor behavior.

6️⃣ Example / Usage:

// Shorter syntax
const nums = [1, 2, 3, 4];
const squares = nums.map(n => n * n);
console.log(squares); // [1, 4, 9, 16]

// No `arguments`
try {
  const test = () => console.log(arguments);
  test(1, 2, 3); 
} catch (e) {
  console.log(e.message); // arguments is not defined
}

// Rest operator fix
const testFixed = (...args) => console.log(args);
testFixed(1, 2, 3); // [1, 2, 3]

7️⃣ Follow-Up Interview Questions:

Q1: Can arrow functions be used as object methods?  
A1: No, because they do not have their own `this`. They will inherit `this` from the outer scope.

Q2: Can arrow functions be used as constructors with `new`?  
A2: No, they cannot. They lack the `[[Construct]]` method.

Q3: How do arrow functions handle `arguments`?  
A3: They don’t have `arguments`. Use rest parameters (`...args`) instead.

Q4: In what cases should you avoid arrow functions?  
A4: When you need function hoisting, when defining object methods, or when using `this` in event listeners.

Q5: Why are arrow functions commonly used in array methods?  
A5: They provide concise syntax and automatically capture the surrounding `this`, avoiding common pitfalls.
*/
