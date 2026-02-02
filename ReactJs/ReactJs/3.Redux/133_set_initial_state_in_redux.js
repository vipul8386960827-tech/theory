/* 133_set_initial_state_in_redux.js */

/*
=====================================
Set Initial State in Redux
=====================================

Definition:
In Redux, the initial state is the default state of the store before any actions 
have been dispatched. It defines the starting values for the store’s state tree.

-------------------------------------
Ways to Set Initial State:
-------------------------------------

1. **Within Reducer**
   - Provide a default value to the state parameter of the reducer.

Example:
-------------------------------------
const initialState = {
  count: 0,
  todos: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    default:
      return state;
  }
}

-------------------------------------
2. **When Creating Store**
   - `createStore` accepts a second argument to set the preloaded state.

Example:
-------------------------------------
import { createStore } from "redux";
import rootReducer from "./reducers";

const preloadedState = {
  count: 10,
  todos: ["Learn Redux"]
};

const store = createStore(rootReducer, preloadedState);

-------------------------------------
Notes:
-------------------------------------
- **Reducer Default vs Preloaded State**: 
  - Default state in reducer is used if no preloaded state is provided.
  - Preloaded state overrides reducer default state.

- **Consistency**:
  - Ensure initial state structure matches reducer expectations to prevent runtime errors.

-------------------------------------
Analogy:
-------------------------------------
- Initial state is like **factory starting inventory**:
  - Before any production or sales (actions), you have a starting stock (initial state).

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you change the initial state after store creation?  
A1: No, you can only change state via dispatching actions.

Q2: What happens if the reducer does not provide a default state?  
A2: Redux will initialize the state as undefined, which may cause errors.

Q3: Can preloaded state be fetched from localStorage?  
A3: Yes, you can load initial state from persistent storage when creating the store.

Q4: How does initial state affect server-side rendering?  
A4: Preloaded state can be used to hydrate the store on the client side with server state.
*/
