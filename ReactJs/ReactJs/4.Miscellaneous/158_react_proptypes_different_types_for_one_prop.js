/* 158_react_proptypes_different_types_for_one_prop.js */

/*
=====================================
React PropTypes: Different Types for One Prop
=====================================

Definition:
In React, **PropTypes** allow type checking for component props.  
Sometimes a prop can accept **multiple types** (e.g., string or number).  
React provides `PropTypes.oneOfType` to validate props with different allowed types.

-------------------------------------
Usage Example:
-------------------------------------
import React from "react";
import PropTypes from "prop-types";

function MyComponent({ value }) {
  return <div>{value}</div>;
}

// Prop can be string or number
MyComponent.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

// Usage
<MyComponent value="Hello" />
<MyComponent value={42} />

-------------------------------------
Key Points:
-------------------------------------
1. **PropTypes.oneOfType**
   - Accepts an array of PropTypes validators.
   - Component will warn in console if prop does not match any type.

2. **isRequired**
   - Ensures the prop is provided.
   - Warning occurs if missing, even if type matches.

3. **Other Examples**
   - Accept boolean or string:
     PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
   - Accept array or object:
     PropTypes.oneOfType([PropTypes.array, PropTypes.object])

-------------------------------------
Notes:
-------------------------------------
- PropTypes are **runtime checks**, not compile-time.
- Useful for documenting component APIs and catching misuse during development.
- For stricter type checking, use **TypeScript**.

-------------------------------------
Analogy:
-------------------------------------
- PropTypes = **guardrail** for props:
  - oneOfType = multiple lanes; prop can travel in any allowed lane.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can oneOfType accept nested PropTypes like shape?  
A1: Yes, you can use shapes, arrays, or any PropType inside oneOfType.

Q2: What happens in production if prop type mismatches?  
A2: PropTypes warnings are only in development; production ignores them.

Q3: Can you combine oneOfType with defaultProps?  
A3: Yes, defaultProps can provide a default value that matches one of the allowed types.

Q4: Is PropTypes mandatory for React components?  
A4: No, but recommended for better maintainability and debugging.
*/
