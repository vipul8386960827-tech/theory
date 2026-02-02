/* 250_prevent_mutating_array_variables.js */

/*
=====================================
Prevent Mutating Array Variables in React
=====================================

Definition:
In React, state should be treated as immutable. Directly mutating array variables 
inside state (using push, pop, splice, etc.) can lead to unexpected behavior, 
rendering issues, and bugs in the virtual DOM reconciliation.

-------------------------------------
Key Points:
-------------------------------------

1. Immutability:
   - Always create a new array when updating state instead of modifying the original.
   - Helps React detect changes and trigger re-renders properly.

2. Common Methods That Mutate Arrays:
   - push(), pop(), shift(), unshift(), splice(), sort(), reverse().

3. Preferred Methods:
   - concat(), slice(), map(), filter(), spread operator [...array].

-------------------------------------
Example:
-------------------------------------
import React, { useState } from 'react';

function Example() {
  const [items, setItems] = useState([1, 2, 3]);

  // ❌ Avoid mutating the state directly
  // items.push(4);
  // setItems(items);

  // ✅ Correct way: create a new array
  const addItem = () => {
    setItems(prevItems => [...prevItems, 4]);
  };

  return (
    <div>
      <ul>
        {items.map(item => <li key={item}>{item}</li>)}
      </ul>
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
- Think of state arrays like a photograph: you don't erase or draw over it directly.
  Instead, make a new copy with the changes, preserving the original for reference.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why should we avoid mutating arrays in React state?  
A1: React relies on immutability to detect changes and re-render components correctly.

Q2: Can we use array methods like map or filter for updates?  
A2: Yes, they return new arrays and do not mutate the original array.

Q3: What happens if we mutate an array directly in state?  
A3: React may not detect the change, resulting in stale UI or skipped re-renders.

Q4: Are objects in state treated the same way?  
A4: Yes, objects should also be treated as immutable; use spread {...obj} or Object.assign().
*/
