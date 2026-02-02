/* 75_use_context_example.js */
/* 75_use_context_example.js

=====================================================
Using React Context API Example
=====================================================

Definition:
The React **Context API** provides a way to pass data through the component tree without having to pass props manually at every level.  
It’s useful for global state like theme, authentication, or language settings.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Creating Context
   - Use `React.createContext(defaultValue)` to create a context.
   - `defaultValue` is used when a component does not have a matching Provider above it.

2. Providing Context
   - Wrap components with `Context.Provider` and pass the value.
   - All descendant components can access this value.

3. Consuming Context
   - Functional components: use `useContext(MyContext)`
   - Class components: use `MyContext.Consumer` or `static contextType`

-----------------------------------------------------
Example:
-----------------------------------------------------
import React, { createContext, useContext } from "react";

// Create context
const ThemeContext = createContext("light");

// Functional component using useContext
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button style={{ background: theme === "dark" ? "#333" : "#eee" }}>Click Me</button>;
}

// Class component using contextType
class Header extends React.Component {
  static contextType = ThemeContext;
  render() {
    return <h1>Current Theme: {this.context}</h1>;
  }
}

// Providing context
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Header />
      <ThemedButton />
    </ThemeContext.Provider>
  );
}

export default App;

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Like a school announcement system:
  - The principal (Provider) announces a message.
  - Any student (child component) can hear it without passing the message hand-to-hand.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can context replace Redux?  
A1: Context is suitable for simple state sharing. Redux is better for complex or large-scale state management.

Q2: What happens if a component uses context but no Provider exists?  
A2: The component receives the default value passed to `createContext`.

Q3: Can you update context value dynamically?  
A3: Yes, by passing a state variable as `value` in the Provider.

Q4: Are there performance considerations using context?  
A4: Yes, every change in Provider value re-renders all consuming components.
*/
