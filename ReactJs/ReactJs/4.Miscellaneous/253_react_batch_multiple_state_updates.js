/* 253_react_batch_multiple_state_updates.js */

/*
=====================================
Batching Multiple State Updates in React
=====================================

Definition:
React can **batch multiple state updates** together to optimize re-renders.
Instead of updating the DOM immediately after each state change, React groups 
updates within the same event loop tick and applies them in a single render. 
This improves performance by reducing unnecessary DOM manipulations.

-------------------------------------
Key Points:
-------------------------------------

1. Automatic Batching:
   - In React 18+, state updates inside event handlers, timeouts, promises, or native events are automatically batched.
   - Only one re-render occurs after multiple `setState` or `useState` updates.

2. Legacy Behavior (React <18):
   - Only updates inside React event handlers were batched.
   - Updates inside async callbacks (setTimeout, fetch) triggered separate re-renders.

3. Functional Updates:
   - When updating state based on previous state, use functional form:
     `setState(prev => prev + 1)` to avoid stale state issues.

4. Benefits:
   - Reduces unnecessary re-renders.
   - Improves performance and UI responsiveness.
   - Ensures consistent state updates.

-------------------------------------
Example:
-------------------------------------
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const handleClick = () => {
    // Multiple state updates
    setCount(prev => prev + 1);
    setText('Updated');

    // React batches these updates into a single render
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Text: {text}</h2>
      <button onClick={handleClick}>Update Both</button>
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
- Think of batching like a grocery list:
  - Instead of buying one item and going back each time, you collect all items first (batch updates) 
    and make a single trip to the store (one render).

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: What happens if you don’t use functional updates inside loops or multiple state changes?  
A1: You may get stale or incorrect state because the previous state may not be up-to-date.

Q2: Can React batch updates from asynchronous callbacks?  
A2: Yes, in React 18+, updates from async callbacks are also batched.

Q3: How does batching improve performance?  
A3: It reduces the number of re-renders and DOM updates, making the app more efficient.

Q4: Does batching happen automatically or manually?  
A4: React 18+ batches updates automatically; in older versions, batching happens only in React event handlers.
*/
