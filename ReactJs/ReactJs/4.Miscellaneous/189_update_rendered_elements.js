/* 189_update_rendered_elements.js

=====================================
Update Rendered Elements in React
=====================================

Definition:
In React, UI updates are achieved by changing the **state** or **props** of a component.  
React’s reconciliation (diffing) algorithm efficiently updates only the parts of the DOM  
that have changed, instead of re-rendering the entire page.

-------------------------------------
Key Points:
-------------------------------------
1. React elements are **immutable** – you cannot change them directly once created.  
2. To update the UI, you change **state** or **props**, which triggers a re-render.  
3. React compares the new Virtual DOM with the previous one and applies minimal DOM updates.  
4. Updates are **declarative**: you describe what the UI should look like, React handles the "how".

-------------------------------------
Guidelines:
-------------------------------------
- Use `setState` (class) or `useState` (hooks) to update component data.  
- Never mutate state directly – always use state setters (`setX`) or immutability helpers.  
- Use `key` props correctly in lists to help React identify changed items.  

-------------------------------------
Example:
-------------------------------------
import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
Updating rendered elements in React is like a **digital scoreboard**:  
- You don’t replace the whole board when the score changes.  
- Only the numbers that changed are updated, making it efficient and quick.  

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why can’t we directly modify a React element to update the UI?  
A1: React elements are immutable; updates are only possible through state or props changes.  

Q2: How does React minimize DOM updates?  
A2: It uses the Virtual DOM diffing algorithm to update only changed nodes.  

Q3: Why is immutability important for React updates?  
A3: It helps React quickly detect what has changed and ensures predictable rendering.  

Q4: What role do `key` props play in updating rendered lists?  
A4: They help React identify which items have changed, added, or removed, improving update efficiency.  

*/
