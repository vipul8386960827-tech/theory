/* 78_solve_performance_issues_with_context.js

=====================================================
Solving Performance Issues with React Context
=====================================================

Definition:
React Context provides a way to pass data through the component tree without manually passing props at every level.  
However, every context value change triggers a re-render for all consuming components, which can cause performance issues in large applications.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Context updates re-render all components consuming it, even if they only use a small part of the value.
2. Frequent updates to context (like counters or lists) can degrade performance.
3. Optimizations can reduce unnecessary renders while still using context.

-----------------------------------------------------
Solutions / Best Practices:
-----------------------------------------------------
1. Split Contexts
   - Create multiple contexts for different pieces of state.
   - Prevents unrelated components from re-rendering.

2. Memoize Context Value
   - Use useMemo to prevent new object references on every render.
   Example:
     const contextValue = useMemo(() => ({ user, theme }), [user, theme]);

3. Use Context Selector Libraries
   - Libraries like use-context-selector allow components to subscribe to specific parts of context.

4. Move Frequently Updated State to Local State
   - Keep rapidly changing data (like input or animation state) in local component state instead of context.

-----------------------------------------------------
Example:
-----------------------------------------------------
import React, { createContext, useContext, useState, useMemo } from "react";

const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ name: "Alice", age: 25 });

  const memoUser = useMemo(() => user, [user]); // Memoize context value

  return (
    <UserContext.Provider value={memoUser}>
      <Profile />
    </UserContext.Provider>
  );
}

function Profile() {
  const user = useContext(UserContext);
  return <h2>{user.name}</h2>;
}

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Context = public bulletin board in an office.  
- Without memoization, every update makes all employees read it again.  
- Memoization / splitting = employees only read relevant sections, improving efficiency.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why does context re-render all consumers on value change?  
A1: Because context propagates by reference, and any new object reference triggers re-renders.

Q2: Can we avoid using context for performance-critical state?  
A2: Yes, keep frequently updated state local and only share stable data through context.

Q3: What is useMemo doing in context optimization?  
A3: It ensures the context value object reference does not change unless dependencies change.

Q4: Are there libraries to optimize context usage?  
A4: Yes, use-context-selector or Redux-like solutions for selective subscriptions.
*/
