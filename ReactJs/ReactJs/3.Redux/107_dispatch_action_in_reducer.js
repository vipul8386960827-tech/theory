/* 107_dispatch_action_in_reducer.js */

/*
=====================================
Dispatching Actions in Reducer (Redux)
=====================================

Definition:
In Redux, reducers are **pure functions**.  
They only take the current state and an action, 
and return the next state.  
Reducers **cannot dispatch actions** because that introduces side effects 
and breaks Redux’s core principles.

-------------------------------------
Why Reducers Cannot Dispatch Actions:
-------------------------------------
1. **Purity Rule**:
   - Reducers must be deterministic: same input → same output.
   - Dispatching an action is a side effect, which breaks purity.

2. **Infinite Loops**:
   - If a reducer dispatches, the new action is sent back into the same reducer.
   - This creates an endless cycle: `dispatch → reducer → dispatch → reducer ...`.

3. **Single Responsibility Principle**:
   - Reducers are only for calculating the next state.
   - Dispatching belongs to components or middleware.

4. **Debugging and Predictability**:
   - Redux dev tools rely on reducers being predictable.
   - If reducers dispatch, the state trace becomes chaotic and unreliable.

-------------------------------------
Correct Way Example:
-------------------------------------
✔️ In component:
import { useDispatch } from "react-redux";

function FetchButton() {
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch({ type: "FETCH_DATA" })}>
      Fetch
    </button>
  );
}

✔️ In reducer (pure):
function dataReducer(state = { loading: false }, action) {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, loading: true }; // ✅ state update only
    default:
      return state;
  }
}

-------------------------------------
Incorrect Example (What Not to Do):
-------------------------------------
function badReducer(state, action) {
  switch (action.type) {
    case "BAD_ACTION":
      dispatch({ type: "ANOTHER_ACTION" }); // ❌ illegal
      return state;
    default:
      return state;
  }
}
// This creates infinite recursion and breaks Redux.

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Imagine a **judge (reducer)**.  
- A judge can only interpret the law (update state).  
- They cannot create new laws (dispatch actions).  
- Only the **government (components or middleware)** can propose new laws.  

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why must reducers be pure?  
A1: To ensure predictability, testability, and enable features like time-travel debugging.  

Q2: If reducers can’t dispatch, where should async operations be handled?  
A2: In middleware (like `redux-thunk` or `redux-saga`) or in components before dispatch.  

Q3: What happens if you dispatch inside a reducer?  
A3: It triggers recursive reducer calls → infinite loops → app crash.  

Q4: Can reducers call APIs?  
A4: No. API calls are side effects and must be done outside reducers.  
*/
