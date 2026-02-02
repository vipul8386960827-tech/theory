/* 40_possible_ways_of_updating_objects_in_state.js

=====================================================
Possible Ways of Updating Objects in React State
=====================================================

Definition:
In React, updating objects in state should be done immutably. Instead of mutating
the object directly, create a new object with the updated properties and set it as state.

-----------------------------------------------------
Key Points:
-----------------------------------------------------

1. Do Not Mutate State
   - Avoid: state.user.name = "John";
   - This mutates the existing object and React may not trigger a re-render.

2. Using Spread Operator
   - Example:
       setUser(prevUser => ({ ...prevUser, name: "John" }));

3. Using Object.assign
   - Example:
       setUser(prevUser => Object.assign({}, prevUser, { age: 30 }));

4. Updating Nested Objects
   - Spread operator can be nested:
       setUser(prevUser => ({
         ...prevUser,
         address: { ...prevUser.address, city: "New York" }
       }));

5. Class Component Example
   - this.setState(prevState => ({
       user: { ...prevState.user, name: "John" }
     }));

6. Using Immer (Optional)
   - Library that simplifies immutable updates:
       import produce from "immer";
       setUser(prevUser => produce(prevUser, draft => {
         draft.name = "John";
       }));

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- State = a clean notebook.
- Updating it immutably is like tearing out a page and writing a new one instead of scribbling on the old one.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why not mutate objects directly in state?  
A1: React relies on shallow comparison; mutations may not be detected, causing no re-render.

Q2: How would you update deeply nested state properties?  
A2: Use nested spread operators or libraries like Immer for cleaner updates.

Q3: Which is better: spread operator or Object.assign?  
A3: Both work, but the spread operator is more concise and widely used.

Q4: Can useRef help update objects without re-rendering?  
A4: Yes, but useRef updates don’t trigger re-renders, making it suitable only for mutable references.
*/
