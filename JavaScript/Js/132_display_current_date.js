/* 132_display_current_date.js

=====================================================
Display Current Date in React
=====================================================

Definition:
- Displaying the current date in React involves creating a JavaScript `Date` object 
  and rendering its value inside a React component.
- Can be done using functional components with hooks or class components.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. **Using Functional Component**
   - Can use `useState` and `useEffect` for live updates.
   - Simple one-time display can just create a `Date` object inside render.

2. **Using Class Component**
   - Can initialize date in state and update it with `componentDidMount` if needed.

3. **Formatting**
   - Use `toLocaleDateString()`, `toDateString()`, or libraries like `date-fns` or `moment`.

-----------------------------------------------------
Example (Functional Component):
-----------------------------------------------------
import React, { useState, useEffect } from "react";

function CurrentDate() {
  const [date, setDate] = useState(new Date());

  // Update date every second if live clock needed
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer); // cleanup
  }, []);

  return (
    <div>
      <h2>Current Date and Time:</h2>
      <p>{date.toLocaleString()}</p>
    </div>
  );
}

export default CurrentDate;

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Think of it as a wall clock in your room.  
- React component renders it, and with a timer, it ticks every second.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: How can you display the date without updating it every second?  
A1: Simply create a `Date` object once in the render or state; no `useEffect` needed.

Q2: How to format date in a specific locale?  
A2: Use `date.toLocaleDateString("en-GB")` or `toLocaleString("fr-FR")`.

Q3: Can you use external libraries for formatting?  
A3: Yes, libraries like `date-fns` and `moment` provide flexible date formatting.

Q4: How to avoid memory leaks with `setInterval` in React?  
A4: Always clean up the interval in the `useEffect` return function.
*/
