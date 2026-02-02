/*
========================================
Question: Explain useId Hook in Detail
========================================

1. Definition:
- useId is a React Hook introduced in **React 18** to generate 
  **unique IDs** that are stable across server and client renders.  
- Useful for accessibility attributes (like id for labels and inputs) 
  and consistent client/server markup during SSR.

------------------------------------------------------------
2. Key Points to Highlight:
- Ensures unique and deterministic IDs for components.  
- Prevents hydration mismatches in server-side rendering (SSR).  
- Can be used multiple times in the same component without collisions.  
- Typically used for accessibility (`htmlFor`, `aria-*`) or linking DOM elements.  

------------------------------------------------------------
3. Syntax:
const id = useId();

- id → a unique string ID that is stable across renders

------------------------------------------------------------
4. Example:

import React, { useId } from "react";

function Checkbox() {
  const id = useId(); // generates unique id

  return (
    <div>
      <input type="checkbox" id={id} />
      <label htmlFor={id}>Accept Terms</label>
    </div>
  );
}

export default Checkbox;

------------------------------------------------------------
5. Behavior Explanation:
- Each call to useId generates a unique identifier.  
- Works correctly with SSR: server-generated IDs match client IDs during hydration.  
- Useful to avoid manually generating random IDs or risking collisions.  

------------------------------------------------------------
6. Follow-Up Interview Questions:
Q1: How is useId different from useRef?  
A1: useRef persists a value but does not generate unique IDs; useId generates unique stable IDs.

Q2: Can useId be used multiple times in one component?  
A2: Yes, each call generates a unique ID.

Q3: Why is useId important for SSR?  
A3: It prevents hydration mismatches between server and client renders.

Q4: Can you use useId for keys in lists?  
A4: Not recommended; use unique values from data for keys instead.
*/
