/* 46_define_constants_in_react.js

=====================================================
Defining Constants in React
=====================================================

Definition:
Constants in React are fixed values that do not change during a component’s lifecycle.  
They are useful for configuration, repeated strings, static data, and avoiding hardcoding.

-----------------------------------------------------
Key Points:
-----------------------------------------------------

1. **Why Use Constants**
   - Improves readability and maintainability.
   - Prevents bugs caused by typos in repeated values.
   - Makes refactoring easier.

2. **Where to Define Constants**
   a) **Inside Component**
      - If the constant is only relevant to that component.
   b) **Outside Component**
      - If the constant does not depend on props or state, define it outside the component to avoid re-creation on every render.
   c) **Separate File**
      - For global constants used across multiple components.

3. **Naming Convention**
   - Use `UPPERCASE_SNAKE_CASE` for constants.
   - Example: `API_URL`, `MAX_LENGTH`.

-----------------------------------------------------
Example 1: Inside a Component
-----------------------------------------------------
function WelcomeMessage() {
  const GREETING = "Hello, User!";
  return <h1>{GREETING}</h1>;
}

-----------------------------------------------------
Example 2: Outside Component (Better Performance)
-----------------------------------------------------
const MAX_ITEMS = 10;

function ItemList({ items }) {
  return (
    <ul>
      {items.slice(0, MAX_ITEMS).map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

-----------------------------------------------------
Example 3: In a Separate File (constants.js)
-----------------------------------------------------
// constants.js
export const API_URL = "https://jsonplaceholder.typicode.com";
export const MAX_RETRIES = 3;

// App.js
import { API_URL, MAX_RETRIES } from "./constants";

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Constants are like **road signs** — fixed, reusable, and always the same.  
- Instead of rewriting the same direction every time, you put up a **signboard**.  

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why define constants outside the component?  
A1: To avoid re-creating them on each render, improving performance.

Q2: How would you handle environment-specific constants?  
A2: Use `.env` files and access them via `process.env.REACT_APP_*`.

Q3: What’s the difference between constants in React and Redux action types?  
A3: Redux action type constants ensure consistency across reducers/actions.

Q4: Should constants always be uppercase?  
A4: By convention, yes — it makes them easily distinguishable from variables.  
*/
