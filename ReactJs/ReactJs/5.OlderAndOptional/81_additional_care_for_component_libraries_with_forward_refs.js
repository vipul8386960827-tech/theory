/* 81_additional_care_for_component_libraries_with_forward_refs.js

=====================================================
Additional Care for Component Libraries with forwardRef
=====================================================

Definition:
When building React component libraries that expose DOM elements or child components via `forwardRef`, 
special care is needed to ensure the refs are forwarded correctly, remain compatible with consumers, 
and avoid breaking encapsulation.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Use forwardRef Correctly
   - Wrap the functional component with `React.forwardRef`.
   - Accept `ref` as the second argument.
   Example:
     const Input = React.forwardRef((props, ref) => (
       <input ref={ref} {...props} />
     ));

2. Maintain Ref Transparency
   - Ensure that consumers receive the expected DOM node or component instance.
   - Do not overwrite the `ref` internally.

3. Combine Refs If Needed
   - Sometimes you need to use internal refs along with forwarded refs.
   - Use `useImperativeHandle` or utility functions to merge refs.

4. TypeScript Considerations
   - Properly type the `ref` for DOM elements or component instances.
   - Prevent type errors for library consumers.

5. Avoid Breaking Encapsulation
   - Only expose necessary methods or DOM nodes through forwarded refs.
   - Do not leak internal implementation details unnecessarily.

-----------------------------------------------------
Example:
-----------------------------------------------------
import React, { useRef, useImperativeHandle } from "react";

// Component library example
const FancyInput = React.forwardRef((props, ref) => {
  const internalRef = useRef();

  // Expose only focus method
  useImperativeHandle(ref, () => ({
    focus: () => {
      internalRef.current.focus();
    }
  }));

  return <input ref={internalRef} {...props} />;
});

// Usage in consumer app
function App() {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <FancyInput ref={inputRef} />
      <button onClick={handleClick}>Focus Input</button>
    </>
  );
}

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- forwardRef = giving a handle to a library user without revealing your internal machinery.
- Like a hotel concierge giving you a room key (ref) but not access to the maintenance room (internal state).

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can you forward refs through multiple components?  
A1: Yes, you can chain forwardRefs across components.

Q2: What is useImperativeHandle used for?  
A2: It customizes which instance values are exposed to the parent ref.

Q3: Why is it important to maintain ref transparency in libraries?  
A3: Consumers rely on refs to interact with DOM nodes or methods; breaking it can cause bugs.

Q4: Can you forward refs to class components?  
A4: No, refs to class components naturally give you the instance; forwardRef is mainly for functional components.
*/
