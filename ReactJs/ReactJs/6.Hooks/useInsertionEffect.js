/*
========================================
Question: Explain useInsertionEffect Hook in Detail
========================================

1. Definition:
- useInsertionEffect is a **React 18 experimental Hook** used for **inserting styles** 
  or performing DOM mutations **before layout effects and paint**.  
- Mainly intended for **CSS-in-JS libraries** to ensure styles are injected before the browser paints.

------------------------------------------------------------
2. Key Points to Highlight:
- Runs **synchronously before useLayoutEffect and before paint**.  
- Avoids flicker when injecting styles dynamically.  
- Should **not be used for data fetching, subscriptions, or side-effects** unrelated to style insertion.  
- Experimental hook; API and usage may change in future React releases.  

------------------------------------------------------------
3. Syntax:
useInsertionEffect(() => {
  // Insert styles or DOM mutations here
  return () => {
    // optional cleanup
  };
}, [dependencies]);

------------------------------------------------------------
4. Example:

import React, { useInsertionEffect, useState } from "react";

function DynamicStyleComponent({ color }) {
  useInsertionEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.textContent = `.dynamic-style { background-color: ${color}; }`;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, [color]);

  return <div className="dynamic-style">Styled Box</div>;
}

export default DynamicStyleComponent;

------------------------------------------------------------
5. Behavior Explanation:
- Runs before the browser paints → ensures styles are applied immediately.  
- Similar to useLayoutEffect, but with a **specific purpose for insertion of styles**.  
- Prevents flicker caused by dynamically added styles or CSS-in-JS libraries.

------------------------------------------------------------
6. Follow-Up Interview Questions:
Q1: How is useInsertionEffect different from useLayoutEffect?  
A1: useInsertionEffect runs earlier and is meant specifically for injecting styles before paint.

Q2: Can useInsertionEffect be used for network requests?  
A2: No, it should not be used for non-style side effects.

Q3: Is useInsertionEffect safe in production?  
A3: It is experimental; its API may change and it should be used cautiously.

Q4: Why is this hook needed for CSS-in-JS?  
A4: To avoid flickering by inserting styles **before the layout and paint**.
*/
