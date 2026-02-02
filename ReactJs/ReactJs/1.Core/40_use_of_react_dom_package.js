/*
ReactDOM Package vs React – Interview-Ready Answer

------------------------------------------------
1️⃣ React
------------------------------------------------
- React is the **core library** for building user interfaces.  
- Focuses on **component logic, state, and rendering structure**.  
- Provides hooks (useState, useEffect), component APIs, and the virtual DOM.  
- Does not directly deal with the browser DOM.  

Example (React code only – no DOM rendering):
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}

- This defines the component logic, but React alone does not know where to put it in the DOM.  

------------------------------------------------
2️⃣ ReactDOM
------------------------------------------------
- ReactDOM is the **bridge between React and the actual browser DOM**.  
- Provides DOM-specific methods for mounting, unmounting, and interacting with DOM nodes.  
- Without ReactDOM, components would never appear in the browser.  

Key Methods:
- createRoot → Renders a component tree into a DOM node.  
- render (pre-React 18) → Old way to mount components.  
- hydrate → Attaches React to existing SSR content.  
- createPortal → Renders a component outside of its parent DOM hierarchy.  
- findDOMNode → Legacy API to directly access DOM (deprecated).  

Example:
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
- Here, ReactDOM takes React components and mounts them to the browser DOM.  

------------------------------------------------
3️⃣ React vs ReactDOM (Detailed Comparison)
------------------------------------------------
| Feature               | React                                | ReactDOM                            |
|------------------------|--------------------------------------|-------------------------------------|
| Purpose               | Core library for building UI          | Connects React components to DOM    |
| Focus                 | Component logic, state, lifecycle     | DOM rendering and updates           |
| Works With            | Virtual DOM                          | Browser DOM                         |
| Example Usage         | useState, useEffect, createContext    | createRoot, hydrate, createPortal   |
| Where It Runs         | Abstract layer (UI logic)             | Platform-specific layer (web DOM)   |
| Platform Dependency   | UI-agnostic (works for mobile, VR, etc.) | Web/browser specific (React Native uses `react-native` instead) |

------------------------------------------------
4️⃣ Real-Life Analogy
------------------------------------------------
- React = Architect 🏗️ (designs and plans components).  
- ReactDOM = Construction crew 👷 (executes design and builds it in the real world).  
- Browser DOM = The actual building site 🏠.  

------------------------------------------------
5️⃣ Possible Follow-Up Questions
------------------------------------------------
Q1: Why is React separated from ReactDOM?  
A1: To make React platform-agnostic. React can work with React Native (mobile), ReactVR (VR), 
or ReactDOM (web).  

Q2: What happens if we only use React without ReactDOM?  
A2: The UI logic will exist, but nothing will render in the browser DOM.  

Q3: Is ReactDOM needed in React Native?  
A3: No. React Native uses a different renderer (`react-native`) instead of ReactDOM.  

Q4: How did React 18 change ReactDOM usage?  
A4: Instead of `ReactDOM.render`, we now use `ReactDOM.createRoot` for concurrent rendering.  

Q5: Can ReactDOM manipulate the DOM directly like vanilla JS?  
A5: No, ReactDOM works through the virtual DOM and reconciler. Direct DOM manipulation 
should be avoided in React except for special cases (via refs).  
*/
