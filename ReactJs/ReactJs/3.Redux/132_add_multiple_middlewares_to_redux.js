/* 132_add_multiple_middlewares_to_redux.js */

/*
=====================================
Add Multiple Middlewares to Redux
=====================================

Definition:
Redux middleware is a way to extend Redux with custom logic between dispatching 
an action and the moment it reaches the reducer. Multiple middleware can be 
added in a specific order to handle async actions, logging, error handling, etc.

-------------------------------------
Steps to Add Multiple Middleware:
-------------------------------------

1. **Import Required Middleware**
   - Example: redux-thunk for async actions, logger for logging actions.

2. **Apply Middleware**
   - Use `applyMiddleware` from Redux when creating the store.
   - Middleware are applied in the order they are listed.

3. **Create Store**
   - Pass the root reducer and applied middleware to `createStore`.

-------------------------------------
Example:
-------------------------------------
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./reducers";

// Apply multiple middleware
const middleware = [thunk, logger];

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware)
);

export default store;

-------------------------------------
Notes:
-------------------------------------
- **Order Matters**: Middleware runs in the order they are applied.
  - Example: logger after thunk ensures async actions are logged properly.
- **Custom Middleware**: You can write your own middleware for custom logic.
- **Composability**: Redux DevTools can be integrated along with middleware using compose.

-------------------------------------
Analogy:
-------------------------------------
- Middleware is like **security checkpoints in an airport**:
  - Passengers (actions) go through multiple checkpoints (middleware) before reaching 
    the gate (reducer).
  - Each checkpoint can inspect, modify, delay, or log the passenger.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you add middleware after the store is created?  
A1: No, middleware must be applied during store creation.

Q2: Why is order of middleware important?  
A2: Middleware executes sequentially; incorrect order may break async flow or logging.

Q3: Can middleware dispatch actions?  
A3: Yes, middleware can dispatch actions using `dispatch` function.

Q4: How do you integrate Redux DevTools with multiple middleware?  
A4: Use `composeWithDevTools(applyMiddleware(...middleware))` from redux-devtools-extension.
*/
