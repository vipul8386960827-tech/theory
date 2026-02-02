/* 196_use_web_components_in_react.js

=====================================
Using Web Components in React
=====================================

Definition:
**Web Components** are custom, reusable HTML elements built using standard browser APIs.  
React can integrate Web Components, but some considerations are required for proper usage.

-------------------------------------
Key Points:
-------------------------------------
1. Web Components include:
   - **Custom Elements** (`<my-element>`)
   - **Shadow DOM** (encapsulated styles and DOM)
   - **HTML Templates**
2. React treats Web Components as **regular DOM elements**.  
3. Props and events:
   - Pass attributes as strings using `camelCase` or `kebab-case`.
   - Custom events may need `addEventListener` instead of React's `onEvent`.
4. Styling:
   - Shadow DOM encapsulates styles; global CSS doesn’t penetrate it.

-------------------------------------
Guidelines:
-------------------------------------
- Use Web Components when you need **framework-agnostic reusable elements**.  
- Be careful with **events** and **attribute bindings**.  
- Prefer using React components if full React integration is required.  

-------------------------------------
Example:
-------------------------------------
import React, { useEffect, useRef } from "react";

// Assume <my-button> is a custom web component
function WebButtonWrapper() {
  const buttonRef = useRef(null);

  useEffect(() => {
    const btn = buttonRef.current;
    const handleClick = (e) => alert("Clicked!");
    btn.addEventListener("customClick", handleClick);

    return () => btn.removeEventListener("customClick", handleClick);
  }, []);

  return <my-button ref={buttonRef} label="Click Me"></my-button>;
}

-------------------------------------
Analogy:
-------------------------------------
Web Components are like **USB devices**:  
- They work in any computer (framework) but may need specific drivers (event handling) to function properly.  
- React is the computer; Web Components are plug-and-play but require minor adjustments.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you use Web Components in React without issues?  
A1: Mostly yes, but you need to handle custom events and attributes carefully.  

Q2: How do you handle events from Web Components in React?  
A2: Use `ref` and `addEventListener` for custom events, since React may not recognize them.  

Q3: Can Web Components have Shadow DOM styles applied from React?  
A3: No, Shadow DOM encapsulates styles; you must style them inside the component.  

Q4: Why would you use Web Components instead of React components?  
A4: To create framework-agnostic reusable elements that work across projects or libraries.  

*/
