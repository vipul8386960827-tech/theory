/* 264_guidelines_for_writing_reducers.js */

/*
=====================================
Guidelines for Writing Reducers in Redux
=====================================

Definition:
A **reducer** is a pure function that takes the current state and an action, 
and returns a new state. It determines how the state changes in response to 
actions dispatched to the store.

-------------------------------------
Key Guidelines:
-------------------------------------

1. **Pure Function**
   - Reducers must be pure: given the same inputs, they always return the same output.
   - No side effects (e.g., API calls, random number generation, mutations).

2. **Do Not Mutate State**
   - Always return a new state object.
   - Use spread operator (`...`) or functions like `concat`, `slice` to avoid mutation.

3. **Handle Unknown Actions**
   - Always return the current state for unrecognized action types.
   - Ensures compatibility with other reducers.

4. **Initial State**
   - Provide a default value for state parameter.
   - Example: `state = initialState` in the reducer function.

5. **Single Responsibility**
   - Each reducer should manage only a slice of the state.
   - Combine reducers using `combineReducers` for larger apps.

6. **Avoid Side Effects**
   - Do not perform async operations inside reducers.
   - Side effects should be handled by middleware (e.g., Redux Thunk or Saga).

7. **Use Constants for Action Types**
   - Prevents typos and makes code easier to maintain.
   - Example: `const INCREMENT = "INCREMENT";`

-------------------------------------
Example:
-------------------------------------
const initialState = { count: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    default:
      return state; // Unknown actions
  }
}

-------------------------------------
Analogy:
-------------------------------------
- Reducer = **recipe book**:
  - Inputs: ingredients (state + action).
  - Output: dish (new state).
  - Recipe does not perform unrelated tasks (side effects) and is repeatable.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you make async calls inside reducers?  
A1: No, reducers must be pure; use middleware like Thunk or Saga for async logic.

Q2: Why should reducers not mutate state?  
A2: Mutation breaks Redux's predictable state principle and can cause rendering issues.

Q3: How do you manage multiple slices of state?  
A3: Use multiple reducers for different slices and combine them with `combineReducers`.

Q4: What happens if a reducer returns undefined?  
A4: Redux will throw an error; always return a valid state.
*/
