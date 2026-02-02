/* 224_typical_middleware_for_async_calls_in_redux.js

=====================================
Typical Middleware for Async Calls in Redux
=====================================

Definition:
In Redux, **middleware** allows intercepting actions before they reach reducers.  
For handling asynchronous operations (like API calls), middleware like **Redux Thunk** 
or **Redux Saga** is commonly used to manage side effects while keeping reducers pure.

-------------------------------------
Key Points:
-------------------------------------
1. **Redux Thunk**: Allows dispatching functions (thunks) that can perform async logic 
   and then dispatch regular actions.  
2. **Redux Saga**: Uses generator functions to handle side effects and async flows.  
3. Middleware keeps reducers **pure** and free from side effects.  
4. Other middlewares: `redux-promise`, `redux-observable`.  

-------------------------------------
Guidelines:
-------------------------------------
- Always keep reducers pure; never perform async operations inside them.  
- Use middleware for API calls, logging, and complex side-effect handling.  
- Choose middleware depending on project needs: simple async → Thunk, complex flows → Saga.  

-------------------------------------
Example (Redux Thunk):
-------------------------------------
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Action creator returning a thunk
const fetchData = () => {
  return async (dispatch) => {
    dispatch({ type: "FETCH_START" });
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error });
    }
  };
};

const reducer = (state = { data: [], loading: false, error: null }, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));

store.dispatch(fetchData());

-------------------------------------
Analogy:
-------------------------------------
- Middleware = **security checkpoint**  
- Actions = **people**  
- Reducer = **safe room**  
- Async calls handled by middleware before reaching the safe room ensures the room stays predictable and organized.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why not call APIs inside reducers?  
A1: Reducers must be pure functions; async calls introduce side effects and unpredictability.

Q2: Difference between Redux Thunk and Redux Saga?  
A2: Thunk uses functions for async dispatch, Saga uses generator functions for complex flows.

Q3: Can multiple middlewares be combined?  
A3: Yes, using `applyMiddleware(middleware1, middleware2)`.

Q4: Can middleware access the Redux store?  
A4: Yes, middleware receives `{ getState, dispatch }` to interact with the store.
*/
