/* 220_array_destructuring_in_usestate.js

=====================================
Array Destructuring in useState
=====================================

Definition:
In React, the `useState` hook returns an **array with two elements**: the current state value 
and a function to update it. Array destructuring is used to assign them to separate variables 
for easy usage in functional components.

-------------------------------------
Key Points:
-------------------------------------
1. `useState(initialValue)` returns `[state, setState]`.  
2. Array destructuring assigns them like: `const [value, setValue] = useState(0)`.  
3. The **state variable** holds the current value.  
4. The **setter function** updates the state and triggers re-render.  
5. Without destructuring, you’d have to access via array indices, which is less readable.  

-------------------------------------
Guidelines:
-------------------------------------
- Always use array destructuring for `useState` for clarity.  
- Naming is flexible, but conventionally `[state, setState]` improves readability.  
- Can be used for multiple independent state variables in one component.  

-------------------------------------
Example:
-------------------------------------
import React, { useState } from "react";

function Counter() {
  // Array destructuring
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
- `useState` array = **pair of gloves**:  
  - Left glove = current state value  
  - Right glove = function to change that value  
- Array destructuring lets you wear each glove on the correct hand.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you use object destructuring with useState?  
A1: No, `useState` returns an array, so array destructuring is required.  

Q2: Can you rename variables when destructuring?  
A2: Yes, e.g., `const [counter, setCounterValue] = useState(0)`.  

Q3: How do you handle multiple state variables?  
A3: Use multiple `useState` calls for independent states.  

Q4: Why not use a single object for all states?  
A4: You can, but independent states avoid unnecessary re-renders of unrelated values.
*/
