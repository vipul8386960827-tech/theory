/* 161_pass_numbers_to_react_component.js

=====================================
Passing Numbers to React Components
=====================================

Definition:
In React, you can pass **numbers** as props to components.  
Numbers can be passed directly inside JSX using **curly braces** {} to evaluate the expression.

-------------------------------------
Key Points:
-------------------------------------

1. Curly Braces:
   - JSX treats anything inside `{}` as JavaScript expression.
   - Numbers should be passed inside `{}`; otherwise, they are treated as strings.

2. Type Checking:
   - Use PropTypes to enforce numeric type for better maintainability.

-------------------------------------
Example:
-------------------------------------
import React from "react";
import PropTypes from "prop-types";

function NumberDisplay({ count }) {
  return <p>Count: {count}</p>;
}

// PropTypes validation
NumberDisplay.propTypes = {
  count: PropTypes.number.isRequired
};

// Usage
function App() {
  return (
    <div>
      <NumberDisplay count={10} />           // Number passed correctly
      <NumberDisplay count={5 + 5} />        // Expression evaluated
      // <NumberDisplay count="10" />       // Warning: string instead of number
    </div>
  );
}

-------------------------------------
Notes:
-------------------------------------
- Always use `{}` for numeric props.
- JSX evaluates expressions inside `{}`; you can pass calculations directly.
- PropTypes help catch incorrect types during development.

-------------------------------------
Analogy:
-------------------------------------
- Props = **boxes**.
- Curly braces = **opening the box** to put actual numbers instead of text.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: What happens if you pass numbers as strings?  
A1: React treats them as strings; PropTypes will warn if expecting a number.

Q2: Can you pass arithmetic expressions directly?  
A2: Yes, inside `{}` JSX evaluates them automatically.

Q3: Is type-checking mandatory for numeric props?  
A3: No, but recommended for better maintainability.

Q4: Can you pass numeric arrays or objects as props?  
A4: Yes, use `{[1,2,3]}` or `{ { key: 1 } }` syntax.
*/
