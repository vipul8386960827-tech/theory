/*
=====================================
Re-render on Browser Resize in React
=====================================

Definition:
In React, components do not automatically re-render on browser resize.  
To trigger a re-render, you need to listen to the window resize event 
and update component state, which causes React to re-render the component.

-------------------------------------
Key Points:
-------------------------------------
- Use `window.addEventListener("resize", ...)` to detect resize.  
- Store necessary values (like window width/height) in state.  
- Update state on resize to trigger re-render.  
- Clean up event listeners in `useEffect` to prevent memory leaks.  
- Debouncing resize events is recommended for performance.

-------------------------------------
Example 1: Basic Window Resize Handling
-------------------------------------
import React, { useState, useEffect } from "react";

function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <div>Window width: {width}px</div>;
}

-------------------------------------
Example 2: Debounced Resize (Performance)
-------------------------------------
import React, { useState, useEffect } from "react";

function WindowSizeDebounced() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    let timer;
    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setWidth(window.innerWidth), 200);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <div>Window width: {width}px</div>;
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
Listening to resize is like checking the weather 🌦️:  
- When it changes, you adjust your clothing (UI) accordingly.  
- Updating state = updating clothes; React re-renders to reflect change.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Why can’t React detect window resize automatically?
A1: React re-renders only on state/prop changes; resize is external.

Q2: What is the purpose of cleanup in useEffect?
A2: To remove the event listener when the component unmounts to avoid memory leaks.

Q3: Can we avoid using state for window size?
A3: Yes, but then the component won’t re-render automatically; you would need other methods.

Q4: Why use debounce?
A4: To limit the number of state updates and re-renders on rapid resize events, improving performance.

Q5: Can you handle resize in class components?
A5: Yes, attach event listener in componentDidMount and remove in componentWillUnmount.
*/
