/* 241_usestate_vs_useref_hooks.js

=====================================
useState vs useRef Hooks in React
=====================================

Definition:
- **useState**: A hook used to declare and manage state in functional components. 
  Updates to state cause the component to re-render.
- **useRef**: A hook that returns a mutable ref object whose `.current` property 
  can hold a value. Updating `.current` does not trigger a re-render.

Key Points:
1. **useState**
   - Triggers re-render when state changes.
   - Ideal for UI updates based on user interaction.
   - State persists across re-renders.

2. **useRef**
   - Does NOT trigger re-render on change.
   - Ideal for storing mutable values, DOM references, timers, or previous state.
   - Can persist values across renders without causing re-render.

Example:
import React, { useState, useRef, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // triggers re-render
  const countRef = useRef(0);             // does NOT trigger re-render

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + 1);        // UI updates
      countRef.current += 1;             // just keeps internal count
      console.log("Ref count:", countRef.current);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <h1>Count: {count}</h1>;
}

Analogy:
- useState = **notebook with visible counter** that updates on change.
- useRef = **hidden bookmark** that stores data but doesn’t trigger visible updates.

Follow-Up Interview Questions:
Q1: When should you use useRef instead of useState?
A1: For storing values that don’t need to trigger re-render, like DOM nodes or timers.

Q2: Can useRef replace useState?
A2: Not fully; useRef does not cause re-renders, so UI cannot depend on it.

Q3: Does changing a useRef value trigger useEffect hooks?
A3: No, useEffect only reacts to state/prop changes or ref dependencies if specified.

Q4: Can useRef hold previous state values?
A4: Yes, it’s commonly used to keep track of previous render values.

*/
