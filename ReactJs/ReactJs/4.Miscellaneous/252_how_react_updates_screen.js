/* 252_how_react_updates_screen.js */

/*
=====================================
How React Updates the Screen
=====================================

Definition:
React updates the screen using a combination of **virtual DOM**, **diffing algorithm**, 
and **reconciliation**. Instead of updating the real DOM directly, React first updates 
a lightweight virtual representation, calculates the minimal changes needed, and then 
applies them efficiently to the real DOM.

-------------------------------------
Key Points:
-------------------------------------

1. Virtual DOM:
   - React maintains a virtual DOM tree in memory.
   - Allows fast comparison and manipulation without touching the real DOM frequently.

2. Diffing Algorithm:
   - Compares the previous virtual DOM with the new virtual DOM.
   - Determines which parts of the DOM need to change (adds, updates, deletes).

3. Reconciliation:
   - The process of applying the diffed changes to the real DOM.
   - Minimizes expensive DOM operations, improving performance.

4. State & Props Changes:
   - Trigger a re-render of the component.
   - React re-creates the virtual DOM for the component subtree and reconciles it.

5. React Fiber:
   - Enables incremental rendering.
   - Splits updates into units of work.
   - Allows rendering to be paused, interrupted, and resumed, improving UI responsiveness.

-------------------------------------
Example:
-------------------------------------
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

/* When the button is clicked:
   1. setCount updates the state.
   2. Component re-renders to create new virtual DOM.
   3. Diffing algorithm compares old vs new virtual DOM.
   4. Only the <h1> element is updated in the real DOM.

-------------------------------------
Analogy:
-------------------------------------
- Virtual DOM is like a blueprint for a building:
  - You make changes on the blueprint first (virtual DOM) before updating the actual building (real DOM).
  - This prevents unnecessary work and ensures only required updates are applied.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why does React use a virtual DOM instead of updating the real DOM directly?  
A1: Real DOM updates are expensive; virtual DOM allows efficient batch updates.

Q2: How does the diffing algorithm improve performance?  
A2: It calculates minimal changes to the DOM, avoiding full re-renders.

Q3: What is reconciliation in React?  
A3: It’s the process of updating the real DOM using the differences calculated by the diffing algorithm.

Q4: How does React Fiber enhance rendering?  
A4: It allows breaking rendering work into smaller units, enabling interruption and better responsiveness.
*/
