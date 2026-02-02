/* 74_prevent_component_from_rendering.js

=====================================================
Prevent Component from Rendering in React
=====================================================

Definition:
In React, you can conditionally prevent a component from rendering by returning **null** from its render method (class component) or from a functional component.  
Returning `null` does not affect the component’s lifecycle; it simply renders nothing.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Returning null
   - Class Component: `render() { return null; }`
   - Functional Component: `return null;`
   - Component still mounts and can have side effects in lifecycle/hooks.

2. Conditional Rendering
   - Use logical operators to decide whether to render:
     `{condition && <Component />}`

3. Performance Consideration
   - Avoid unnecessary rendering to improve performance.
   - Null rendering is lighter than rendering an empty div.

-----------------------------------------------------
Example:
-----------------------------------------------------
import React, { Component } from "react";

class OptionalMessage extends Component {
  render() {
    const { show } = this.props;
    if (!show) {
      return null; // Prevents rendering
    }
    return <h2>Hello, I am visible!</h2>;
  }
}

// Functional component example
const OptionalMessageFunc = ({ show }) => {
  return show ? <h2>Hello, I am visible!</h2> : null;
};

export { OptionalMessage, OptionalMessageFunc };

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Like a store sign that only lights up when the store is open.  
- If the condition isn’t met, the sign stays off (component renders nothing).

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Will lifecycle methods run if render returns null?  
A1: Yes, mounting lifecycle methods like `componentDidMount` still run.

Q2: Is returning null the same as not rendering the component?  
A2: Yes visually, but the component still exists in the React tree.

Q3: Can hooks run if a functional component returns null?  
A3: Yes, hooks still execute normally even if the component renders nothing.

Q4: Are there performance benefits of returning null?  
A4: Yes, it prevents unnecessary DOM updates, reducing rendering overhead.
*/
