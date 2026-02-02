/* 104_core_principles_of_redux.js */
/*
=====================================
Core Principles of Redux
=====================================

Definition:
Redux is built on **three fundamental principles** that make state 
management predictable and maintainable.

-------------------------------------
1. Single Source of Truth
-------------------------------------
- The entire application state is stored in a **single store** as a 
  single JavaScript object.  
- This ensures all parts of the app use the same source of data.  
- Easy to debug and manage since the state exists in one place.  

Example:
State = {
  user: { name: "Rahul", loggedIn: true },
  cart: [{ id: 1, name: "Laptop" }]
}

-------------------------------------
2. State is Read-Only
-------------------------------------
- The only way to change state is by **dispatching an action**.  
- An action is a plain object describing what happened (must have a `type`).  
- Components cannot directly modify the state.  

Example:
{ type: "ADD_ITEM", payload: { id: 2, name: "Phone" } }

-------------------------------------
3. Changes are Made with Pure Functions
-------------------------------------
- To specify how the state changes, we write **reducers**.  
- A reducer is a pure function:  
  (previousState, action) → newState.  
- Pure functions ensure predictability and testability.  

Example:
function cartReducer(state = [], action) {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    default:
      return state;
  }
}

-------------------------------------
Real-Life Analogy (India-specific):
-------------------------------------
Imagine a **bank account system**:
1. All customer balances are kept in **one central database** 
   (Single source of truth).  
2. Customers cannot directly change balances; they must submit 
   a **transaction request** like deposit/withdrawal (State is read-only).  
3. The bank’s processing system applies predefined **rules** to update 
   balances (Pure functions / Reducers).  

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why is having a single store better than multiple stores?
A1: Easier to manage, debug, and ensures consistency across the app.  

Q2: What happens if we directly mutate state in Redux?
A2: Predictability is lost, UI may not update correctly, and debugging 
    becomes very difficult.  

Q3: Why must reducers be pure functions?
A3: Pure functions make state predictable, testable, and enable features 
    like time-travel debugging.  

Q4: Can Redux work with async operations if reducers are pure?
A4: Yes, async logic is handled by middleware (like redux-thunk or redux-saga), 
    not inside reducers.  
*/
