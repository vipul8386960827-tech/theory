/* 36_setstate_vs_replacestate.js

=====================================
setState() vs replaceState() in React
=====================================

Definition:
In React class components, `setState()` is used to update part of the component's 
state, while `replaceState()` (legacy) was used to completely replace the state object. 
Modern React does not use `replaceState()`; `setState()` is preferred.

-------------------------------------
Key Points:
-------------------------------------

1. setState()
   - Merges the new state with existing state.
   - Can be asynchronous.
   - Example:
       this.setState({ count: this.state.count + 1 });
   - Only updates the specified keys, preserving other state properties.

2. replaceState()
   - Completely replaces the state object with a new one.
   - Deprecated and rarely used.
   - Example (legacy):
       this.replaceState({ count: 0 });
   - Removes all other state properties not included in the new state.

3. Modern Recommendation
   - Always use `setState()` for updating state.
   - Avoid `replaceState()`; it is not part of current React versions.

-------------------------------------
Analogy:
-------------------------------------
- setState() = updating a single page in your notebook without erasing other pages.
- replaceState() = tearing out the entire notebook and writing a new page (deprecated).

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can setState be used with functions?  
A1: Yes, you can pass a function to setState to safely compute new state based on previous state.

Q2: Why was replaceState deprecated?  
A2: Because merging state is safer, reduces bugs, and avoids accidental loss of state.

Q3: Is setState synchronous?  
A3: No, it is asynchronous; React may batch multiple updates.

Q4: How do you update multiple state properties at once?  
A4: Pass an object with multiple keys to setState, e.g., this.setState({ a: 1, b: 2 }).
*/
