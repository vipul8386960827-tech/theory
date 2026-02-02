/* 247_why_strict_mode_renders_twice.js

=====================================
Why React Strict Mode Renders Twice
=====================================

Definition:
React Strict Mode intentionally double-invokes certain functions, constructors, 
state initializers, and effects in **development mode** to detect unexpected 
side effects and ensure components remain pure and predictable.

Key Points:
1. **Double Invocation**
   - State initializers (`useState` functions), constructors in class components.
   - Effects (`useEffect` setup) run twice to check cleanup logic.

2. **Purpose**
   - Detect side effects in render or initialization.
   - Ensure components are pure, idempotent, and predictable.
   - Helps catch subtle bugs early during development.

3. **Development Only**
   - This behavior only occurs in development builds.
   - Production builds render normally.

Example:
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(() => {
    console.log("State initializer"); // Will run twice in StrictMode
    return 0;
  });

  useEffect(() => {
    console.log("Effect setup"); // Will run twice (mount/unmount) in StrictMode
  }, []);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}

Analogy:
- Strict Mode = **training simulator**; actions are repeated to ensure the component 
  handles repeated or unexpected situations without errors.

Follow-Up Interview Questions:
Q1: Does double rendering happen in production?  
A1: No, only in development.

Q2: Can double rendering expose bugs?  
A2: Yes, it can reveal side effects in render or state initialization.

Q3: How to prevent issues from double rendering?  
A3: Keep side effects inside `useEffect` or lifecycle methods; render logic should remain pure.

Q4: Does this affect functional and class components alike?  
A4: Yes, constructors, state initializers, and effects in both are double-invoked.
*/
