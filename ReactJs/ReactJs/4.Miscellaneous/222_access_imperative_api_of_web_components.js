/* 222_access_imperative_api_of_web_components.js

=====================================
Access Imperative API of Web Components in React
=====================================

Definition:
Web Components often expose **imperative methods** (functions) that need to be called 
directly from JavaScript. In React, you can access these methods using **refs** to interact 
with the DOM element instance.

-------------------------------------
Key Points:
-------------------------------------
1. Use `React.createRef()` (class) or `useRef()` (functional) to get a reference to the DOM node.  
2. Access the Web Component’s methods via `ref.current.methodName()`.  
3. Avoid direct DOM manipulation except for interacting with Web Component APIs.  
4. Ensures React stays declarative while still using imperative methods when necessary.

-------------------------------------
Guidelines:
-------------------------------------
- Use refs only for **imperative actions** or third-party Web Component APIs.  
- Do not use refs for general state management; prefer React state.  
- Always ensure the Web Component has loaded before calling its methods.

-------------------------------------
Example:
-------------------------------------
import React, { useRef, useEffect } from "react";

function MyWebComponentWrapper() {
  const wcRef = useRef(null);

  useEffect(() => {
    if (wcRef.current) {
      // Call imperative method exposed by Web Component
      wcRef.current.doSomething();
    }
  }, []);

  return <my-web-component ref={wcRef}></my-web-component>;
}

-------------------------------------
Analogy:
-------------------------------------
- Web Component = **appliance with buttons**  
- Ref = **hand that can press the buttons**  
- You can interact with the appliance imperatively, but React still manages rendering.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you call Web Component methods without refs?  
A1: No, refs are required to get the DOM node instance.

Q2: Is using refs against React principles?  
A2: Only if misused; refs are intended for imperative actions or DOM APIs.

Q3: Can you use hooks with Web Components?  
A3: Yes, `useRef` + `useEffect` is the standard approach in functional components.

Q4: Why not manipulate the DOM directly for React-managed elements?  
A4: Direct DOM manipulation can conflict with React's virtual DOM updates and cause bugs.
*/
