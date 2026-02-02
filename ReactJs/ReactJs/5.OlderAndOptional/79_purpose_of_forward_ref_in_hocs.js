/* 79_purpose_of_forward_ref_in_hocs.js

=====================================================
Purpose of forwardRef in HOCs
=====================================================

Definition:
**React.forwardRef** is a utility that allows **higher-order components (HOCs) or functional components** to pass a `ref` from a parent component down to a child component.  
Normally, refs cannot be accessed through HOCs because HOCs wrap components, breaking the direct ref connection.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Allows parent components to directly reference **DOM nodes or child component instances**.
2. Solves the problem of **refs not automatically forwarding** through HOCs.
3. Typically used with **functional components** that do not have instances themselves.
4. Maintains the **ref transparency** when wrapping a component.

-----------------------------------------------------
Example:
-----------------------------------------------------
import React, { forwardRef, useRef } from "react";

// Basic Input component
const Input = (props, ref) => {
  return <input ref={ref} {...props} />;
};

// Wrap with forwardRef to allow parent access
const ForwardedInput = forwardRef(Input);

function App() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <ForwardedInput ref={inputRef} placeholder="Type here..." />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

export default App;

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Like giving a remote control (ref) to someone so they can operate a device (child component) even if it is wrapped inside a box (HOC).

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why can't refs be passed through HOCs directly?  
A1: HOCs create a wrapper component, so `ref` would point to the wrapper, not the wrapped child.

Q2: Can forwardRef be used with class components?  
A2: Yes, but it is most commonly used with functional components.

Q3: How does forwardRef differ from React.createRef?  
A3: `createRef` creates a ref object, whereas `forwardRef` allows ref to pass through component boundaries.

Q4: Can multiple refs be forwarded?  
A4: Not directly; you can combine refs using `useImperativeHandle` or a ref-merging utility.
*/
