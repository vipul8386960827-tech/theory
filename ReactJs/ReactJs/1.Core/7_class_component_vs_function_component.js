/*
✅ Sample Interview Answer (spoken form):

Class components are ES6 classes that extend `React.Component` 
and use lifecycle methods like `componentDidMount` or `componentWillUnmount`.  
They manage state using `this.state` and update it with `this.setState()`.

Function components are plain JavaScript functions that return JSX.  
Earlier they were stateless, but with hooks like `useState` and `useEffect`, 
they can now manage state and side effects.  

In short: function components are simpler, cleaner, and preferred in modern React, 
while class components are older but still supported.


---

📌 Real-life Examples:

- **Global analogy (Phones):**
  Class component = old keypad phone (works, but bulky).  
  Function component = smartphone (simpler, faster, modern features).

- **India-specific analogy (Travel):**
  Class component = booking a train ticket offline at the counter (more steps).  
  Function component = booking the same ticket on IRCTC app (simple, quick).

- **Web analogy:**
  Class = `class Button extends React.Component { render() { return <button>Click</button>; } }`  
  Function = `function Button() { return <button>Click</button>; }`


---

📌 Possible Follow-Up Questions & Answers:

Q1: Why are function components preferred today?  
A1: They are simpler, use hooks for state and lifecycle, require less boilerplate, 
and optimize performance better with React updates.

Q2: Can everything done in class components be done in function components?  
A2: Yes, with hooks, all functionality of class components is available in function components.

Q3: Can we still use class components in new projects?  
A3: Yes, but it’s not recommended. Most new codebases use function components exclusively.

Q4: Do class components support hooks?  
A4: No, hooks only work in function components.

Q5: Which one is easier to test?  
A5: Function components are generally easier to test due to their simplicity and fewer dependencies.
*/
