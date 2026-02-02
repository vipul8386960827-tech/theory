/* 248_rules_of_jsx.js

=====================================
Rules of JSX in React
=====================================

Definition:
JSX (JavaScript XML) is a syntax extension for JavaScript that looks similar to HTML 
and is used to describe UI elements in React. JSX must follow certain rules to be valid.

Key Rules:
1. **Single Parent Element**
   - JSX must return a single root element (wrap in a `<div>` or `<React.Fragment>`).

2. **JavaScript Expressions**
   - Use `{}` to embed JS expressions inside JSX, e.g., `{2 + 3}`.

3. **Attribute Naming**
   - Use camelCase for attributes: `className`, `htmlFor`, `onClick`.

4. **Self-Closing Tags**
   - All tags without children must self-close: `<img />`, `<input />`.

5. **Comments**
   - Use `{/* comment ` inside JSX; normal `//` or `/* 

6. **Conditional Rendering**
   - Use ternary or logical operators inside `{}` for conditions.

7. **No Statements Inside JSX**
   - Cannot place statements like `if` or `for` directly inside JSX; use expressions.

Example:
import React from 'react';

function Example() {
  const show = true;
  return (
    <div>
      <h1 className="title">Hello JSX</h1>
      {show ? <p>Visible</p> : <p>Hidden</p>}
      <input type="text" />
      {/* This is a JSX comment 
    </div>
  );
}

Analogy:
- JSX = **HTML in JavaScript**, like embedding a mini-HTML template inside JS, but 
  you need to follow specific rules so React can interpret it correctly.

Follow-Up Interview Questions:
Q1: Can JSX have multiple root elements?  
A1: No, must wrap them in a single parent or fragment.

Q2: Why use `className` instead of `class`?  
A2: `class` is a reserved keyword in JavaScript; `className` is used in JSX.

Q3: Can we use loops directly in JSX?  
A3: No, use array methods like `map` to render lists.

Q4: How to add comments in JSX?  
A4: Use `{/* comment */
