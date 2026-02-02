/* 190_props_read_only.js

=====================================
Props Are Read-Only in React
=====================================

Definition:
In React, **props** are inputs passed from a parent component to a child component.  
They are **immutable** within the child, meaning the child cannot modify them directly.  
This enforces **unidirectional data flow**, making apps predictable and easier to debug.

-------------------------------------
Key Points:
-------------------------------------
1. Props are **read-only** – you can read them, but not change them.  
2. Only the **parent** component can change props by passing new values.  
3. Children should treat props as constants.  
4. If you need to change data inside a child, use **state** or callbacks to inform the parent.  

-------------------------------------
Guidelines:
-------------------------------------
- Use **props** for passing data or configuration into components.  
- Use **state** for data that needs to change locally.  
- To “update props,” lift the state up to the parent and pass down updated values.  

-------------------------------------
Example:
-------------------------------------
import React from "react";

function Child({ value }) {
  return <h2>Received: {value}</h2>;
}

function Parent() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <Child value={count} /> {/* count is passed as a prop 
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
Think of props like a **read-only letter** from your parent:  
- You can read it, but you can’t change what’s written.  
- If you want a different letter, you must ask the parent to send a new one.  

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why are props immutable in React?  
A1: To enforce unidirectional data flow, making components predictable and easier to debug.  

Q2: How do you modify data passed via props?  
A2: You can’t directly; you must lift state up and let the parent pass updated props.  

Q3: What happens if you try to modify a prop inside a child component?  
A3: React won’t stop you syntactically, but the change won’t persist and can cause bugs.  

Q4: What’s the difference between props and state?  
A4: Props are external, read-only inputs; state is internal and mutable within the component.  

*/
