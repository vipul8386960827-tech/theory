/* 211_favorite_react_stack.js

=====================================
Favorite React Stack
=====================================

Definition:
A **React stack** refers to the set of tools, libraries, and frameworks commonly used together 
to build React applications efficiently. The "favorite stack" may vary by developer or team 
depending on project requirements.

-------------------------------------
Key Points:
-------------------------------------
1. **React** - Core library for building UI components.  
2. **State Management** - Redux, Zustand, or Context API for global state handling.  
3. **Routing** - React Router v6 for navigation and route management.  
4. **Side Effects / Async Handling** - Redux Thunk, Redux Saga, or React Query.  
5. **Styling** - CSS Modules, Tailwind CSS, styled-components, or SCSS.  
6. **Form Handling** - Formik or React Hook Form for complex forms.  
7. **Build Tools** - Vite, Webpack, or Create React App for bundling.  
8. **Testing** - Jest and React Testing Library for unit and integration tests.  
9. **Type Checking** - TypeScript or PropTypes.  
10. **Linting / Formatting** - ESLint and Prettier.  

-------------------------------------
Guidelines:
-------------------------------------
- Stack choice depends on project size, complexity, and team familiarity.  
- Prefer minimal and well-supported libraries for maintainability.  
- Always consider performance, developer experience, and community support.  

-------------------------------------
Example:
-------------------------------------
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { increment } from "./counterSlice";

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Counter />} />
      </Routes>
    </Router>
  );
}

-------------------------------------
Analogy:
-------------------------------------
The React stack is like a **toolbox for building a house**:  
- React = hammer (core tool for building UI).  
- Redux = blueprint (state planning and management).  
- Router = doorways (navigation between rooms).  
- Styling libraries = paint and decor (UI design).  
- Testing = safety inspections (ensures everything works reliably).  

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why do you prefer Redux over Context API for state management?  
A1: Redux provides a predictable, centralized store with middleware support and time-travel debugging.  

Q2: Can you build a React app without a router?  
A2: Yes, for single-view apps or static components, but navigation will require custom handling.  

Q3: Why choose Formik over React Hook Form?  
A3: Formik is simpler for small forms; React Hook Form is more performant for large or complex forms.  

Q4: How do you decide which styling solution to use?  
A4: Based on project size, team familiarity, theming requirements, and performance considerations.  

*/
