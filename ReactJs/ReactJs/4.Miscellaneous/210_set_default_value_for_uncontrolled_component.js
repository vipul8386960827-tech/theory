/* 210_set_default_value_for_uncontrolled_component.js

=====================================
Set Default Value for Uncontrolled Component
=====================================

Definition:
In React, **uncontrolled components** manage their own state internally, typically via the DOM.  
The **default value** can be set using the `defaultValue` (for inputs) or `defaultChecked` (for checkboxes/radios) prop.  
This allows the component to have an initial value without controlling it through React state.

-------------------------------------
Key Points:
-------------------------------------
1. **Uncontrolled** = React does not track input value via state.  
2. `defaultValue` sets the initial value **once**. Subsequent changes are handled by the DOM.  
3. Useful for **simple forms** or when you don’t need real-time state tracking.  
4. To access the value later, use **refs** (`useRef` or `createRef`).  

-------------------------------------
Guidelines:
-------------------------------------
- Use uncontrolled components when form state doesn’t affect other UI elements.  
- Use controlled components if you need real-time validation, dynamic updates, or external state.  
- Combine with refs to read values on form submission.  

-------------------------------------
Example:
-------------------------------------
import React, { useRef } from "react";

function UncontrolledForm() {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Input Value: ${inputRef.current.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" defaultValue="Hello World" ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}

-------------------------------------
Analogy:
-------------------------------------
Uncontrolled component is like **manual gear in a car**:  
- You set the initial gear (default value) and the car runs autonomously.  
- You only check or intervene (ref) when you need to change or read the gear.  

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: What’s the difference between `defaultValue` and `value`?  
A1: `defaultValue` sets initial value for uncontrolled components; `value` is for controlled components and requires state updates.  

Q2: Can you switch from uncontrolled to controlled component?  
A2: Yes, but it may require adding state and changing `defaultValue` to `value`.  

Q3: Why use uncontrolled components?  
A3: Simpler forms, less boilerplate, and suitable for non-critical input tracking.  

Q4: How to access the value of an uncontrolled input?  
A4: Use a **ref** pointing to the DOM element.  

*/
