/*
✅ Sample Interview Answer (spoken form):

A React element is a plain object that describes what should appear on the UI.  
Example: `<h1>Hello</h1>` is an element.

A React component is a function or class that returns elements and is reusable.  
Example: a function that returns `<h1>Hello</h1>` is a component.

In short: elements are the smallest building blocks, components are blueprints 
that return elements and enable reusability.


---

📌 Real-life Examples:

- **Global analogy (Lego):**
  Element = single Lego block.  
  Component = Lego mold/blueprint used to build many structures.

- **India-specific analogy (Thali):**
  Roti, sabzi, gulab jamun = elements.  
  Thali = component that combines and reuses those dishes.

- **Web analogy:**
  `<button>Click</button>` = element.  
  `Button` component with props = reusable component.


---

📌 Possible Follow-Up Questions & Answers:

Q1: Can an element contain other elements?  
A1: Yes, they can be nested, but they are still plain objects describing UI.

Q2: Can we create elements without JSX?  
A2: Yes, by using `React.createElement`, though JSX is more readable.

Q3: Are components only functions?  
A3: No, they can be functions or classes. Today, function components with hooks are more common.

Q4: Which is more reusable?  
A4: Components, since they can be defined once and reused. Elements are single-use.

Q5: How does React render them together?  
A5: Components return elements, and React uses those elements to update the virtual DOM.
*/
