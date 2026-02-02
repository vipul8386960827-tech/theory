/* 258_update_arrays_inside_state.js */

/*
=====================================
Update Arrays Inside State in React
=====================================

Definition:
When managing state in React, **arrays should never be mutated directly**. 
Instead, create a new array when updating, adding, or removing elements to 
ensure React correctly detects state changes and re-renders components.

-------------------------------------
Preferred Techniques (Immutable Updates):
-------------------------------------

1. **Adding Items**
-------------------------------------
const [items, setItems] = React.useState([1, 2, 3]);

// Preferred: using spread operator
setItems([...items, 4]);

// Using concat
setItems(items.concat(4));

2. **Removing Items**
-------------------------------------
setItems(items.filter(item => item !== 2));

3. **Updating Items**
-------------------------------------
setItems(items.map(item => (item === 2 ? 20 : item)));

4. **Inserting at Specific Position**
-------------------------------------
setItems([...items.slice(0, 1), 10, ...items.slice(1)]);

-------------------------------------
Non-Preferred Techniques (Mutable Updates):
-------------------------------------
- `push()`, `pop()`, `splice()`, `sort()`, `reverse()` directly mutate the array.
- Example (do NOT do this):
  items.push(4);
  setItems(items); // React may not detect change

-------------------------------------
Notes:
-------------------------------------
- Always create a **new array** instead of mutating the original.
- For nested arrays or objects, consider using libraries like **Immer** 
  to simplify immutable updates.

-------------------------------------
Analogy:
-------------------------------------
- Updating state arrays = **making a copy of a list** before changing it.
  - Preferred: copy + modify → original remains intact.
  - Non-preferred: modify original → can cause inconsistencies in the app.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why should we avoid using push or splice directly on state arrays?  
A1: Direct mutation may prevent React from detecting changes, causing UI to not re-render.

Q2: Can spread operator be used for nested arrays?  
A2: Yes, but deep copying may be needed; libraries like Immer simplify this.

Q3: What is the performance impact of creating new arrays frequently?  
A3: Usually negligible, but for very large arrays, memoization or optimization may be needed.

Q4: Can we use index as key when mapping arrays?  
A4: It's allowed but can cause issues if array elements are added/removed; prefer stable unique IDs.
*/
