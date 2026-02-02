/* 13_context.js

=====================================
React Context API
=====================================

Definition:
React **Context API** is a feature that allows sharing data (like themes, user info, 
or language settings) across the component tree without passing props manually at 
every level. It is mainly used for global or cross-cutting concerns.

-------------------------------------
Key Points:
-------------------------------------
1. Context has a **Provider** (supplies the value) and a **Consumer** (receives the value).
2. Functional components use the `useContext` hook to access context values.
3. Avoid using Context for rapidly changing data to prevent unnecessary re-renders.

-------------------------------------
Example:
-------------------------------------
import React, { createContext, useContext, useState } from "react";

// Create context
const ThemeContext = createContext("light");

// Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Consumer component
function DisplayTheme() {
  const { theme } = useContext(ThemeContext);
  return <div>Current Theme: {theme}</div>;
}

// Usage
// <ThemeProvider>
//   <DisplayTheme />
// </ThemeProvider>

-------------------------------------
Analogy:
-------------------------------------
- Context is like a company-wide bulletin board:
  - Management posts the value (Provider) once.
  - Any employee (component) can read it (Consumer) without being told individually.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can context values be updated dynamically?  
A1: Yes, by wrapping the Provider value in state and updating it with functions.

Q2: How is Context different from Redux?  
A2: Context is lightweight and good for low-frequency global state; Redux is suited 
    for complex state management with middlewares and debugging tools.

Q3: Can you use `useContext` in class components?  
A3: No, class components use `<Context.Consumer>` instead.

Q4: What are potential performance issues with Context?  
A4: Frequent updates can cause all consuming components to re-render, affecting performance.
*/
