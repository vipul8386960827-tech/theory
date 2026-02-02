/*
Events in React – Interview-Ready Answer

Definition:  
In React, events are handled using **Synthetic Events**, which are wrappers around native browser events.  
They provide a consistent, cross-browser API and work the same way across different environments.  

------------------------------------------------
Key Points:
- React events are named in **camelCase** (e.g., onClick, onChange).  
- Event handlers are passed as **functions**, not strings.  
- Synthetic Events wrap the browser’s native event object → normalized behavior.  
- Events in React bubble and capture just like native events.  
- React internally uses a **delegation system**: events are attached at the root, not directly on DOM nodes.  

------------------------------------------------
Coding Example:

// HTML Way (traditional)
<button onclick="alert('Clicked!')">Click Me</button>

// React Way
function EventExample() {
  function handleClick(e) {
    console.log("Button clicked!", e);
  }

  return <button onClick={handleClick}>Click Me</button>;
}

------------------------------------------------
Real-Life Analogy:
- Think of React Synthetic Events like a **universal remote control** 📺.  
  Instead of handling 10 different remotes (native events for each browser), React gives you one remote (synthetic event) that works everywhere.  

------------------------------------------------
Possible Follow-Up Questions with Answers:

Q1: What is the difference between React events and native DOM events?  
A1: React events are synthetic (cross-browser wrapper). Native events differ across browsers.  

Q2: How does React handle event delegation?  
A2: React attaches a single event listener at the root (document level) and uses event bubbling to catch child events. This improves performance.  

Q3: Why does React use camelCase for events?  
A3: Because JSX is closer to JavaScript than HTML, camelCase fits the JS convention (e.g., onClick vs onclick).  

Q4: Can we use `stopPropagation` and `preventDefault` in React?  
A4: Yes, Synthetic Events provide these methods, just like native events.  

Q5: What happens if you return `false` in an event handler in React?  
A5: Unlike jQuery, returning `false` does not stop the event. You must explicitly call `e.preventDefault()` or `e.stopPropagation()`.  
*/
