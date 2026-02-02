/* 77_consumer.js

=====================================================
Using Context.Consumer in React
=====================================================

Definition:
**Context.Consumer** is a component provided by React to allow **functional and class components** to consume context values.  
It enables access to the current value of a Context without using the `contextType` property.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Works with **both class and functional components**.
2. Allows consuming **multiple contexts** by nesting Consumers.
3. Uses a render prop pattern: a function as a child that receives the context value.
4. Automatically subscribes to context updates—re-renders when context value changes.

-----------------------------------------------------
Example:
-----------------------------------------------------
import React, { createContext } from "react";

// Create context
const ThemeContext = createContext("light");

// Component consuming context
function ThemedButton() {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <button style={{ backgroundColor: theme === "dark" ? "#333" : "#fff", color: theme === "dark" ? "#fff" : "#000" }}>
          Click Me
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

// Providing context
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}

export default App;

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Like a student listening to a live broadcast (Consumer) from a central announcement system (Context) and acting based on the message received.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can you use Context.Consumer in functional components?  
A1: Yes, it works in both functional and class components.

Q2: How do you consume multiple contexts in a component?  
A2: Nest multiple `<Context.Consumer>` components or use the `useContext` hook in functional components.

Q3: Is the render prop function called on every re-render?  
A3: Yes, it is invoked whenever the context value changes to provide the latest value.

Q4: When would you prefer Context.Consumer over contextType?  
A4: When consuming multiple contexts or in functional components.
*/
