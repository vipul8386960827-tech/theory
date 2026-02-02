/* 127_redux_devtools.js */

/*
=====================================
Redux DevTools
=====================================

Definition:
Redux DevTools is a browser extension and library that helps developers 
inspect Redux state, actions, and store changes in real-time, improving 
debugging, testing, and development workflow.

-------------------------------------
Key Features:
-------------------------------------
1. **Action Logging**
   - Tracks all actions dispatched to the Redux store.

2. **State Inspection**
   - View the entire store state at any point in time.

3. **Time Travel Debugging**
   - Move forward and backward in dispatched actions to see state changes.

4. **Action Replay**
   - Replay a series of actions to reproduce bugs or test flows.

5. **Integration with Middleware**
   - Works with Redux Thunk, Redux Saga, and other middleware seamlessly.

-------------------------------------
Setup Example:
-------------------------------------
import { createStore } from "redux";
import rootReducer from "./reducers";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

-------------------------------------
Best Practices:
-------------------------------------
- Use Redux DevTools only in development; avoid enabling in production.
- Combine with middleware like thunk or saga for more comprehensive debugging.
- Use DevTools to track performance bottlenecks in state updates.

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Redux DevTools is like a **black box in an airplane**:
  - Records every action (event) and the current state.
  - Developers can rewind and replay the flight to find issues.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can Redux DevTools work with React Redux hooks?  
A1: Yes, it works with both connect HOC and hooks like useSelector/useDispatch.

Q2: How is time-travel debugging implemented?  
A2: DevTools stores a history of state changes and allows navigating through them.

Q3: Is Redux DevTools safe to use in production?  
A3: Not recommended, as it exposes the store and actions to the browser.

Q4: Can Redux DevTools inspect middleware effects?  
A4: Yes, combined with logging middleware, you can see actions processed by saga or thunk.
*/
