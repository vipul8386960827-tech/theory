/* 70_debug_forwardrefs_in_devtools.js

=====================================================
Debugging ForwardRefs in React DevTools
=====================================================

Definition:
**ForwardRefs** allow a React component to forward a `ref` from its parent to a child component or DOM element.
While useful, ForwardRefs can sometimes complicate debugging in React DevTools.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Forwarding Refs
   - Syntax: `React.forwardRef((props, ref) => <Child ref={ref} {...props} />)`
   - Allows parent components to directly access child DOM nodes or component instances.

2. DevTools Display
   - ForwardRef components often appear as `ForwardRef(ComponentName)` in React DevTools.
   - This can make it harder to recognize the original component, especially when nested.

3. Debugging Tips
   - Rename the component for DevTools clarity:
     ```
     const MyComponent = React.forwardRef((props, ref) => { ... });
     MyComponent.displayName = "MyComponent";
     ```
   - Inspect `ref` using console logs or breakpoints if needed.

4. Limitations
   - ForwardRef does not solve prop collision issues.
   - Only passes `ref` transparently; does not affect other props or HOC wrapping.

-----------------------------------------------------
Example:
-----------------------------------------------------
import React, { forwardRef, useRef, useEffect } from "react";

const InputField = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});
InputField.displayName = "InputField";

function Form() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // Access the DOM node
  }, []);

  return <InputField ref={inputRef} placeholder="Enter text" />;
}

export default Form;

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- ForwardRef = passing a magnifying glass to someone else.
- You can see directly through it (access the child DOM) without removing layers, but you may need to label it clearly to know whose magnifying glass it is.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why use ForwardRef instead of exposing methods via props?  
A1: ForwardRef provides direct access to the DOM node or child instance, avoiding unnecessary prop drilling.

Q2: How can you make ForwardRef components easier to debug in DevTools?  
A2: Assign a meaningful `displayName` to the ForwardRef component.

Q3: Can ForwardRefs be combined with HOCs?  
A3: Yes, but you must handle ref forwarding carefully to ensure the ref reaches the intended component.

Q4: What happens if you don’t forward a ref but try to access it?  
A4: `ref.current` will be `null` or not point to the intended element/component.

*/
