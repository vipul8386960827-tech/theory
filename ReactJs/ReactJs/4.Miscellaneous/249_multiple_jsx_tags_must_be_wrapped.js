/* 249_multiple_jsx_tags_must_be_wrapped.js */

/*
=====================================
Multiple JSX Tags Must Be Wrapped
=====================================

Definition:
In React, a component's render method or functional component must return a single 
root JSX element. Multiple sibling JSX elements cannot be returned directly 
without a wrapper. This ensures a consistent virtual DOM tree structure.

-------------------------------------
Key Points:
-------------------------------------

1. Single Parent Element:
   - All JSX returned must be wrapped in one element like <div> or <React.Fragment>.

2. React.Fragment:
   - Allows grouping of elements without adding extra nodes to the DOM.
   - Useful for layout flexibility and avoiding unnecessary wrapper divs.

3. Why Wrapping is Required:
   - React's render method needs a single root to manage the virtual DOM efficiently.

-------------------------------------
Example:
-------------------------------------
import React from 'react';

function Example() {
  return (
    // Using React.Fragment to wrap multiple elements
    <React.Fragment>
      <h1>Title</h1>
      <p>Paragraph</p>
      <button>Click Me</button>
    </React.Fragment>
  );
}

-------------------------------------
Analogy:
-------------------------------------
- Think of JSX elements like children in a photo frame: 
  you can’t place multiple separate photos directly on the wall, 
  they must be arranged in a single frame. React.Fragment acts like that frame.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can we use multiple <div> tags instead of React.Fragment?  
A1: Yes, but it adds unnecessary extra nodes to the DOM.

Q2: Are there shorthand options for React.Fragment?  
A2: Yes, you can use empty tags <> </> as shorthand.

Q3: What happens if we return multiple sibling JSX elements without wrapping?  
A3: React will throw a syntax error: "Adjacent JSX elements must be wrapped in an enclosing tag".

Q4: Why is wrapping important for the virtual DOM?  
A4: It ensures a consistent single root node for diffing and reconciliation.
*/
