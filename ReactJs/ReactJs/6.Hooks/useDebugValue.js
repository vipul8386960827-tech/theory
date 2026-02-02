/*
========================================
Question: Explain useDebugValue Hook in Detail
========================================

1. Definition:
- useDebugValue is a React Hook used to **display debug information** 
  for custom hooks in React DevTools.  
- It does not affect the behavior of the component and is **purely for debugging**.

------------------------------------------------------------
2. Key Points to Highlight:
- Helps developers **inspect the current state or status** of a custom hook.  
- Typically used inside **custom hooks** to label their value in React DevTools.  
- Can optionally format the value using a formatting function.  
- No impact on performance, as it only appears in DevTools.

------------------------------------------------------------
3. Syntax:
useDebugValue(value, formatFunction?);

- value → the value you want to display  
- formatFunction → optional function to format the displayed value  

------------------------------------------------------------
4. Example:

import React, { useState, useDebugValue } from "react";

// Custom hook using useDebugValue
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useDebugValue(isOnline ? "Online" : "Offline");

  return isOnline;
}

function App() {
  const online = useOnlineStatus();
  return <p>{online ? "You are online" : "You are offline"}</p>;
}

export default App;

------------------------------------------------------------
5. Behavior Explanation:
- In DevTools, under the component using the custom hook, 
  you can see the debug label "Online" or "Offline".  
- The hook does not cause re-renders or side effects.  
- Optional format function can be used for complex objects:
  useDebugValue(value, value => `Status: ${value}`);

------------------------------------------------------------
6. Follow-Up Interview Questions:
Q1: Can useDebugValue affect production code?  
A1: No, it only shows debug information in development tools.

Q2: When should you use useDebugValue?  
A2: Inside custom hooks to make debugging easier.

Q3: Can you use useDebugValue in regular components?  
A3: Technically yes, but it’s intended for custom hooks.  

Q4: Is useDebugValue necessary for hook functionality?  
A4: No, it is optional and purely for developer debugging.
*/
