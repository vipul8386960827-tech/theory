/* 259_use_immer_library_for_state_updates.js */

/*
=====================================
Use Immer Library for State Updates in React
=====================================

Definition:
**Immer** is a JavaScript library that helps manage immutable state updates 
easily. It allows developers to write "mutative" code while producing a new 
immutable state under the hood, which is useful in React and Redux.

-------------------------------------
Key Benefits:
-------------------------------------

1. **Simplifies Immutable Updates**
   - Allows direct modifications to a draft state.
   - Reduces boilerplate code compared to manual spread operators.

2. **Works with Nested Objects**
   - Deeply nested state updates become easier and less error-prone.

3. **Predictable State**
   - Ensures the original state is never mutated.
   - Generates a new state object for React or Redux updates.

4. **Integration with Redux**
   - Can be used in reducers to write simpler code for complex state changes.

-------------------------------------
Example:
-------------------------------------
import { produce } from "immer";
import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false }
  ]);

  const toggleTodo = (id) => {
    setTodos(
      produce(draft => {
        const todo = draft.find(t => t.id === id);
        if (todo) todo.completed = !todo.completed;
      })
    );
  };

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.text}
          </span>
          <button onClick={() => toggleTodo(todo.id)}>Toggle</button>
        </div>
      ))}
    </div>
  );
}

-------------------------------------
Notes:
-------------------------------------
- Immer uses a **draft state** that can be mutated safely.
- After mutation, Immer produces a **new immutable state** for React updates.
- Reduces the risk of bugs caused by direct state mutations.

-------------------------------------
Analogy:
-------------------------------------
- Immer = **sandbox**:
  - You play and make changes freely in the sandbox (draft).
  - When done, Immer generates a new clean version without altering the original.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: How is Immer different from manually using spread operators?  
A1: Immer automatically handles deep copies and nested updates, reducing boilerplate and mistakes.

Q2: Can Immer be used outside React?  
A2: Yes, it can be used in any JavaScript project to manage immutable state.

Q3: Does Immer mutate the original state?  
A3: No, it produces a new immutable state while allowing mutative syntax on a draft.

Q4: Can Immer be used in Redux reducers?  
A4: Yes, it's commonly used to simplify complex reducer logic.
*/
