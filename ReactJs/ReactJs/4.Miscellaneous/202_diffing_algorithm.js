/* 202_diffing_algorithm.js

=====================================
React Diffing Algorithm (Reconciliation)
=====================================

Definition:
The **diffing algorithm** in React (also called the reconciliation algorithm) 
is used to efficiently update the DOM when the state or props of a component change.  
Since updating the real DOM is expensive, React uses a **virtual DOM** 
and updates only the parts that have changed.

-------------------------------------
Core Idea:
-------------------------------------
- Naive comparison of two DOM trees is O(n^3) → too slow for real apps.
- React uses **heuristics** (rules) to reduce complexity to O(n).

-------------------------------------
Steps of the Diffing Algorithm:
-------------------------------------

1. **Compare Elements by Type**
   - If the root elements differ in type, React destroys the old tree 
     and builds the new one from scratch.
     Example: `<div>` → `<span>` will re-render the subtree.
   - If they are of the same type, React compares attributes/props.

2. **Compare Attributes/Props**
   - React updates only changed attributes instead of replacing the node.
     Example:
       Old: `<button className="red">`
       New: `<button className="blue">`
       → React changes only the `className`.

3. **Compare Children**
   - Children are compared sequentially.
   - React assumes child order remains the same unless **keys** are used.

   Example:
   Old: `<ul><li>A</li><li>B</li></ul>`
   New: `<ul><li>B</li><li>A</li></ul>`
   Without keys → React will re-render both nodes.
   With keys (`key="A"`, `key="B"`) → React reuses nodes efficiently.

4. **Keys for Optimization**
   - Keys help React identify elements uniquely across renders.
   - Without keys, React may unnecessarily re-render, causing performance issues.
   - Keys are critical when rendering lists.

5. **Component Diffing**
   - If component type is the same, React updates with new props/state.
   - If type changes, React destroys the old component instance 
     and mounts a new one.

-------------------------------------
Detailed Example:
-------------------------------------

Case 1: Different types
-------------------------------------
Old: <h1>Hello</h1>
New: <p>Hello</p>
→ Entire <h1> replaced with <p>.

Case 2: Same type, different props
-------------------------------------
Old: <button disabled={true}>Click</button>
New: <button disabled={false}>Click</button>
→ React updates only the "disabled" attribute.

Case 3: List without keys
-------------------------------------
Old: <ul><li>A</li><li>B</li></ul>
New: <ul><li>B</li><li>A</li></ul>
→ React destroys both <li> and re-renders them.

Case 4: List with keys
-------------------------------------
Old: <ul><li key="A">A</li><li key="B">B</li></ul>
New: <ul><li key="B">B</li><li key="A">A</li></ul>
→ React swaps positions without re-rendering content.

-------------------------------------
Performance:
-------------------------------------
- Naive tree diff: O(n^3).
- React heuristics reduce it to O(n).
- Keys ensure minimal re-rendering for dynamic lists.

-------------------------------------
Analogy:
-------------------------------------
- Think of React’s diffing like comparing two "class attendance sheets":
  - If a student (element) has the same ID (key), React just updates their details (props).
  - If the student ID is missing, React removes them.
  - If a new student appears with a new ID, React adds them.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why does React need keys in lists?  
A1: To uniquely identify elements and avoid unnecessary re-renders when order changes.

Q2: What happens if keys are not provided?  
A2: React falls back to index as a key, leading to inefficient updates and possible bugs.

Q3: Does React do deep comparison of objects in props?  
A3: No, React only does shallow comparison.

Q4: Can React reuse DOM nodes if types are different but structures are similar?  
A4: No, if the type changes, React replaces the entire subtree.

Q5: How does reconciliation differ in React Fiber?  
A5: React Fiber (since React 16) breaks reconciliation into small units of work 
     allowing interruption for better responsiveness (time slicing).
*/
