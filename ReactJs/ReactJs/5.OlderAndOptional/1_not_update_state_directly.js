/* 1_not_update_state_directly.js */

/*
=====================================
Do Not Update State Directly in React
=====================================

Definition:
In React, state should never be updated directly using assignments like
`this.state.value = 10` or `state.value = 10`. Always use `setState` (class components)
or the setter function from `useState` (functional components). Direct updates
bypass React's state management, leading to inconsistent UI and unpredictable behavior.

-------------------------------------
Key Points:
-------------------------------------

1. Correct State Updates:
   - Class Components: `this.setState({ value: 10 })`
   - Functional Components: `setValue(10)`

2. Problems with Direct State Mutation:
   - Component may not re-render.
   - Can cause UI inconsistencies.
   - Breaks React's lifecycle methods and reconciliation process.

3. Immutable Updates:
   - Treat state as immutable.
   - Update arrays/objects by creating a new copy:
     ```js
     setItems(prevItems => [...prevItems, newItem]);
     setObject(prev => ({ ...prev, key: newValue }));
     ```

-------------------------------------
Example:
-------------------------------------
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const handleIncorrectUpdate = () => {
    // ❌ Direct mutation (does not trigger re-render)
    // count = count + 1;
  };

  const handleCorrectUpdate = () => {
    // ✅ Proper update using setter
    setCount(prev => prev + 1);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleIncorrectUpdate}>Incorrect Increment</button>
      <button onClick={handleCorrectUpdate}>Correct Increment</button>
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
- State is like a bank ledger:
  - Directly changing the balance on paper (direct mutation) won't update the system.
  - Using official transactions (setState/useState) ensures correct updates.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you ever update state directly in React?  
A1: No, always use setState or the setter function.

Q2: Why does direct mutation break React's lifecycle?  
A2: React relies on state updates to trigger lifecycle methods and reconciliation. Direct mutation bypasses this.

Q3: How to safely update nested objects or arrays in state?  
A3: Use immutable patterns: spread operators or libraries like Immer.

Q4: What happens if you mix direct mutation with setState?  
A4: It can cause unpredictable UI and hard-to-debug behavior.
*/
