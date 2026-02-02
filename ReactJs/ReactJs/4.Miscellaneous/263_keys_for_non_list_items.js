/* 263_keys_for_non_list_items.js */

/*
=====================================
Keys for Non-List Items in React
=====================================

Definition:
In React, **keys** are special attributes used to identify elements in a list 
for efficient re-rendering. Even when elements are not in an explicit array, 
providing a key can help React track elements between renders.

-------------------------------------
When to Use Keys Outside Lists:
-------------------------------------

1. **Conditional Rendering**
   - If rendering components conditionally (`{condition && <Component />}`), 
     using a key ensures React treats it as a new element if the condition changes.

2. **Dynamic Components**
   - When swapping one component for another in the same position.
   - Using a key forces React to unmount the old component and mount the new one.

3. **Prevent State Carryover**
   - Keys help avoid unintended state persistence between component instances.

-------------------------------------
Example:
-------------------------------------
function App({ step }) {
  return (
    <div>
      {step === 1 && <Form key="step1" />}
      {step === 2 && <Form key="step2" />}
    </div>
  );
}

Explanation:
- Without keys, React may reuse the same Form instance when switching steps.
- With different keys, React creates a fresh instance each time, clearing internal state.

-------------------------------------
Notes:
-------------------------------------
- Keys do not need to be globally unique, just unique among siblings.
- Always use stable identifiers (like IDs) rather than random numbers to prevent unnecessary re-renders.

-------------------------------------
Analogy:
-------------------------------------
- Key = **name tag**:
  - Even if people (components) are in the same room (DOM position), unique tags ensure 
    React knows who is who and doesn’t confuse them.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: What happens if you don’t provide a key for non-list items?  
A1: React may reuse component instances incorrectly, causing state to persist unexpectedly.

Q2: Can keys affect component state?  
A2: Yes, changing a key forces React to unmount the old component and reset its state.

Q3: Should keys be predictable?  
A3: Yes, keys should be stable across renders to avoid unnecessary unmounting/mounting.

Q4: Can you use array index as a key for non-list items?  
A4: Technically yes, but it’s not recommended because it can cause issues with state and re-renders.
*/
