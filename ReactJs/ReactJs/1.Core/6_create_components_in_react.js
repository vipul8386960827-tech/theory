/*
✅ Sample Interview Answer (spoken form):

There are mainly three ways to create components in React:

1. **Function Components** – A simple JavaScript function that returns JSX.  
   These are the most commonly used now.

2. **Class Components** – ES6 classes that extend `React.Component` and 
   have a render method returning JSX.  
   These were popular earlier but are less common today after hooks were introduced.

3. **Arrow Function Components** – A shorter syntax using ES6 arrow functions.  
   They are function components, just written in a more concise way.

In short: function components and arrow function components are preferred today 
because they are simpler and work well with hooks, while class components are older style.


---

📌 Real-life Examples:

- **Global analogy (Cooking recipe):**
  Function component = a handwritten recipe.  
  Arrow function = same recipe but in shorthand notes.  
  Class component = a full cookbook with extra details like index, glossary, etc.

- **India-specific analogy (Making tea):**
  Making tea at home quickly = function component (simple, efficient).  
  Using a premix sachet = arrow function (short, fast).  
  Running a tea stall with a full setup = class component (bigger, more detailed).

- **Web analogy:**
  Function component = `function Button() { return <button>Click</button>; }`  
  Arrow function = `const Button = () => <button>Click</button>;`  
  Class component = `class Button extends React.Component { render() { return <button>Click</button>; } }`


---

📌 Possible Follow-Up Questions & Answers:

Q1: Which type of component is recommended today?  
A1: Function components with hooks, because they are simpler, more concise, and fully support state and lifecycle.

Q2: Are class components still supported?  
A2: Yes, they are still supported for backward compatibility, but new code usually uses function components.

Q3: Can we use hooks inside class components?  
A3: No, hooks only work inside function components.

Q4: Are arrow function components different from normal function components?  
A4: No, they are just syntactic sugar. Both are function components under the hood.

Q5: Can components return multiple elements?  
A5: Yes, by wrapping them inside a parent element or using `React.Fragment`.
*/
