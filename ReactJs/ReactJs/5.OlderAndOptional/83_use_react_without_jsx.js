/* 83_use_react_without_jsx.js

=====================================================
Using React Without JSX
=====================================================

Definition:
React can be used without JSX by directly calling `React.createElement`.
JSX is syntactic sugar that compiles down to `React.createElement` calls.
Using React without JSX is sometimes needed in environments where JSX compilation isn't available.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. React.createElement
   - Syntax: React.createElement(type, props, ...children)
   - type: HTML tag string or React component
   - props: object containing attributes/props
   - children: nested elements or text content

2. Example Without JSX
   const element = React.createElement(
     'h1',
     { className: 'title' },
     'Hello World'
   );

3. Nested Elements
   - Can nest elements by passing other createElement calls as children:
     const nested = React.createElement(
       'div',
       null,
       React.createElement('h1', null, 'Hello'),
       React.createElement('p', null, 'This is without JSX')
     );

4. Pros
   - No compilation step required.
   - Works in plain JS environments.

5. Cons
   - More verbose and less readable compared to JSX.
   - Harder to visualize the component tree.

-----------------------------------------------------
Example:
-----------------------------------------------------
import React from "react";
import ReactDOM from "react-dom";

const element = React.createElement(
  'div',
  { className: 'container' },
  React.createElement('h1', null, 'Hello World'),
  React.createElement('p', null, 'Using React without JSX')
);

ReactDOM.render(element, document.getElementById('root'));

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- JSX = shorthand notation for writing HTML inside JS (like shorthand text).
- React.createElement = manually writing all the steps to build a LEGO model brick by brick.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Is JSX mandatory for React?  
A1: No, React can be used with pure JS using React.createElement.

Q2: Why do most developers prefer JSX?  
A2: Readability, maintainability, and easier visualization of the UI structure.

Q3: How does JSX get converted to React.createElement?  
A3: Babel transpiles JSX into nested React.createElement calls at build time.

Q4: Can functional components work without JSX?  
A4: Yes, return React.createElement from the function.
*/
