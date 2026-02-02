/* 135_action_in_redux.js */

/*
=====================================
Action in Redux
=====================================

Definition:
An **action** in Redux is a plain JavaScript object that describes a change 
or event in the application. It is the **only way to communicate data** from 
the UI (or other sources) to the Redux store.

-------------------------------------
Core Properties:
-------------------------------------

1. **type** (mandatory)
   - A string that defines the kind of action being performed.
   - Should be unique for each type of action.

2. **payload** (optional)
   - Contains data related to the action.
   - Can be any value: object, array, number, etc.

-------------------------------------
Example:
-------------------------------------
const incrementAction = {
  type: "INCREMENT"
};

const addTodoAction = {
  type: "ADD_TODO",
  payload: { id: 1, text: "Learn Redux" }
};

-------------------------------------
Key Points:
-------------------------------------
- Actions are **plain objects**, not functions.
- They do **not modify state directly**; reducers use them to compute new state.
- Using constants for action types helps prevent typos.

-------------------------------------
Analogy:
-------------------------------------
- Action = **request ticket**:
  - You submit a ticket describing what you want done (type + payload).
  - The system (store + reducers) processes it and updates state accordingly.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can an action contain a function?  
A1: No, actions are plain objects. Middleware like Redux Thunk allows returning functions.

Q2: Is the `type` field mandatory?  
A2: Yes, reducers rely on `type` to determine how to update state.

Q3: What is the purpose of the payload?  
A3: To carry the necessary data for the reducer to update the state.

Q4: Can you dispatch multiple actions at once?  
A4: Not directly; each dispatch handles one action, but middleware can sequence multiple dispatches.
*/
