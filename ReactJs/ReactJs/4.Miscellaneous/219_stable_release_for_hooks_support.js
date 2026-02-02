/* 219_stable_release_for_hooks_support.js

=====================================
Stable Release for Hooks Support
=====================================

Definition:
React **Hooks** were officially introduced and fully supported starting from **React 16.8**.  
This release allowed functional components to manage state, side effects, and context 
without the need for class components.

-------------------------------------
Key Points:
-------------------------------------
1. React 16.8 is the **minimum version** to use Hooks.  
2. Hooks enable `useState`, `useEffect`, `useContext`, `useReducer`, `useRef`, and custom hooks.  
3. Functional components became capable of handling most class component functionalities.  
4. No breaking changes to existing class components; Hooks are **backward compatible**.  

-------------------------------------
Guidelines:
-------------------------------------
- Ensure project uses React 16.8 or later before using hooks.  
- For older React versions, class components must be used for state and lifecycle.  
- Always follow **rules of hooks**: only call hooks at top level and in React functions.  

-------------------------------------
Example:
-------------------------------------
import React, { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Note: Requires React 16.8+ for Hooks support

-------------------------------------
Analogy:
-------------------------------------
- React <16.8 = **manual tools requiring classes**  
- React 16.8+ = **modern toolkit with hooks**, allowing functional components to be fully capable.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Which React version introduced Hooks?  
A1: React 16.8.

Q2: Can hooks be used in class components?  
A2: No, hooks only work in functional components.

Q3: Are hooks backward compatible with older React versions?  
A3: No, React 16.8 or higher is required.

Q4: Why did React introduce hooks instead of keeping class components?  
A4: To simplify code, enable reusable logic via custom hooks, and avoid `this` binding issues.
*/
