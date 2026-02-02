/* 261_preferred_and_non_preferred_array_operations.js */

/*
=====================================
Preferred and Non-Preferred Array Operations in React
=====================================

Definition:
In React, certain array operations are preferred to maintain immutability 
and avoid unintended side effects, especially when updating state. 
Non-preferred operations mutate the original array, which can cause 
unexpected behavior in components.

-------------------------------------
Preferred Array Operations (Immutable)
-------------------------------------
- Always create a new array when updating state.
- Examples:
  1. `map` → returns a new array after transformation.
  2. `filter` → returns a new array with filtered elements.
  3. `concat` → returns a new array after merging.
  4. Spread operator `[...arr, newItem]` → creates a new array with added items.
  5. `slice` → returns a portion of the array without modifying the original.

Example:
-------------------------------------
const [todos, setTodos] = React.useState(["Task1", "Task2"]);

// Adding a new todo (preferred)
setTodos([...todos, "Task3"]);

// Removing a todo (preferred)
setTodos(todos.filter(todo => todo !== "Task1"));

// Updating a todo (preferred)
setTodos(todos.map(todo => todo === "Task2" ? "Task2 Updated" : todo));

-------------------------------------
Non-Preferred Array Operations (Mutable)
-------------------------------------
- Operations that mutate the original array should be avoided in state updates.
- Examples:
  1. `push` → adds items in place.
  2. `pop` → removes last item in place.
  3. `splice` → adds/removes items in place.
  4. `sort` → sorts array in place.
  5. `reverse` → reverses array in place.

Example:
-------------------------------------
const [numbers, setNumbers] = React.useState([1, 2, 3]);

// Non-preferred (mutates original array)
numbers.push(4);
setNumbers(numbers); // May cause React to not detect changes

-------------------------------------
Notes:
-------------------------------------
- React state relies on immutability to detect changes.
- Mutating arrays can prevent re-renders because React does shallow comparison of state.
- Always return a new array or object when updating state.

-------------------------------------
Analogy:
-------------------------------------
- Preferred = **copy of a document**: you make changes on the copy and keep the original intact.
- Non-preferred = **editing the original document**: others relying on the original may see inconsistencies.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why should we avoid `push` and `splice` in state updates?  
A1: They mutate the original array; React may not detect changes, causing render issues.

Q2: Can `map` or `filter` be used for large arrays?  
A2: Yes, but memoization or optimization may be needed for performance.

Q3: Is immutability only important for arrays?  
A3: No, immutability is important for all state objects in React.

Q4: How can you update deeply nested arrays/objects immutably?  
A4: Use spread operators, `map`, or libraries like Immer to maintain immutability.
*/
