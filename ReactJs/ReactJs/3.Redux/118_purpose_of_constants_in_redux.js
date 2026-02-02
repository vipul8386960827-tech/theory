/* 118_purpose_of_constants_in_redux.js */

/*
=====================================
Purpose of Constants in Redux
=====================================

Definition:
In Redux, **constants** are used to define action types as string variables.  
Instead of writing action type strings directly in actions and reducers, we store 
them in constants to avoid typos, improve maintainability, and ensure consistency.

-------------------------------------
Benefits of Using Constants:
-------------------------------------

1. **Avoid Typos**
   - Using strings directly can lead to mistakes that are hard to debug.
   - Constants reduce the chance of mismatched action types.

   Example:
   const INCREMENT = "INCREMENT";

2. **Single Source of Truth**
   - Centralizes action types in one file for easy management.
   - Makes it easier to update or rename actions.

   Example:
   // actionTypes.js
   export const INCREMENT = "INCREMENT";
   export const DECREMENT = "DECREMENT";

3. **Improved Readability**
   - Clearly shows which actions exist in the application.

4. **Maintainability**
   - Adding or removing actions is easier.
   - Reduces risk of bugs when refactoring.

-------------------------------------
Example Usage:
-------------------------------------
- Action:
  import { INCREMENT } from "./actionTypes";

  export const increment = () => ({
    type: INCREMENT
  });

- Reducer:
  import { INCREMENT, DECREMENT } from "./actionTypes";

  const initialState = { count: 0 };

  function counterReducer(state = initialState, action) {
    switch (action.type) {
      case INCREMENT:
        return { count: state.count + 1 };
      case DECREMENT:
        return { count: state.count - 1 };
      default:
        return state;
    }
  }

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Constants are like **labels on storage boxes**:
  - Instead of writing "Books" on one side and "Boks" on another by mistake,
    you use a standardized label (constant) to avoid confusion.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can we use strings directly instead of constants?  
A1: Yes, but it increases the risk of typos and reduces maintainability.

Q2: Are constants mandatory in Redux?  
A2: No, they are a best practice, especially in large applications.

Q3: Where should constants be stored?  
A3: Usually in a separate file (e.g., `actionTypes.js`) for better organization.

Q4: Can constants help with code auto-completion?  
A4: Yes, modern IDEs can provide autocomplete for constants, reducing errors.
*/
