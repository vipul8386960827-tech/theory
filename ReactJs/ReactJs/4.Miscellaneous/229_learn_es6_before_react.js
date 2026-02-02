/* 229_learn_es6_before_react.js

=====================================
Learn ES6 Before React
=====================================

Definition:
Learning **ES6 (ECMAScript 2015)** is crucial before diving into React because React 
heavily relies on modern JavaScript features like classes, arrow functions, template literals, 
destructuring, modules, and more.

-------------------------------------
Key Points:
-------------------------------------
1. **Classes**: Used for class-based components.  
2. **Arrow Functions**: Concise syntax for functions; preserves `this` context.  
3. **Template Literals**: Easier string interpolation for JSX.  
4. **Destructuring**: Simplifies extracting props, state, and objects.  
5. **Modules (import/export)**: Required for component-based architecture.  
6. **Spread/Rest Operators**: Useful for state updates and props handling.  
7. **Default Parameters**: Simplifies function definitions and props defaults.  

-------------------------------------
Guidelines:
-------------------------------------
- Ensure you are comfortable with ES6 syntax and features before starting React.  
- Focus on **modules, destructuring, arrow functions, and classes** first.  
- Understanding ES6 improves readability, maintainability, and reduces boilerplate in React.

-------------------------------------
Example:
-------------------------------------
// ES5
function greet(name) {
  return "Hello " + name;
}

// ES6
const greet = name => `Hello ${name}`;

// React usage
const Button = ({ text }) => <button>{text}</button>;

-------------------------------------
Analogy:
-------------------------------------
- ES6 = **modern toolkit**  
- React = **house construction**  
- Using React without ES6 is like trying to build a house without modern tools; it's harder and less efficient.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you use React without ES6?  
A1: Technically yes, but it's cumbersome and not recommended.

Q2: Which ES6 feature is most important for React beginners?  
A2: Modules (import/export), arrow functions, and destructuring.

Q3: Why are arrow functions preferred in React?  
A3: They preserve `this` context in class components and are concise in functional components.

Q4: How does destructuring improve React code?  
A4: Simplifies accessing props/state and makes code cleaner and more readable.
*/
