/*  

**Definition:**  
In React, an uncontrolled component is a form element (like <input>, <textarea>, <select>)  
whose value is managed by the **DOM itself**, not by React state.  
- React does not directly control the input’s value.  
- To access the value, you use **refs** (React.createRef or useRef) instead of state.  

Key Points to Highlight:  
- Uncontrolled components behave like traditional HTML form elements.  
- Useful when you don’t need to control every keystroke or perform live validation.  
- The value is read only when necessary, typically on form submission.  
- Often simpler for quick forms, legacy code, or third-party integrations.  

Example:

import React, { useRef } from "react";

function UncontrolledForm() {
  const nameRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Submitted Name: ${nameRef.current.value}`); // Access value via ref
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={nameRef} /> // DOM controls the value
      <button type="submit">Submit</button>
    </form>
  );
}

// Key Idea / Benefit:  
// - React does not track input changes; the DOM does.  
// - Use refs to read values when needed.  
// - Suitable for simple forms or when React state management is unnecessary.  

*/
