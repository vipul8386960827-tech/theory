/* 115_keep_all_component_states_in_redux_store.js */
/* 115_keep_all_component_states_in_redux_store.js */

/*
=====================================
Should All Component States Be Kept in Redux Store?
=====================================

Definition:
In Redux, we manage the **global application state** inside a centralized store.  
But not every piece of state needs to live in Redux—some states can remain local 
to a component.

-------------------------------------
Why Not Keep All States in Redux:
-------------------------------------

1. **Unnecessary Complexity**
   - Storing small UI states (e.g., toggling a modal, input field values) in Redux 
     adds boilerplate (actions, reducers) without real benefit.

2. **Performance Concerns**
   - Redux store updates trigger re-renders in connected components.  
   - Keeping too many small local states in Redux can cause avoidable re-renders.

3. **Loss of Component Encapsulation**
   - Components lose their self-contained nature if every small piece of state is global.  
   - Example: A dropdown open/close toggle does not need to be in Redux.

4. **Boilerplate Explosion**
   - More reducers, more action types, and more dispatch calls for trivial states.

5. **Maintainability**
   - Large apps become harder to maintain if trivial UI states clutter the Redux store.

-------------------------------------
When to Use Redux for State:
-------------------------------------
- **Global / Shared State**:
  - Authentication status
  - User preferences (theme, language)
  - Cart data in an e-commerce app
  - Notifications

- **Local Component State (keep out of Redux)**:
  - Form inputs (until submission)
  - Toggle buttons (open/close modal, dropdowns)
  - Temporary UI states (loading spinners, hover states)

-------------------------------------
Best Practice:
-------------------------------------
- Use **Redux for global, shared, persistent state**.
- Use **React local state (useState/useReducer)** for transient or UI-only state.

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Redux store = **Government record office** (keeps official permanent data like ID, 
  passport, licenses).
- Local component state = **Post-it notes on your desk** (temporary, only relevant to you).
- Keeping all notes in government records would be inefficient and unnecessary.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: What problems occur if we keep all component state in Redux?  
A1: Increased boilerplate, performance issues, reduced encapsulation, poor maintainability.

Q2: How to decide whether a state belongs in Redux or local state?  
A2: Ask if the state is shared across multiple components or needs to persist globally.  
    If yes → Redux. If no → Local.

Q3: Can we migrate local state to Redux later if needed?  
A3: Yes, states can start local and be lifted to Redux when multiple components 
    require them.

Q4: What tools help reduce Redux boilerplate?  
A4: Redux Toolkit simplifies actions, reducers, and store setup.
*/

