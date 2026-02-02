/* 5_use_of_refs.js

=====================================
Use of Refs in React
=====================================

Definition:
Refs provide a way to access **DOM nodes or React elements** directly in React. 
They are useful for **interacting with the DOM** without relying solely on state.

-------------------------------------
Key Points:
-------------------------------------

1. Creating Refs:
   - Class components: `React.createRef()`
   - Functional components: `useRef()` hook

2. Accessing DOM Elements:
   - Refs allow reading values (like input fields) or triggering focus/animations.

3. Avoid Overuse:
   - Direct DOM manipulation should be minimal; prefer state-driven updates.

-------------------------------------
Example:
-------------------------------------
import React, { Component, useRef } from 'react';

// Class Component Example
class InputFocusClass extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  focusInput = () => {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.inputRef} />
        <button onClick={this.focusInput}>Focus Input</button>
      </div>
    );
  }
}

// Functional Component Example
function InputFocusFunc() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  }

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
- Refs are like **bookmarks in a book**: You can directly jump to a page (DOM node) instead of scanning every page (state updates).

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you update the DOM directly using refs?  
A1: Yes, but it’s discouraged; state updates are preferred.

Q2: Difference between refs in class vs functional components?  
A2: Class uses `React.createRef()`, functional uses `useRef()` hook.

Q3: Can refs be attached to functional components?  
A3: Not directly; you need `forwardRef`.

Q4: When should refs be preferred over state?  
A4: For managing focus, text selection, media playback, or integrating with non-React libraries.
*/
