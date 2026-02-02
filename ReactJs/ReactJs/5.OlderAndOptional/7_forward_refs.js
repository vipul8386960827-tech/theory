/* 7_forward_refs.js

=====================================
Forwarding Refs in React
=====================================

Definition:
Forwarding refs allows a **parent component** to pass its ref to a **child component**, 
so the parent can directly access a DOM node or a child component’s instance.  
It’s useful for creating reusable components that expose internal DOM elements.

-------------------------------------
Key Points:
-------------------------------------

1. Use Case:
   - When a component wraps a DOM element but needs to let parent access it.
   - Common in libraries or input wrappers.

2. How to Use:
   - Use `React.forwardRef()` to wrap the child component.
   - The forwarded ref is received as the **second argument** (`ref`) in the child.

3. Accessing Ref:
   - Parent can attach a ref to the child like any normal DOM element.

-------------------------------------
Example:
-------------------------------------
import React, { useRef, forwardRef } from 'react';

// Child Component with forwardRef
const MyInput = forwardRef((props, ref) => {
  return <input type="text" ref={ref} {...props} />;
});

// Parent Component
function Parent() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // Access child input directly
  }

  return (
    <div>
      <MyInput ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
- Forwarding refs is like giving your **friend a spare key** to your room.  
  You (parent) can access the room (DOM) directly even if someone (child) is in charge of the room.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can forwardRef be used with functional components?  
A1: Yes, only functional components support `forwardRef`.

Q2: Can multiple refs be forwarded at once?  
A2: No, `forwardRef` forwards a single ref. For multiple refs, use `useImperativeHandle` or ref objects.

Q3: Why not always use forwardRef?  
A3: It exposes internal DOM, reducing encapsulation; only use when necessary.

Q4: How does forwardRef work with higher-order components?  
A4: HOCs must pass the ref using `React.forwardRef` to ensure the ref reaches the intended component.
*/
