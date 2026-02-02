/* 256_update_objects_inside_state.js */

/*
=====================================
Update Objects Inside State in React
=====================================

Definition:
When managing object state in React, **direct mutation should be avoided**. 
Instead, create a new object when updating any property to ensure React correctly 
detects changes and re-renders components.

-------------------------------------
Preferred Techniques (Immutable Updates):
-------------------------------------

1. **Using Spread Operator**
-------------------------------------
const [user, setUser] = React.useState({ name: "Alice", age: 25 });

// Update age immutably
setUser({ ...user, age: 26 });

2. **Using Functional Updates**
-------------------------------------
setUser(prevUser => ({ ...prevUser, name: "Bob" }));

3. **Using Libraries (Immer)**
-------------------------------------
import produce from "immer";

setUser(
  produce(draft => {
    draft.age = 30;
  })
);

-------------------------------------
Non-Preferred Techniques (Mutable Updates):
-------------------------------------
- Direct mutation of state object is discouraged.
  Example:
  user.age = 27;
  setUser(user); // React may not detect the change

-------------------------------------
Notes:
-------------------------------------
- Always create a **new object** for any state update.
- Functional updates help prevent stale state when updates depend on previous state.
- Libraries like Immer simplify immutable updates for objects, especially nested ones.

-------------------------------------
Analogy:
-------------------------------------
- Object state = **profile card**:
  - Preferred: make a new copy of the card and update details.
  - Non-preferred: change details directly on the original card → can cause inconsistencies.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why should we avoid mutating state objects directly?  
A1: React may not detect changes, preventing re-render and causing UI inconsistencies.

Q2: Can Object.assign be used to update state objects?  
A2: Yes, but ensure it returns a **new object** to maintain immutability.

Q3: How do nested objects affect state updates?  
A3: Nested objects also require immutable updates at each level; otherwise React may not detect changes.

Q4: How does Immer help in updating state objects?  
A4: Immer allows "mutating" a draft state and produces a new immutable object automatically.
*/
