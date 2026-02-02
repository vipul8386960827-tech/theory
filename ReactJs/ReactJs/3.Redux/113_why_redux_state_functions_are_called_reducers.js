/* 113_why_redux_state_functions_are_called_reducers.js */

/*
=====================================
Why Redux State Functions Are Called Reducers
=====================================

Definition:
In Redux, the functions that manage state updates are called **reducers**.  
They take the current state and an action, then return a new state.

Syntax:
   (previousState, action) => newState

-------------------------------------
Reason for the Term "Reducer":
-------------------------------------
1. Borrowed from Functional Programming
   - The term comes from the `Array.prototype.reduce()` method in JavaScript.
   - Just like `reduce()` accumulates values into a single result,
     Redux reducers accumulate actions into a single state object.

2. Pure Function Behavior
   - A reducer is a pure function that:
     - Takes in state + action.
     - Returns a new state without mutating the original.
   - Similar to how reduce callbacks return an accumulated result.

3. Predictable State Transition
   - Reducers "reduce" many dispatched actions into a predictable final state.
   - They serve as the accumulator of the app’s state over time.

-------------------------------------
Example:
-------------------------------------
const reducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

const actions = [{ type: "INCREMENT" }, { type: "INCREMENT" }, { type: "DECREMENT" }];

// Using reducer like Array.reduce()
const finalState = actions.reduce(reducer, 0);
// finalState = 1

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Think of reducers like **a cashier in a shop**:
  - Customers (actions) come with requests (buy/sell).
  - The cashier (reducer) looks at the current total (state).
  - Updates it accordingly and gives back the new balance.
  - At the end of the day, the cashier "reduces" all transactions into the final balance.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why must reducers be pure functions?  
A1: To ensure predictability, easy testing, and avoid hidden side effects.

Q2: How is a Redux reducer similar to Array.reduce()?  
A2: Both accumulate input (actions or array items) into a single final result (state or value).

Q3: What happens if a reducer returns `undefined`?  
A3: Redux throws an error; reducers must always return a valid state.

Q4: Can reducers handle async operations?  
A4: No, reducers must remain pure. Async logic should be handled in middleware.  
*/
