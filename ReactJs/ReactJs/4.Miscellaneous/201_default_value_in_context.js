/* 201_default_value_in_context.js

=====================================
Default Value in React Context
=====================================

Definition:
In React, the **Context API** allows passing data through the component tree without props.  
The **default value** is the value used by `Context` consumers when there is **no matching Provider** above in the tree.

-------------------------------------
Key Points:
-------------------------------------
1. Create context with `React.createContext(defaultValue)`.  
2. `defaultValue` is used **only if a component does not have a Provider** wrapping it.  
3. Helps prevent `undefined` values and provides fallback behavior.  
4. Consumers always use the value from the nearest Provider, overriding the default.

-------------------------------------
Guidelines:
-------------------------------------
- Set meaningful default values to avoid runtime errors.  
- Do not rely on default value for state management; use it mainly as a fallback.  
- Always wrap components with a **Provider** if dynamic values are needed.

-------------------------------------
Example:
-------------------------------------
import React, { createContext, useContext } from "react";

const ThemeContext = createContext("light"); // default value

function DisplayTheme() {
  const theme = useContext(ThemeContext);
  return <div>Current theme: {theme}</div>;
}

function App() {
  return (
    <div>
      {/* Using default value since no Provider 
      <DisplayTheme />

      {/* Overriding default with Provider 
      <ThemeContext.Provider value="dark">
        <DisplayTheme />
      </ThemeContext.Provider>
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
Default value in Context is like a **default language in a device**:  
- If the user has not set a preferred language (no Provider), the device shows the default language.  
- If the user sets a language (Provider), it overrides the default.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can a Context have multiple default values?  
A1: No, a Context can have only one default value per `createContext`.  

Q2: When is the default value used?  
A2: Only when a component consuming the Context is **not wrapped** in a Provider.  

Q3: Can default values be objects or functions?  
A3: Yes, default values can be any type: string, object, array, function.  

Q4: Does updating the default value dynamically affect existing consumers?  
A4: No, consumers only use the default value at creation; dynamic updates require a Provider.  

*/
