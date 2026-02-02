/*
=====================================
React vs ReactDOM
=====================================

Definition:
React and ReactDOM are two separate libraries in the React ecosystem 
that serve different purposes.  

- React:
  - Core library for building UI components.  
  - Provides APIs to define components, manage state, props, and lifecycle.  
  - Does NOT interact with the browser directly; it just creates 
    the virtual representation of UI (Virtual DOM).  

- ReactDOM:
  - Library responsible for rendering React components to the DOM.  
  - Provides methods like render() and hydrate().  
  - Handles DOM-specific tasks and updates.  

-------------------------------------
Key Points:
-------------------------------------
- React focuses on "what to render".  
- ReactDOM focuses on "where and how to render".  
- In React Native, ReactDOM is not used; a different renderer handles the platform.  

-------------------------------------
Example: Rendering React Component
-------------------------------------
import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return <h1>Hello World</h1>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

-------------------------------------
Real-Life Analogy:
-------------------------------------
- React = blueprint 🏗️ for building a house.  
- ReactDOM = construction team 👷‍♂️ that actually builds it in the real world.

-------------------------------------
Advantages of Separating React & ReactDOM:
-------------------------------------
1. Platform agnostic → React can work with web, native, VR, etc.  
2. Clear separation of UI logic and rendering.  
3. Easier to test components without a DOM.  

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Can you use React without ReactDOM?
A1: Yes, in environments like React Native or server-side rendering.

Q2: What is ReactDOM.hydrate()?
A2: Used for server-side rendered HTML to attach event listeners and make it interactive.

Q3: Can React update the DOM directly without ReactDOM?
A3: No, React alone manages the virtual DOM; ReactDOM updates the real DOM.

Q4: Are there alternatives to ReactDOM for web?
A4: Yes, libraries like Preact provide lightweight renderers compatible with React API.

Q5: What’s the difference between ReactDOM.render() and ReactDOM.createRoot().render()?
A5: createRoot() is used in React 18+ for concurrent mode and improved updates; render() was used in older versions.
*/
