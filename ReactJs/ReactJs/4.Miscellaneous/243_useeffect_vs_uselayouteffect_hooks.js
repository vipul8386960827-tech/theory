/* 243_useeffect_vs_uselayouteffect_hooks.js

=====================================
useEffect vs useLayoutEffect Hooks in React
=====================================

Definition:
- **useEffect**: A React hook that runs after the component renders and the browser
  has painted the UI. Ideal for side effects like API calls, timers, and subscriptions.
- **useLayoutEffect**: A React hook that runs synchronously after all DOM mutations 
  but **before the browser paints**. Ideal for reading layout or performing DOM measurements 
  that must happen before paint.

Key Points:
1. **useEffect**
   - Runs asynchronously after painting.
   - Non-blocking for UI updates.
   - Suitable for side effects that don't affect layout.

2. **useLayoutEffect**
   - Runs synchronously before paint.
   - Blocks browser rendering until executed.
   - Suitable for layout calculations or DOM updates that must be applied immediately.

Example:
import React, { useEffect, useLayoutEffect, useRef } from 'react';

function Box() {
  const divRef = useRef();

  useEffect(() => {
    console.log("useEffect:", divRef.current.offsetHeight);
  });

  useLayoutEffect(() => {
    console.log("useLayoutEffect:", divRef.current.offsetHeight);
  });

  return <div ref={divRef} style={{ height: 100 }}>Box</div>;
}

Analogy:
- useEffect = checking and responding **after the paint** (like reading a letter after delivery).
- useLayoutEffect = checking and adjusting **before paint** (like fixing a letter before showing it to someone).

Follow-Up Interview Questions:
Q1: When should you prefer useLayoutEffect over useEffect?  
A1: When you need to read or modify the DOM synchronously before the browser paints.

Q2: Can useLayoutEffect cause performance issues?  
A2: Yes, because it blocks browser painting; overuse can make UI feel slow.

Q3: Is useLayoutEffect executed on the server-side?  
A3: No, it should only be used in the browser since it relies on the DOM.

Q4: Do useEffect and useLayoutEffect run in the same order if multiple are used?  
A4: Yes, they run in order of declaration, but useLayoutEffect runs before paint, useEffect after.
*/
