/* 56_hoc_factory_implementations.js

=====================================================
HOC Factory Implementations in React
=====================================================

Definition:
A Higher-Order Component (HOC) is a function that takes a component and returns  
a new component with extended or modified behavior.  
An **HOC factory** is a higher-order function that creates HOCs dynamically,  
often based on configuration.

-----------------------------------------------------
Key Points:
-----------------------------------------------------

1. **HOC Basics**
   - HOC signature: const Enhanced = hoc(WrappedComponent);
   - Purpose: Reuse component logic (logging, authorization, data fetching).

2. **HOC Factory**
   - A function that returns an HOC.
   - Allows configuration so multiple HOCs can be generated with different behavior.
   - Example signature:
     const withFeature = (config) => (WrappedComponent) => { ... };

3. **Benefits**
   - Code reusability.
   - Encapsulation of cross-cutting concerns.
   - Flexible: one factory can produce multiple variations.

4. **Use Cases**
   - Logging props/state.
   - Authentication checks.
   - Theme-based styling.
   - API data fetching.

-----------------------------------------------------
Example 1: Simple HOC Factory
-----------------------------------------------------
import React from "react";

// HOC Factory that adds a prefix from config
const withPrefix = (prefix) => (WrappedComponent) => {
  return (props) => {
    return <WrappedComponent {...props} text={prefix + props.text} />;
  };
};

// Usage
const Message = ({ text }) => <h3>{text}</h3>;
const MessageWithPrefix = withPrefix("Hello, ")(Message);

// <MessageWithPrefix text="World!" /> → "Hello, World!"

-----------------------------------------------------
Example 2: Logging Props with HOC Factory
-----------------------------------------------------
const withLogger = (logMessage) => (WrappedComponent) => {
  return (props) => {
    console.log(logMessage, props);
    return <WrappedComponent {...props} />;
  };
};

const User = ({ name }) => <div>User: {name}</div>;
const UserWithLogger = withLogger("User Props:")(User);

// Rendering UserWithLogger will log props every time

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Think of an **HOC factory** as a **cookie-cutter machine**.  
- Instead of cutting just one shape, you design the machine (factory)  
  to create cutters (HOCs) with different shapes (configurations).  

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: How is an HOC different from a custom hook?  
A1: HOCs wrap components, while hooks encapsulate logic for reuse inside components.  

Q2: Why would you prefer an HOC factory over a simple HOC?  
A2: For flexibility and configurability — one factory can produce many variants.  

Q3: What are some drawbacks of HOCs?  
A3: Wrapper hell (deep nesting), props collision, and harder debugging.  

Q4: Can HOCs be combined?  
A4: Yes, you can compose multiple HOCs for layered functionality.  
*/
