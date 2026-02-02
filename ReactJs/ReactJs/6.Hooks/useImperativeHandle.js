/*
========================================
Question: Explain useImperativeHandle Hook in Detail
========================================

1. Definition:
- useImperativeHandle is a React Hook used with **forwardRef** 
  to customize the **instance value exposed to parent components**.  
- Allows a child component to expose only specific methods or values 
  to its parent instead of the entire DOM node or component instance.

------------------------------------------------------------
2. Key Points to Highlight:
- Must be used inside a component wrapped with **React.forwardRef**.  
- Accepts three arguments: ref, a function returning the value to expose, and a dependency array.  
- Helps **encapsulate internal component details** while providing controlled access.  
- Common use cases: exposing focus, scroll, or reset methods from child components.

------------------------------------------------------------
3. Syntax:
useImperativeHandle(ref, () => ({
  method1: () => {...},
  method2: () => {...}
}), [dependencies]);

- ref → forwarded ref from parent  
- function → returns object with methods/values to expose  
- dependencies → array controlling when the object is recreated  

------------------------------------------------------------
4. Example:

import React, { useRef, forwardRef, useImperativeHandle } from "react";

// Child component exposing custom methods
const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = "";
    }
  }));

  return <input ref={inputRef} type="text" />;
});

// Parent component using the exposed methods
function App() {
  const inputRef = useRef();

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
      <button onClick={() => inputRef.current.clear()}>Clear</button>
    </div>
  );
}

export default App;

------------------------------------------------------------
5. Behavior Explanation:
- Parent only has access to the object returned by useImperativeHandle.  
- The child can encapsulate internal logic while exposing specific methods.  
- useImperativeHandle’s object updates whenever dependencies change.

------------------------------------------------------------
6. Follow-Up Interview Questions:
Q1: How is useImperativeHandle different from useRef?  
A1: useRef exposes the entire DOM node; useImperativeHandle exposes a controlled API.

Q2: When should you use useImperativeHandle?  
A2: When you want to expose only certain actions/methods of a child component to its parent.

Q3: Can useImperativeHandle be used without forwardRef?  
A3: No, it requires forwardRef to receive the parent ref.

Q4: What are typical use cases?  
A4: Custom inputs, focus management, scrolling, resetting internal state.
*/
