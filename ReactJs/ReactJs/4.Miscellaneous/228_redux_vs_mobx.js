/* 228_redux_vs_mobx.js

=====================================
Redux vs MobX
=====================================

Definition:
Both **Redux** and **MobX** are state management libraries for React, but they follow 
different philosophies.  
- **Redux**: Predictable, centralized, and uses immutable state with pure reducers.  
- **MobX**: Reactive, uses observable state, actions, and computed values for automatic updates.

-------------------------------------
Key Points:
-------------------------------------
1. **State Management Approach**:  
   - Redux: Single immutable store, unidirectional data flow.  
   - MobX: Multiple observable objects, reactive updates.  

2. **Boilerplate**:  
   - Redux: Requires actions, reducers, and middleware (more boilerplate).  
   - MobX: Minimal boilerplate; state changes auto-reflect in UI.  

3. **Immutability**:  
   - Redux: State is immutable; updates via pure reducers.  
   - MobX: State is mutable; actions update observables directly.  

4. **Debugging & Tooling**:  
   - Redux: Excellent DevTools support (time-travel, logging).  
   - MobX: DevTools exist but less mature than Redux.  

5. **Learning Curve**:  
   - Redux: Steeper, requires understanding actions, reducers, middleware.  
   - MobX: Easier, more intuitive for smaller to medium apps.  

-------------------------------------
Guidelines:
-------------------------------------
- Use **Redux** for large apps requiring strict predictability, middleware, and time-travel debugging.  
- Use **MobX** for smaller/medium apps where less boilerplate and reactive programming is preferred.  

-------------------------------------
Example (Comparison):
-------------------------------------
// Redux
store.dispatch({ type: "INCREMENT" });
const newState = reducer(state, action); // pure function updates state

// MobX
store.increment(); // directly modifies observable state; UI auto-updates

-------------------------------------
Analogy:
-------------------------------------
- Redux = **company headquarters with strict rules**  
  - Every decision (state change) goes through formal channels (actions → reducers).  
- MobX = **open workspace**  
  - Employees (components) react immediately to changes in shared resources (observables).

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Which is better for small projects?  
A1: MobX, due to less boilerplate and easier reactive state management.  

Q2: Can you use Redux and MobX together?  
A2: Technically yes, but usually unnecessary and adds complexity.  

Q3: How do they differ in handling async operations?  
A3: Redux uses middleware (Thunk, Saga); MobX uses actions with async functions.  

Q4: Which has a more predictable state flow?  
A4: Redux, because state changes only via pure reducers in a single store.
*/
