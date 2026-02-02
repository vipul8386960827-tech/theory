/*
========================================
Question: Explain useLayoutEffect Hook in Detail
========================================

1. Definition:
- useLayoutEffect is a React Hook similar to useEffect, 
but it **runs synchronously after all DOM mutations** 
  and **before the browser repaints** the screen.  
- It’s mainly used when you need to **read layout information** from the DOM and synchronously re-render 
  (e.g., measuring elements, synchronizing scroll position).

------------------------------------------------------------
2. Key Points to Highlight:
- Signature: useLayoutEffect(() => { ... }, [dependencies])  
- Runs **synchronously** (blocking) after DOM updates but before paint.  
- Prevents visible flicker when measuring or mutating DOM styles.  
- Use sparingly, as blocking rendering can hurt performance.  
- Prefer useEffect unless you specifically need DOM measurement/adjustment before paint.  

------------------------------------------------------------
3. Syntax:
useLayoutEffect(() => {
  // Do DOM reads or writes here
  return () => {
    // Optional cleanup
  };
}, [dependencies]);

------------------------------------------------------------
4. Example:

import React, { useState, useLayoutEffect, useRef } from "react";

function Box() {
  const [width, setWidth] = useState(0);
  const boxRef = useRef();

  // Measure DOM element width before browser paints
  useLayoutEffect(() => {
    if (boxRef.current) {
      setWidth(boxRef.current.getBoundingClientRect().width);
    }
  }, []);

  return (
    <div>
      <div
        ref={boxRef}
        style={{ width: "50%", height: "100px", backgroundColor: "lightblue" }}
      >
        Box
      </div>
      <p>Box width: {width}px</p>
    </div>
  );
}

export default Box;

------------------------------------------------------------
5. Behavior Explanation:
- When the component renders, React updates the DOM.  
- Before the browser repaints, useLayoutEffect runs synchronously, 
  measures the box width, and updates state.  
- This avoids a visible flicker (where you might see the box first 
  and then see the width update afterward).  

------------------------------------------------------------
6. When to Use:
- Measuring DOM elements (size, position, scroll).  
- Synchronizing scroll position.  
- Animations that depend on precise DOM measurements.  

------------------------------------------------------------
7. When NOT to Use:
- Data fetching or asynchronous tasks (useEffect is better).  
- Non-UI critical side effects.  

------------------------------------------------------------
8. Follow-Up Interview Questions:
Q1: What is the difference between useEffect and useLayoutEffect?  
A1: useEffect runs asynchronously after paint; useLayoutEffect runs synchronously before paint.

Q2: What happens if useLayoutEffect is overused?  
A2: It blocks the browser paint, leading to performance bottlenecks and jank.

Q3: Can useLayoutEffect cause flicker if state updates?  
A3: No, because it runs before paint, preventing flicker.

Q4: When would you replace useLayoutEffect with useEffect?  
A4: If your side effect doesn’t depend on immediate DOM measurements 
    or doesn’t affect UI before paint.  

------------------------------------------------------------
Summary:
- ✅ useLayoutEffect = DOM reads/writes before paint  
- ⚠️ Performance heavy if overused  
- 🚫 Don’t use for async/data fetching (useEffect is better)
*/
