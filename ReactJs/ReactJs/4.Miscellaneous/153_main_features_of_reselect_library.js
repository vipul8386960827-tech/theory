/* 153_main_features_of_reselect_library.js */

/*
=====================================
Main Features of Reselect Library
=====================================

Definition:
**Reselect** is a selector library for Redux that allows you to create **memoized selectors**.
Memoization helps prevent unnecessary recalculations, improving performance when reading 
state from the Redux store.

-------------------------------------
Key Features:
-------------------------------------

1. **Memoization**
   - Selectors recompute output only when their input arguments change.
   - Prevents unnecessary re-rendering of connected React components.

2. **Composability**
   - Small selectors can be combined to build more complex selectors.
   - Encourages modular and reusable code.

3. **Pure Functions**
   - Selectors are pure functions with no side effects.
   - Predictable outputs make testing easy.

4. **Performance Optimization**
   - Helps in large applications where computing derived data is expensive.
   - Reduces recomputations and improves UI responsiveness.

5. **Integration with Redux**
   - Works seamlessly with `mapStateToProps` in `connect`.
   - Can be used with hooks like `useSelector`.

-------------------------------------
Example:
-------------------------------------
import { createSelector } from "reselect";

// Input selector
const getTodos = state => state.todos;

// Memoized selector: filters completed todos
const getCompletedTodos = createSelector(
  [getTodos],
  todos => todos.filter(todo => todo.completed)
);

-------------------------------------
Usage in React Component:
-------------------------------------
import { useSelector } from "react-redux";

function TodoList() {
  const completedTodos = useSelector(getCompletedTodos);

  return (
    <ul>
      {completedTodos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

-------------------------------------
Notes:
-------------------------------------
- Memoization is shallow by default; nested objects may need careful handling.
- Selectors improve performance by avoiding unnecessary recalculation and re-rendering.
- Encourages separation of **state derivation logic** from UI components.

-------------------------------------
Analogy:
-------------------------------------
- Reselect = **calculator with memory**:
  - Computes results only when inputs change.
  - Saves previous results for identical inputs to avoid repeating work.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why use Reselect instead of computing data directly in mapStateToProps?  
A1: To avoid unnecessary recomputation and improve performance.

Q2: Can Reselect selectors take multiple input selectors?  
A2: Yes, createSelector accepts an array of input selectors.

Q3: How does memoization in Reselect work?  
A3: It caches the last input-output pair and returns the cached output if inputs are the same.

Q4: Can you use Reselect with useSelector hook?  
A4: Yes, memoized selectors work seamlessly with `useSelector` in functional components.
*/
