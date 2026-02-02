/* 76_use_contextType.js

=====================================================
Using contextType in Class Components
=====================================================

Definition:
In React, **contextType** is a property on class components that allows them to consume a single Context object.  
It provides a way for class components to access context values without using a Consumer component.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Only works with **class components**.
2. Allows access to context value via `this.context`.
3. Can subscribe to only **one context** at a time.
4. Eliminates the need for `<Context.Consumer>` wrapper in class components.

-----------------------------------------------------
Example:
-----------------------------------------------------
import React, { createContext, Component } from "react";

// Create context
const ThemeContext = createContext("light");

// Class component consuming context
class ThemedHeader extends Component {
  static contextType = ThemeContext; // subscribe to context

  render() {
    const theme = this.context; // access context value
    return <h1 style={{ color: theme === "dark" ? "#fff" : "#000" }}>Hello World</h1>;
  }
}

// Providing context
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedHeader />
    </ThemeContext.Provider>
  );
}

export default App;

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Like a student who is allowed to listen to a single announcement channel (context) in school without asking others for the info.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can a class component subscribe to multiple contexts using contextType?  
A1: No, contextType supports only one context. Use `<Context.Consumer>` for multiple contexts.

Q2: How is contextType different from useContext?  
A2: contextType is for class components; useContext is for functional components.

Q3: Does changing the context value re-render the class component?  
A3: Yes, whenever the Provider value changes, the class component re-renders automatically.

Q4: Can you use contextType outside the class?  
A4: No, contextType must be defined inside the class to bind context to `this.context`.
*/
