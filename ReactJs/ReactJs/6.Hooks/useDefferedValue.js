/*
========================================
Question: Explain useDeferredValue Hook in Detail
========================================

1. Definition:
- useDeferredValue is a React Hook introduced in **React 18** to **defer updating a value** until less urgent updates are rendered.  
- It helps **keep the UI responsive** by allowing low-priority updates to lag behind urgent updates like typing or animations.

------------------------------------------------------------
2. Key Points to Highlight:
- Accepts a value and returns a deferred version of it.  
- Deferred value updates **after urgent updates are rendered**.  
- Ideal for **expensive computations or rendering large lists** without blocking user interactions.  
- Can be combined with **isPending** from useTransition for fallback UI.  

------------------------------------------------------------
3. Syntax:
const deferredValue = useDeferredValue(value);

- value → the current state or prop you want to defer  
- deferredValue → version of the value that updates asynchronously  

------------------------------------------------------------
4. Example:

import React, { useState, useDeferredValue } from "react";

function SearchList({ items }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(deferredQuery.toLowerCase())
  );

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ul>
        {filteredItems.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

export default SearchList;

------------------------------------------------------------
5. Behavior Explanation:
- When the user types quickly, query updates immediately (urgent).  
- deferredQuery updates slightly later (low-priority), allowing expensive filtering/rendering to lag without blocking input.  
- Improves responsiveness in heavy UI updates.

------------------------------------------------------------
6. Follow-Up Interview Questions:
Q1: How is useDeferredValue different from useTransition?  
A1: useDeferredValue returns a deferred value, while useTransition marks state updates as low-priority.

Q2: Can you combine useDeferredValue with useTransition?  
A2: Yes, to show fallback UI during deferred updates.

Q3: When should you use useDeferredValue?  
A3: For expensive computations triggered by frequently changing values (e.g., search inputs, filtering, large lists).

Q4: Does useDeferredValue trigger re-render on every value change?  
A4: Yes, but the update is scheduled with lower priority, so urgent UI remains responsive.
*/
