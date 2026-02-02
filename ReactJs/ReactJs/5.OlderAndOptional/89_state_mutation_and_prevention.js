/* 89_state_mutation_and_prevention.js

=====================================================
State Mutation and Prevention in React
=====================================================

Definition:
In React, state should never be mutated directly. Mutating state directly can lead 
to unpredictable behavior, bugs, and failure of React's rendering optimizations. Instead, 
state updates should be performed using setState in class components or state updater 
functions in functional components (e.g., useState setter).

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Why Direct Mutation is Bad:
   - React relies on immutability to detect changes for re-rendering.
   - Direct mutation bypasses React’s lifecycle, causing UI inconsistencies.
   - Makes debugging harder and breaks features like time-travel debugging.

2. Examples of Incorrect State Mutation:
   - this.state.count = this.state.count + 1; // Class component - WRONG
   - array.push(4);                           // Direct mutation of array - WRONG

3. Correct Ways to Update State:
   - Class Components: this.setState({ count: this.state.count + 1 });
   - Functional Components: setCount(prev => prev + 1);
   - Updating Arrays: setItems(prev => [...prev, newItem]);
   - Updating Objects: setUser(prev => ({ ...prev, name: "John" }));

4. Using Libraries for Immutability:
   - Immer library allows writing "mutating" syntax safely:
     import produce from "immer";
     const nextState = produce(prevState, draft => {
       draft.count += 1;
     });

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- State = inventory list in a warehouse.
- Direct mutation = changing inventory without logging, causing errors.
- Proper updates = creating a new list with changes, ensuring consistency and traceability.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why does React prefer immutable state?  
A1: It enables efficient change detection via shallow comparison, improving performance.

Q2: Can you directly mutate nested objects in state?  
A2: No, always create new objects or use immutability helpers/libraries like Immer.

Q3: What problems arise if you mutate state directly?  
A3: UI may not update, bugs may occur, and React devtools features may break.

Q4: How do you prevent accidental state mutation in large apps?  
A4: Use strict patterns, immutability libraries, and TypeScript for type safety.
*/
