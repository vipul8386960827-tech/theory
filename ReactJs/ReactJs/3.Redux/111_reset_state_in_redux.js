/* 111_reset_state_in_redux.js */

/*
=====================================
Reset State in Redux
=====================================

Definition:
Resetting state in Redux means bringing the store back to its initial state.  
This is useful in scenarios like:
- Logging out a user (clear all data).
- Resetting a form after submission.
- Refreshing the app without reloading.

-------------------------------------
Ways to Reset State in Redux:
-------------------------------------

1. **Root Reducer Reset**
   - Add a condition in the root reducer that listens for a specific reset action.
   - When dispatched, it returns the initial state for the whole store.

   Example:
   const appReducer = combineReducers({ user, posts, settings });

   const rootReducer = (state, action) => {
     if (action.type === "RESET_STATE") {
       state = undefined; // resets to initial state
     }
     return appReducer(state, action);
   };

   export default rootReducer;

2. **Reducer-Specific Reset**
   - Each reducer handles a reset action individually.
   - Only resets its own slice of state.

   Example:
   function userReducer(state = initialUserState, action) {
     switch (action.type) {
       case "RESET_USER":
         return initialUserState;
       default:
         return state;
     }
   }

3. **Using Middleware**
   - Middleware can intercept a reset action and clear the state.
   - Rarely used but possible in large apps.

-------------------------------------
Best Practice:
-------------------------------------
- Prefer handling reset at the **root reducer level** if you want a global reset.
- Use reducer-specific resets if only a particular slice needs clearing.

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Imagine your app state is like a **whiteboard**.
- Resetting state means erasing everything and starting fresh.
- Sometimes you erase the whole board (root reset), other times just one section (slice reset).

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why use `state = undefined` in the root reducer for reset?  
A1: Because Redux reducers return the initial state when state is `undefined`.

Q2: Can you reset only part of the Redux state?  
A2: Yes, by handling a reset action inside a specific reducer.

Q3: When would you avoid a full reset?  
A3: When some state (like theme or language preference) should persist after logout.

Q4: How would you persist state after reset (e.g., keep auth token)?  
A4: By combining Redux with libraries like `redux-persist` and whitelisting/blacklisting keys.  
*/
