/* 257_update_nested_objects_inside_state.js */

/*
=====================================
Update Nested Objects Inside State in React
=====================================

Definition:
When updating nested objects in React state, **direct mutation should be avoided**. 
Instead, create a new object at each level that is being updated to ensure React 
detects changes and re-renders components correctly.

-------------------------------------
Preferred Techniques (Immutable Updates):
-------------------------------------

1. **Using Spread Operator**
-------------------------------------
const [user, setUser] = React.useState({
  name: "John",
  address: { city: "Delhi", zip: "110001" }
});

// Update city immutably
setUser({
  ...user,
  address: { ...user.address, city: "Mumbai" }
});

2. **Using Functional Updates**
-------------------------------------
setUser(prevUser => ({
  ...prevUser,
  address: { ...prevUser.address, zip: "400001" }
}));

3. **Using Libraries (Immer)**
-------------------------------------
import produce from "immer";

setUser(produce(draft => {
  draft.address.city = "Bangalore";
}));

-------------------------------------
Non-Preferred Techniques (Mutable Updates):
-------------------------------------
- Direct mutation of nested objects is not recommended.
  Example:
  user.address.city = "Mumbai";
  setUser(user); // React may not detect change, UI won't update

-------------------------------------
Notes:
-------------------------------------
- Always create new objects for each nested level you modify.
- Functional updates prevent stale closures when state depends on previous state.
- Libraries like **Immer** simplify nested state updates with mutative syntax.

-------------------------------------
Analogy:
-------------------------------------
- Nested state = **nested boxes**:
  - Preferred: copy each box you want to update and modify the copy.
  - Non-preferred: open and change the original boxes → can break consistency.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why shouldn’t we directly mutate nested objects in state?  
A1: React uses shallow comparison to detect changes; mutation may prevent re-render.

Q2: How does Immer simplify nested state updates?  
A2: It allows "mutating" a draft object, producing a new immutable state automatically.

Q3: Can we use Object.assign instead of spread operator?  
A3: Yes, but ensure you create a new object at each nested level.

Q4: What issues arise if nested state is mutated directly?  
A4: UI may not update, and debugging becomes difficult due to inconsistent state.
*/
