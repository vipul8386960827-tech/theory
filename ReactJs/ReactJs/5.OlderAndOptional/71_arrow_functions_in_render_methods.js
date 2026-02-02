/* 71_arrow_functions_in_render_methods.js

=====================================================
Arrow Functions in Render Methods in React
=====================================================

Definition:
Arrow functions can be defined inside a React component’s render method, typically for event handlers.
However, using them directly in render has performance implications because a new function is created on every render.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Syntax Example
   - Inline arrow function:
     <button onClick={() => handleClick()}>Click Me</button>
   - Bound method alternative:
     <button onClick={this.handleClick}>Click Me</button>

2. Pros
   - Easy and concise syntax.
   - Can pass parameters to event handlers easily.

3. Cons
   - New function created on each render → can trigger unnecessary re-renders for child components using `React.memo`.
   - May cause performance issues in large lists or frequent updates.

4. Best Practices
   - Use class methods or `useCallback` hook to memoize functions.
   - Avoid creating functions inside render for frequently rendered components.

-----------------------------------------------------
Example:
-----------------------------------------------------
import React, { useState, useCallback } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  // Recommended: memoized function
  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  return (
    <div>
      <h2>Count: {count}</h2>

      {/* Avoid inline arrow function if performance matters 
      <button onClick={increment}>Increment</button>

      {/* Inline arrow function (less efficient) 
      <button onClick={() => setCount(count + 1)}>Increment Inline</button>
    </div>
  );
}

export default Counter;

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Inline arrow function = writing a new note each time you enter a room.
- Memoized function = keeping a single note and updating only when necessary.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why are inline arrow functions discouraged in render?  
A1: Because they create a new function on each render, potentially causing unnecessary re-renders.

Q2: When is it acceptable to use inline arrow functions in React?  
A2: For small components or rare renders where performance is not critical.

Q3: How does `useCallback` help with arrow functions in functional components?  
A3: `useCallback` memoizes the function, preventing unnecessary re-creations on each render.

Q4: Does using arrow functions affect class components similarly?  
A4: Yes, inline arrow functions in class render methods also create new functions on each render.

*/
