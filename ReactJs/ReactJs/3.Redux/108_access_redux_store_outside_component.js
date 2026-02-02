/* 108_access_redux_store_outside_component.js */

/*
=====================================
Accessing Redux Store Outside React Components
=====================================

Definition:
Normally, React components access Redux state and dispatch actions using
`useSelector` and `useDispatch` hooks.  
But sometimes we need to access the store **outside React components**, 
such as in:
- Utility functions
- API services
- Event listeners
- Non-React modules

-------------------------------------
Key Points to Highlight:
-------------------------------------
1. The Redux store is a plain JavaScript object created by `createStore` (or `configureStore` in Redux Toolkit).
2. Since it’s just an object, you can **import the store directly** wherever needed.
3. You can use:
   - `store.getState()` → read current state
   - `store.dispatch(action)` → dispatch actions outside React
   - `store.subscribe(listener)` → listen for state changes
4. Best practice: Limit this usage.  
   Components should use hooks (`useSelector`, `useDispatch`).  
   Direct store usage is for edge cases like service files or middleware.

-------------------------------------
Example: Creating a Store
-------------------------------------
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;

-------------------------------------
Example: Accessing Store Outside Component
-------------------------------------
import store from "./store";

// Read state
console.log("Current state:", store.getState());

// Dispatch action
store.dispatch({ type: "counter/increment" });

// Subscribe to changes
store.subscribe(() => {
  console.log("Updated state:", store.getState());
});

-------------------------------------
Correct Usage Scenario:
-------------------------------------
- Logging services (e.g., send logs when state updates).
- Non-React utilities (e.g., save token from state to localStorage).
- API interceptors (e.g., attach token from Redux state to request headers).

-------------------------------------
Incorrect Usage Scenario:
-------------------------------------
❌ Using `store.getState()` everywhere instead of `useSelector`.
This breaks React’s rendering flow and makes UI unpredictable.

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Think of Redux store as a **government record office**.  
- Normally, citizens (components) use official channels (hooks) to get data.  
- Sometimes, journalists or auditors (services, utilities) directly check records.  
- But if everyone bypasses the system, chaos happens.  

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: When is it acceptable to access the store outside a component?  
A1: For API services, logging, and middleware—but not for rendering logic.  

Q2: What are the risks of using store directly?  
A2: It bypasses React-Redux’s subscription system, causing stale or unsynced UI.  

Q3: How does `useSelector` differ from `store.getState()`?  
A3: `useSelector` subscribes the component to updates, re-rendering when needed, 
    while `store.getState()` just reads once.  

Q4: Can middleware access the store directly?  
A4: Yes, middleware receives `{ getState, dispatch }` as arguments.  
*/
