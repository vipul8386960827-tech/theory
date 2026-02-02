/*
========================================
Question: Explain useContext Hook in Detail
========================================

1. Definition:
- useContext is a React Hook that allows functional components 
  to access values from a React Context without using 
  the traditional <Context.Consumer> wrapper.  
- It simplifies consuming context and avoids prop drilling.

------------------------------------------------------------
2. Key Points to Highlight:
- Accepts a context object (created via React.createContext).  
- Returns the current context value.  
- Re-renders the component whenever the context value changes.  
- Useful for sharing global data like themes, authentication, or 
  user settings.  
- Must be used inside a component wrapped by the corresponding 
  Context.Provider.

------------------------------------------------------------
3. Syntax:
const value = useContext(MyContext);

- MyContext → the context object created by React.createContext()
- value → current value from the nearest Provider above in the tree.

------------------------------------------------------------
4. Example:

import React, { createContext, useContext, useState } from "react";

// 1. Create a Context
const ThemeContext = createContext("light");

function DisplayTheme() {
  // 2. Consume the context value
  const theme = useContext(ThemeContext);
  return <p>Current Theme: {theme}</p>;
}

function App() {
  const [theme, setTheme] = useState("dark");

  return (
    // 3. Provide the context value
    <ThemeContext.Provider value={theme}>
      <DisplayTheme />
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle Theme
      </button>
    </ThemeContext.Provider>
  );
}

export default App;

------------------------------------------------------------
5. Behavior Explanation:
- useContext subscribes to the nearest Provider above in the tree.  
- Any change in the Provider's value triggers re-render of 
  components using useContext.  
- Avoid calling useContext outside of Provider; it will return 
  default value if specified.

------------------------------------------------------------
6. Follow-Up Interview Questions:
Q1: How is useContext different from passing props?  
A1: Avoids prop drilling by allowing deep child components to 
    access global state directly.

Q2: Can multiple components share the same context?  
A2: Yes, all components under the same Provider can consume it.

Q3: How is useContext different from Context.Consumer?  
A3: useContext is simpler, avoids extra JSX, and works inside 
    functional components.

Q4: Does updating context always re-render all children?  
A4: Only components using the context value will re-render.
*/
