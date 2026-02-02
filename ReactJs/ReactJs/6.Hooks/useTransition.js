/*
========================================
Question: Explain useTransition Hook in Detail
========================================

1. Definition:
- useTransition is a React Hook introduced in **React 18** for **concurrent rendering**.  
- It allows you to mark certain state updates as **non-urgent**, so urgent updates like typing or clicks remain responsive.  
- Ideal for **smoother UI transitions** when updating large components or rendering expensive content.

------------------------------------------------------------
2. Key Points to Highlight:
- Returns an array: [isPending, startTransition]  
- isPending → boolean indicating whether the transition is ongoing  
- startTransition → function used to wrap state updates as low-priority  
- Helps prevent blocking the main thread for non-critical updates  
- Useful for rendering filtered lists, paginated content, or complex UI updates.

------------------------------------------------------------
3. Syntax:
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setState(newValue); // non-urgent state update
});

------------------------------------------------------------
4. Example:

import React, { useState, useTransition } from "react";

function FilterList({ items }) {
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Wrap expensive state update in transition
    startTransition(() => {
      const filtered = items.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
    });
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleChange} />
      {isPending && <p>Loading...</p>}
      <ul>
        {filteredItems.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

export default FilterList;

------------------------------------------------------------
5. Behavior Explanation:
- State updates inside startTransition are **low-priority**.  
- Urgent updates (like input value) remain responsive even during expensive computations.  
- isPending helps to show a fallback UI (e.g., loading spinner) during the transition.

------------------------------------------------------------
6. Follow-Up Interview Questions:
Q1: How is useTransition different from useState?  
A1: useTransition doesn’t replace state; it allows marking some state updates as non-urgent.

Q2: What is the benefit of useTransition in UI?  
A2: It keeps the UI responsive during expensive updates.

Q3: Can you use useTransition with multiple updates?  
A3: Yes, all state updates wrapped in startTransition are treated as low-priority.

Q4: How is useTransition related to concurrent mode?  
A4: It leverages React’s concurrent rendering to schedule updates without blocking urgent interactions.
*/
