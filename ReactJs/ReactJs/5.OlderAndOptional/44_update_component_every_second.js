/* 44_update_component_every_second.js

=====================================================
Update a React Component Every Second
=====================================================

Definition:
Sometimes you want a React component to update itself every second.  
Common examples include clocks, timers, countdowns, or live data updates.

-----------------------------------------------------
Key Points:
-----------------------------------------------------

1. Use `setInterval` inside `useEffect` (for functional components).  
2. Always clear the interval when the component unmounts to prevent memory leaks.  
3. Updating state inside the interval triggers re-render every second.  
4. Avoid using `setTimeout` repeatedly — `setInterval` is more direct.  

-----------------------------------------------------
Example: Digital Clock
-----------------------------------------------------
import React, { useState, useEffect } from "react";

function Clock() {
  // store current time
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // set up interval
    const timer = setInterval(() => {
      setTime(new Date()); // update every second
    }, 1000);

    // cleanup when unmounted
    return () => clearInterval(timer);
  }, []);

  return <h1>{time.toLocaleTimeString()}</h1>;
}

-----------------------------------------------------
Explanation of Example:
-----------------------------------------------------
- `useState(new Date())` → stores the current time initially.  
- `useEffect` with empty dependency array `[]` → runs only once when mounted.  
- `setInterval` updates the time every 1000ms (1 sec).  
- `clearInterval(timer)` → prevents background intervals when component is destroyed.  

-----------------------------------------------------
Alternative Use Case:
-----------------------------------------------------
- Instead of showing the time, you could increment a counter every second:
  setCount(prev => prev + 1);

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Think of `setInterval` as a clock alarm that rings every second.  
- React’s re-render is like updating the clock display each time the alarm rings.  

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What happens if you forget to clear the interval?  
A1: The timer keeps running in the background → memory leak and unexpected updates.  

Q2: What is the difference between `setTimeout` and `setInterval` in this case?  
A2: `setTimeout` triggers once, `setInterval` repeats continuously.  

Q3: How would you test a component that updates every second?  
A3: Use Jest’s fake timers (`jest.useFakeTimers()`) to simulate time passage.  

Q4: Can `requestAnimationFrame` be used instead of `setInterval`?  
A4: Yes, for smoother UI updates tied to the browser’s rendering cycle (e.g., animations).  
*/
