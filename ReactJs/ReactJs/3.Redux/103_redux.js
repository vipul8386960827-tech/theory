/*
=====================================
Redux in React
=====================================

Definition:
Redux is a predictable state management library for JavaScript 
applications.  
It was inspired by the Flux architecture but simplified it by using:
- A **single store** for the entire application.  
- **Reducers** as pure functions to update state.  
- A strict **unidirectional data flow**.

-------------------------------------
Key Points to Highlight:
-------------------------------------
1. **Single Source of Truth** → the entire application state is stored 
   in a single object tree inside one store.  
2. **State is Read-Only** → the only way to change state is to 
   dispatch an action.  
3. **Changes are Made with Pure Functions** → reducers specify 
   how the state changes in response to actions.  
4. Predictable → same input (state + action) always gives the same output.  
5. Easy to Debug → because of tools like Redux DevTools.  
6. Works with any UI layer (not React specific, but commonly used with React).  

-------------------------------------
Real-Life Analogy:
-------------------------------------
Think of **an Indian government office filing system**:  
- There’s **one central register** (Redux store) where all records are kept.  
- If you want to update a record, you must **submit an application** (action).  
- A **clerk** (reducer) checks your request and updates the register accordingly.  
- Anyone who needs info refers back to the same central register.  
This ensures consistency and avoids duplication.

-------------------------------------
Data Flow in Redux:
-------------------------------------
1. Component dispatches an **action** (plain object with a type).  
2. **Reducers** take the current state and action, return a new state.  
3. **Store** updates the state.  
4. Components subscribed to the store get the updated state.  

-------------------------------------
Example (Pseudo-code in comments):
-------------------------------------

// Action
const increment = { type: "INCREMENT" };

// Reducer
function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    default:
      return state;
  }
}

// Store
import { createStore } from "redux";
const store = createStore(counterReducer);

// Dispatch
store.dispatch(increment);

// Get state
console.log(store.getState()); // { count: 1 }

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: What are the main principles of Redux?
A1: Single source of truth, state is read-only, changes made with pure functions.  

Q2: How is Redux different from Flux?
A2: Flux has multiple stores + dispatcher, Redux has one store and no dispatcher.  

Q3: What are the benefits of using Redux?
A3: Predictability, easier debugging, time-travel debugging, testability.  

Q4: When should you avoid Redux?
A4: For small apps or when React's Context + useReducer is enough, 
    Redux may add unnecessary complexity.  

Q5: Can Redux be used without React?
A5: Yes, Redux is a standalone JS library and can be used with Angular, Vue, or plain JS.
*/
