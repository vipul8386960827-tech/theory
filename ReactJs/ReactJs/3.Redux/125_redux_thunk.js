/* 125_redux_thunk.js */

/*
=====================================
Redux Thunk
=====================================

Definition:
Redux Thunk is a middleware for Redux that allows you to write action creators 
that return a **function** instead of an action object. This function receives 
`dispatch` and `getState` as arguments, enabling async logic and side effects 
before dispatching a standard action.

-------------------------------------
Core Concepts:
-------------------------------------

1. **Thunk Function**
   - A function returned by an action creator.
   - Can contain async calls, conditional dispatch, or any side effect.

2. **dispatch**
   - Used to send actions to the Redux store.

3. **getState**
   - Allows access to current Redux state inside the thunk.

-------------------------------------
Why Use Redux Thunk:
-------------------------------------
- Handle asynchronous operations like API calls.
- Delay dispatching actions until a condition is met.
- Access current state before dispatching actions.
- Simpler alternative to more complex middleware like Redux Saga for basic async flows.

-------------------------------------
Basic Example:
-------------------------------------
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { fetchUserSuccess, fetchUserFailure } from "./actions";
import api from "../api";
import rootReducer from "./reducers";

const store = createStore(rootReducer, applyMiddleware(thunk));

// Async action creator (thunk)
export const fetchUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      const user = await api.fetchUser(userId); // async API call
      dispatch(fetchUserSuccess(user));         // dispatch success action
    } catch (error) {
      dispatch(fetchUserFailure(error.message)); // dispatch failure action
    }
  };
};

// Dispatch thunk
store.dispatch(fetchUser(1));

-------------------------------------
Analogy:
-------------------------------------
- Redux Thunk is like a **personal assistant**:
  - You (component) request something.
  - Assistant (thunk) performs steps behind the scenes (API calls, validation).
  - Finally, assistant updates the result (dispatch action) in the main system (Redux store).

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: How is Redux Thunk different from Redux Saga?  
A1: Thunk uses functions for async logic; Saga uses generator functions and effects, better for complex async flows.

Q2: Can thunks access Redux state?  
A2: Yes, using `getState()`.

Q3: Can thunks dispatch multiple actions?  
A3: Yes, they can dispatch any number of actions sequentially or conditionally.

Q4: Is Redux Thunk mandatory for async actions?  
A4: No, it’s one of several middleware options; others include Redux Saga, RTK Query, or custom middleware.
*/
