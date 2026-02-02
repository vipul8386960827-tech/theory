/* 129_redux_selectors_and_why_use_them.js */

/*
=====================================
Redux Selectors and Why Use Them
=====================================

Definition:
Selectors are functions that extract or compute a specific piece of state 
from the Redux store. They help components access only the data they need.

-------------------------------------
Why Use Selectors:
-------------------------------------

1. **Encapsulation**
   - Components don’t need to know the structure of the store.
   - Makes refactoring easier since only selectors need to change.

2. **Reusability**
   - Same selector can be used across multiple components.
   - Avoids repeating the same state extraction logic.

3. **Memoization**
   - Libraries like Reselect can memoize selectors.
   - Prevents unnecessary re-renders by returning cached results if state hasn’t changed.

4. **Improved Readability**
   - Selector functions describe *what* you want from the state, not *how* to get it.
   - Cleaner component code.

5. **Testing**
   - Selectors can be tested in isolation without connecting to the store.

-------------------------------------
Basic Example:
-------------------------------------
import { createSelector } from "reselect";

// Input selector
const getTodos = (state) => state.todos;

// Memoized selector
const getCompletedTodos = createSelector(
  [getTodos],
  (todos) => todos.filter(todo => todo.completed)
);

// Usage in a component
const completedTodos = useSelector(getCompletedTodos);

-------------------------------------
Analogy:
-------------------------------------
- Think of the Redux store as a **library**:
  - Selector = librarian who fetches exactly the books (state) you need.
  - Components don’t search the whole library; they rely on the librarian.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why not access state directly in components?  
A1: Direct access couples components to store structure, making refactoring harder.

Q2: What is memoization in selectors?  
A2: Caching the result of a selector so repeated calls with unchanged input return the cached value.

Q3: Can selectors accept parameters?  
A3: Yes, parameterized selectors can compute results based on arguments.

Q4: Are selectors mandatory in Redux?  
A4: No, but they improve maintainability, readability, and performance in medium/large apps.
*/
