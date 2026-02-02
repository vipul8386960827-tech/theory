/* 154_example_of_reselect_usage.js */

/*
=====================================
Example of Reselect Usage
=====================================

Definition:
Reselect is a Redux library used to create **memoized selectors**. 
Selectors compute derived data from the Redux store and avoid unnecessary recalculations.

-------------------------------------
Example Scenario:
-------------------------------------
- Redux store contains a list of todos.
- We want to display **only completed todos** efficiently using Reselect.

-------------------------------------
Code Example:
-------------------------------------
import { createSelector } from "reselect";
import { useSelector } from "react-redux";

// Redux state
const state = {
  todos: [
    { id: 1, text: "Learn React", completed: true },
    { id: 2, text: "Learn Redux", completed: false },
    { id: 3, text: "Learn Reselect", completed: true }
  ]
};

// Input selector: returns all todos
const getTodos = state => state.todos;

// Memoized selector: returns only completed todos
const getCompletedTodos = createSelector(
  [getTodos],
  todos => todos.filter(todo => todo.completed)
);

// React Component using useSelector
function CompletedTodoList() {
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
- `createSelector` ensures the filtered list is recomputed only when `state.todos` changes.
- Memoization improves performance, especially for expensive computations.
- Selectors can be composed to create more complex derived data.

-------------------------------------
Analogy:
-------------------------------------
- Reselect = **smart filter**:
  - Remembers previous results.
  - Only recalculates when the input data changes, saving computation.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can Reselect selectors take multiple inputs?  
A1: Yes, you can pass an array of input selectors to `createSelector`.

Q2: What happens if the input array of a selector doesn’t change?  
A2: The selector returns the cached output without recalculating.

Q3: Is Reselect only useful for large apps?  
A3: No, but its benefits are more noticeable when computations are expensive or state is large.

Q4: Can Reselect be used with class components?  
A4: Yes, with `connect` and `mapStateToProps`.
*/
