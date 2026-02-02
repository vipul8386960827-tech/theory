/* 192_keys_need_global_uniqueness.js

=====================================
Keys Need Global Uniqueness in React
=====================================

Definition:
In React, **keys** are used to identify elements in a list for efficient updates.  
Keys should be **unique among siblings** in the same list, not globally across the entire app.  
This uniqueness allows React to correctly match elements between renders and avoid UI inconsistencies.

-------------------------------------
Key Points:
-------------------------------------
1. Keys are **only relevant within their immediate list** (siblings).  
2. React uses keys to determine which elements are added, removed, or reordered.  
3. Non-unique keys among siblings can cause:
   - Incorrect element reuse.
   - Unexpected re-renders or loss of component state.  
4. Keys do **not need to be globally unique** across the app, only within each array or mapped list.

-------------------------------------
Guidelines:
-------------------------------------
- Always assign **stable, unique keys** for list items.  
- Do not rely on indices if the list can reorder, add, or remove items.  
- Use unique IDs from your data whenever possible.  

-------------------------------------
Example:
-------------------------------------
import React, { useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 101, task: "Buy groceries" },
    { id: 102, task: "Walk the dog" },
    { id: 103, task: "Read book" },
  ]);

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.task}</li> // ✅ unique among siblings
      ))}
    </ul>
  );
}

-------------------------------------
Analogy:
-------------------------------------
Keys are like **name tags at a conference table**:  
- Each person at the table (list of siblings) must have a unique tag.  
- Other tables can have people with the same names, but React only cares about uniqueness within the same table.  

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Do keys need to be unique across the entire React app?  
A1: No, keys only need to be unique among sibling elements in the same list.  

Q2: What happens if two siblings have the same key?  
A2: React may reuse DOM elements incorrectly, causing UI bugs and state loss.  

Q3: Can I use array index as a key here?  
A3: Only if the list is static and will not reorder, otherwise it’s risky.  

Q4: Why are stable keys important for performance?  
A4: Stable keys help React minimize DOM updates, improving efficiency and preventing unnecessary re-renders.  

*/
