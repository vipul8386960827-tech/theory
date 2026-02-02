/* 206_problems_with_render_props_and_pure_components.js

=====================================
Problems with Render Props and Pure Components in React
=====================================

Definition:
**Render props** is a technique where a component’s render logic is passed via a function prop.  
**Pure components** are components that only re-render when their props or state change (shallow comparison).  

Using render props inside pure components can cause **unexpected re-renders**, because functions are recreated on every render.

-------------------------------------
Key Points:
-------------------------------------
1. Passing a new function as a render prop each render breaks pure component optimization.  
2. Pure components use **shallow comparison** (`===`) for props, so a new function reference triggers re-render.  
3. Leads to **performance issues** in large component trees.  
4. Can be mitigated using `useCallback` in functional components or memoization.

-------------------------------------
Guidelines:
-------------------------------------
- Avoid inline functions in render props if the child is a pure component.  
- Use `React.memo` or `useCallback` to prevent unnecessary re-renders.  
- Consider alternative patterns like HOCs or custom hooks when performance is critical.

-------------------------------------
Example:
-------------------------------------
import React, { PureComponent, useCallback, useState } from "react";

// Child using render prop
const Child = React.memo(({ render }) => {
  console.log("Child rendered");
  return <div>{render()}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);

  // Without useCallback, function is recreated every render
  const renderContent = useCallback(() => <span>Count: {count}</span>, [count]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child render={renderContent} />
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
Render props with new functions each time is like **sending a new letter every day for the same message**:  
- Even if the message didn’t change, the receiver processes it again, wasting time.  
- Memoization (`useCallback`) avoids sending a new letter unnecessarily.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why do pure components re-render when using render props?  
A1: Because each render creates a new function reference, breaking shallow comparison.  

Q2: How can you prevent unnecessary re-renders with render props?  
A2: Use `useCallback` in functional components or move the function outside the render.  

Q3: Are there alternatives to render props for reusable logic?  
A3: Yes, **Higher-Order Components (HOCs)** and **custom hooks** can achieve similar behavior.  

Q4: Does this problem exist in class-based pure components?  
A4: Yes, any pure component using a new function reference in props will re-render unnecessarily.  

*/
