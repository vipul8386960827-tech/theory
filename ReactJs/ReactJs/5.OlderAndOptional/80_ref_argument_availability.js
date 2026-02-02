/* 80_ref_argument_availability.js */
/* 80_ref_argument_availability.js

=====================================================
Ref Argument Availability in React
=====================================================

Definition:
In React, refs provide a way to access DOM nodes or React elements directly.  
Refs are passed to components via the `ref` prop. However, the ref argument is **only available in certain scenarios** depending on the type of component.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Refs with DOM Elements
   - Can be attached directly to DOM elements.
   - Available immediately after the component mounts.
   Example:
     const inputRef = useRef(null);
     <input ref={inputRef} />

2. Refs with Class Components
   - You can attach refs to class components.
   - The ref points to the class instance and allows access to instance methods and properties.
   Example:
     const compRef = React.createRef();
     <MyComponent ref={compRef} />

3. Refs with Function Components
   - Function components do not have instances, so refs **cannot be attached directly**.
   - Use `forwardRef` to expose a ref to the parent.
   Example:
     const FancyButton = React.forwardRef((props, ref) => (
       <button ref={ref}>Click</button>
     ));

4. Timing
   - Refs are set **after the render phase**.
   - Accessing refs during rendering returns `null`.
   - Best to access in `useEffect` (functional) or `componentDidMount` / `componentDidUpdate` (class).

-----------------------------------------------------
Example:
-----------------------------------------------------
import React, { useRef, useEffect, createRef } from "react";

// Functional Component with forwardRef
const Button = React.forwardRef((props, ref) => {
  return <button ref={ref}>Click Me</button>;
});

function App() {
  const buttonRef = useRef(null);
  const classCompRef = createRef();

  useEffect(() => {
    console.log(buttonRef.current); // button DOM node
    console.log(classCompRef.current); // class instance
  }, []);

  return (
    <>
      <Button ref={buttonRef} />
      <MyClassComponent ref={classCompRef} />
    </>
  );
}

class MyClassComponent extends React.Component {
  sayHi() {
    console.log("Hi from class component");
  }
  render() {
    return <div>Class Component</div>;
  }
}

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Ref = a direct line to an office room (DOM element or class instance).  
- You can knock on the door (access methods) after the office opens (component mounts).  
- You cannot knock before the office opens (during render).

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can you attach refs to functional components without forwardRef?  
A1: No, functional components have no instances; use forwardRef.

Q2: When should you use createRef vs useRef?  
A2: useRef is for functional components and persists across renders; createRef is usually for class components.

Q3: Why are refs null during render?  
A3: They are set only after the render phase completes.

Q4: Can refs trigger re-renders?  
A4: No, updating a ref does not trigger re-render; it is mutable but non-reactive.
*/
