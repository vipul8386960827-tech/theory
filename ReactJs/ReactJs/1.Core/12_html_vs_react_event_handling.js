/* 12_html_vs_react_event_handling.js */
/*
In HTML, events are handled using inline attributes like `onclick` 
or by attaching event listeners directly via JavaScript.  
In React, events are handled using camelCase props like `onClick` 
and functions are passed as handlers. React also uses a synthetic event system 
that normalizes events across browsers.


---

📌 Real-life Examples:

- **Global analogy (Doorbell):**
  HTML event = pressing the doorbell directly triggers a bell.  
  React event = pressing the doorbell goes through a controlled intercom system 
  that ensures consistent behavior everywhere.

- **India-specific analogy (Traffic signal button):**
  HTML event = pressing the button triggers the light directly.  
  React event = pressing the button goes through a system that ensures the light 
  changes correctly in all intersections.

- **Web analogy:**
  HTML: `<button onclick="alert('Hi')">Click</button>`  
  React: `<button onClick={() => alert('Hi')}>Click</button>`  
  React handlers receive a SyntheticEvent and have consistent behavior across browsers.


---

📌 Possible Follow-Up Questions & Answers:

Q1: What is a SyntheticEvent?  
A1: React wraps native events into a SyntheticEvent, which normalizes behavior across browsers.

Q2: Can you prevent default behavior in React events?  
A2: Yes, by calling `event.preventDefault()` inside the handler function.

Q3: Can you pass parameters to event handlers in React?  
A3: Yes, by using arrow functions or binding:  
`onClick={() => handleClick(param)}` or `onClick={handleClick.bind(this, param)}`.

Q4: Are event names case-sensitive in React?  
A4: Yes, React uses camelCase like `onClick`, `onChange`, `onSubmit`.

Q5: How is `this` handled in React class component events?  
A5: In class components, `this` must be bound either in constructor or using arrow functions 
for proper access inside the handler.
*/
