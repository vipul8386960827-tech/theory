/* 254_prevent_automatic_batching.js */

/*
=====================================
Prevent Automatic Batching in React
=====================================

Definition:
React automatically batches multiple state updates to optimize re-renders.
However, there are scenarios where you may want to **prevent automatic batching** 
and force each state update to trigger its own render. This can be done using 
`ReactDOM.flushSync` (for synchronous updates) or by controlling the environment 
where batching occurs.

-------------------------------------
Key Points:
-------------------------------------

1. Automatic Batching:
   - React 18+ batches state updates in event handlers, promises, timeouts, etc.
   - Improves performance by reducing multiple renders into one.

2. Preventing Batching:
   - Use `ReactDOM.flushSync` to force immediate rendering:
     ```js
     import { flushSync } from 'react-dom';
     flushSync(() => setState(newValue));
     ```
   - Only use this when you need immediate updates and can tolerate extra renders.

3. Use Cases:
   - Animations requiring immediate state updates.
   - Integrations with third-party libraries that expect synchronous DOM changes.

4. Caveats:
   - Overuse can reduce performance benefits.
   - Should be used sparingly for specific scenarios.

-------------------------------------
Example:
-------------------------------------
import React, { useState } from 'react';
import { flushSync } from 'react-dom';

function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // Normally batched updates
    setCount(count + 1);
    setCount(count + 2);

    // Using flushSync to prevent batching
    flushSync(() => setCount(prev => prev + 1));
    flushSync(() => setCount(prev => prev + 1));
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>Update Count</button>
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
- Think of automatic batching as delivering all letters together in one batch.
- Using `flushSync` is like delivering each letter immediately as it is written.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why would you want to prevent automatic batching?  
A1: To ensure immediate state updates in scenarios like animations or third-party DOM manipulations.

Q2: Does `flushSync` affect performance?  
A2: Yes, it can trigger multiple renders, so it should be used sparingly.

Q3: Is automatic batching always enabled?  
A3: React 18+ enables it by default; in older versions, only event handler updates were batched.

Q4: Can flushSync be used in asynchronous callbacks?  
A4: Yes, it forces synchronous rendering regardless of context.
*/
