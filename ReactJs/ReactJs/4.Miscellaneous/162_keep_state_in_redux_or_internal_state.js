/* 162_keep_state_in_redux_or_internal_state.js

=====================================
Keep State in Redux or Internal Component State
=====================================

Definition:
In React, state can be stored either in **internal component state** (`useState` / `this.state`) 
or in **Redux store** for global state management. Choosing where to store state depends 
on the scope, usage, and complexity of the state.

-------------------------------------
Key Points:
-------------------------------------

1. Internal Component State:
   - Managed via `useState` (functional) or `this.state` (class).
   - Best for **local UI state** like toggles, form inputs, modals, or hover effects.
   - Isolated to a component, does not require boilerplate.

2. Redux Store:
   - Centralized global store for application-wide state.
   - Useful for state shared across multiple components.
   - Enables predictable state changes, time-travel debugging, and middleware handling.

-------------------------------------
Guidelines:
-------------------------------------
- Use **internal state** for:
  - Temporary UI states.
  - Form input values (unless complex and shared).
  - Component visibility, animations, toggles.

- Use **Redux** for:
  - Data needed by multiple components (e.g., user auth, shopping cart).
  - Persisted state across routes or sessions.
  - Complex state logic requiring middleware (thunks, sagas).

-------------------------------------
Example:
-------------------------------------
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "./counterSlice";

function Counter() {
  // Internal state
  const [localCount, setLocalCount] = useState(0);

  // Redux state
  const globalCount = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Local Count: {localCount}</h2>
      <button onClick={() => setLocalCount(localCount + 1)}>Increment Local</button>

      <h2>Global Count: {globalCount}</h2>
      <button onClick={() => dispatch(increment())}>Increment Global</button>
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
- Internal state = **notebook for personal use** (only component sees it).
- Redux store = **company whiteboard** (shared state across teams/components).

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you mix internal state and Redux state in one component?  
A1: Yes, use internal state for local UI and Redux for shared data.

Q2: Why not store everything in Redux?  
A2: Overusing Redux adds unnecessary complexity, boilerplate, and can hurt performance.

Q3: When should a form input state go to Redux?  
A3: Only if it needs to be accessed or persisted globally; otherwise, internal state suffices.

Q4: How does Redux improve predictability compared to internal state?  
A4: Redux enforces unidirectional flow and pure reducers, making state changes predictable and debuggable.
*/
