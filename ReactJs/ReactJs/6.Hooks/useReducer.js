/*
========================================
Question: Explain useReducer Hook in Detail
========================================

1. Definition:
- useReducer is a React Hook used for managing **complex state logic** 
  in functional components.  
- It is an alternative to useState when state depends on previous 
  values or has multiple sub-values.  
- Inspired by Redux pattern with actions and reducers.

------------------------------------------------------------
2. Key Points to Highlight:
- Accepts a **reducer function** and **initial state**.  
- Returns a **state** and **dispatch function**.  
- State updates are centralized in the reducer function.  
- Supports complex state transitions and makes logic predictable.  
- Useful for forms, counters, or when multiple state variables 
  are interconnected.

------------------------------------------------------------
3. Syntax:
const [state, dispatch] = useReducer(reducer, initialState);

- reducer → function (state, action) => newState  
- initialState → starting state value  
- dispatch → function used to send actions to the reducer  

------------------------------------------------------------
4. Example:

import React, { useReducer } from "react";

// 1. Reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

function Counter() {
  // 2. useReducer with initial state
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>
        Increment
      </button>
      <button onClick={() => dispatch({ type: "decrement" })}>
        Decrement
      </button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}

export default Counter;

------------------------------------------------------------
5. Behavior Explanation:
- dispatch({ type: "actionType" }) triggers the reducer.  
- Reducer returns a new state object, which causes re-render.  
- Functional updates are centralized, making state transitions easier to test.  
- Multiple useReducer hooks can be used in a single component 
  for different state slices.

------------------------------------------------------------
6. Follow-Up Interview Questions:
Q1: When should you prefer useReducer over useState?  
A1: For complex state with multiple sub-values or when the next 
    state depends on the previous one.

Q2: Can useReducer work with async actions?  
A2: Not directly; async actions should be handled outside, 
    or by using middleware patterns like Redux Thunk.

Q3: How does useReducer help in predictable state updates?  
A3: All state updates go through the reducer function, 
    so you can track and test all transitions.

Q4: Can you combine useReducer with useContext?  
A4: Yes, common pattern: put dispatch/state in context 
    to share across multiple components.
*/
