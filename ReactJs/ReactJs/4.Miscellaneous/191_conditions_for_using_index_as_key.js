/* 191_conditions_for_using_index_as_key.js

=====================================
Conditions for Using Index as Key in React
=====================================

Definition:
In React, the `key` prop helps identify elements in a list for efficient updates.  
Using the **array index** as a key is generally discouraged but can be acceptable under certain conditions.

-------------------------------------
Key Points:
-------------------------------------
1. React uses keys to track items between renders and minimize DOM updates.  
2. Using indices as keys can cause issues like:
   - Incorrect UI updates on item reordering or deletion.
   - Loss of component state in lists.  
3. Acceptable conditions for using index as key:
   - The list is **static** (items do not change, add, or remove).  
   - The list will **never be reordered**.  
   - Items do not have unique IDs.  

-------------------------------------
Guidelines:
-------------------------------------
- Always prefer **unique, stable IDs** for keys.  
- Only use index as a key when the above conditions are met to avoid bugs.  

-------------------------------------
Example:
-------------------------------------
import React, { useState } from "react";

function StaticList() {
  const items = ["Apple", "Banana", "Cherry"];

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li> // ✅ acceptable for static list
      ))}
    </ul>
  );
}

function DynamicList() {
  const [items, setItems] = useState(["Apple", "Banana", "Cherry"]);

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li> // ❌ can cause bugs if items reorder or are removed
      ))}
      <button onClick={() => setItems(["Banana", "Apple", "Cherry"])}>Reorder</button>
    </ul>
  );
}

-------------------------------------
Analogy:
-------------------------------------
Think of keys like **name tags** at a conference:  
- Unique name tags (IDs) correctly identify each attendee.  
- Using seat numbers (indices) works only if no one moves.  
- If attendees switch seats, confusion arises (UI bugs).  

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why should we avoid using array indices as keys?  
A1: Because reordering, adding, or removing items can cause incorrect DOM updates and state loss.  

Q2: When is it okay to use index as key?  
A2: For static lists that never reorder or change dynamically.  

Q3: What’s the recommended alternative to index keys?  
A3: Use unique, stable IDs for each item.  

Q4: Can using index keys affect performance?  
A4: Not directly, but it can lead to unnecessary re-renders and lost component state.  

*/
