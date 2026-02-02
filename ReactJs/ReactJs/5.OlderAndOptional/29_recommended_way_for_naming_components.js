/* 29_recommended_way_for_naming_components.js

=====================================
Recommended Way for Naming React Components
=====================================

Definition:
In React, **component names must start with a capital letter**. This distinguishes them from 
HTML elements and allows React to correctly identify them as components. Proper naming 
improves readability and avoids rendering issues.

-------------------------------------
Key Points:
-------------------------------------
1. Capitalization:
   - Component names should **start with uppercase** (PascalCase preferred).
   - Example: `MyButton`, `UserProfile`.

2. File Naming:
   - Match the component name with the filename.
   - Example: `UserProfile.js` exports `UserProfile` component.

3. Differentiation from HTML Elements:
   - Lowercase names (e.g., `div`, `span`) are treated as native HTML tags.
   - Uppercase names are treated as React components.

4. Functional vs Class Components:
   - Applies to both functional (`function MyComponent()`) and class components (`class MyComponent extends React.Component`).

-------------------------------------
Example:
-------------------------------------
import React from "react";

// Correct
function UserCard() {
  return <div>User Card</div>;
}

// Incorrect (React treats as HTML element)
function userCard() {
  return <div>User Card</div>;
}

// Using in JSX
function App() {
  return (
    <div>
      <UserCard /> {/* Correct usage
      {/* <userCard /> would not render as a component 
    </div>
  );
}

export default App;

-------------------------------------
Analogy:
-------------------------------------
- React sees **capitalized names as custom toys** and lowercase as built-in toys.
- Only the custom toys (capitalized) can have special behaviors.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you use lowercase component names in React?  
A1: No, React will treat them as HTML elements, not components.

Q2: Are there exceptions for third-party components?  
A2: No, all components must follow capitalization to be recognized by React.

Q3: Why is PascalCase preferred over camelCase?  
A3: Improves readability and matches common React conventions.

Q4: What happens if two components have the same name in different files?  
A4: They must be imported with different aliases to avoid naming conflicts.
*/
