/* 6_create_refs.js

=====================================
Creating Refs in React
=====================================

Definition:
Refs are created to **directly access DOM elements or React components**. 
They allow you to bypass the usual data flow (props/state) for specific use cases.

-------------------------------------
Key Points:
-------------------------------------

1. Class Components:
   - Use `React.createRef()` in the constructor.
   - Assign the ref to a JSX element via the `ref` attribute.

2. Functional Components:
   - Use the `useRef()` hook.
   - The ref object persists across renders.

3. Accessing the Ref:
   - Access the DOM element or component instance via `ref.current`.

-------------------------------------
Example:
-------------------------------------
import React, { Component, useRef } from 'react';

// Class Component Example
class MyClassComponent extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef(); // Create ref
  }

  handleClick = () => {
    this.myRef.current.focus(); // Access DOM
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.myRef} />
        <button onClick={this.handleClick}>Focus Input</button>
      </div>
    );
  }
}

// Functional Component Example
function MyFunctionalComponent() {
  const myRef = useRef(null); // Create ref

  const handleClick = () => {
    myRef.current.focus(); // Access DOM
  }

  return (
    <div>
      <input type="text" ref={myRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
- Creating a ref is like setting a **marker or bookmark** in a book. 
  Later, you can jump straight to that page without flipping through all pages.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can multiple refs be created for multiple elements?  
A1: Yes, create separate refs for each element or use an array of refs.

Q2: Can refs be used for functional components?  
A2: Yes, with `useRef()`, and for custom functional components, use `forwardRef`.

Q3: What happens if ref is not attached to any element?  
A3: `ref.current` will be `null`.

Q4: Are refs reactive like state?  
A4: No, updating `ref.current` does not trigger re-render.
*/
