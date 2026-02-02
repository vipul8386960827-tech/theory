/* 155_redux_only_with_react.js */

/*
=====================================
Using Redux Only with React
=====================================

Definition:
Redux can be used as a **state management library** independently of React. 
However, in React apps, it is commonly integrated using **react-redux** to 
connect components to the Redux store.

-------------------------------------
Key Points:
-------------------------------------

1. **Redux Core**
   - Provides a single **store** as the source of truth.
   - State updates happen via **actions** and **reducers**.
   - Works independently of UI frameworks.

2. **Integration with React**
   - `react-redux` provides bindings (`Provider`, `connect`, `useSelector`, `useDispatch`) 
     to connect React components with Redux.
   - Without `react-redux`, you can still manually subscribe to the store and call `setState` in components.

3. **Why Use Redux Only**
   - Can manage global state in plain JavaScript apps without React.
   - Useful when you want a centralized state even outside a UI framework.

-------------------------------------
Example: Redux Without React
-------------------------------------
import { createStore } from "redux";

// Reducer
function counterReducer(state = { count: 0 }, action) {
  switch(action.type) {
    case "INCREMENT": return { count: state.count + 1 };
    case "DECREMENT": return { count: state.count - 1 };
    default: return state;
  }
}

// Create Store
const store = createStore(counterReducer);

// Subscribe to store
store.subscribe(() => console.log("State:", store.getState()));

// Dispatch actions
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });

-------------------------------------
Notes:
-------------------------------------
- Redux is **UI-agnostic**; works with React, Vue, Angular, or plain JS.
- Using Redux in React is easier with **react-redux**, but not mandatory.
- Manual subscription in React without `react-redux` is possible but verbose.

-------------------------------------
Analogy:
-------------------------------------
- Redux store = **central library**:
  - Actions = borrowing or returning books.
  - Reducers = librarians updating the records.
  - Any UI framework can read from the library; React is just one of them.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you use Redux without React?  
A1: Yes, Redux is independent of UI frameworks.

Q2: What is the role of react-redux?  
A2: Provides convenient bindings to connect React components with Redux store.

Q3: Can you manually integrate Redux with React without react-redux?  
A3: Yes, by subscribing to the store and calling setState in components.

Q4: When would you avoid using react-redux?  
A4: In small apps or when using plain JavaScript without React.
*/
