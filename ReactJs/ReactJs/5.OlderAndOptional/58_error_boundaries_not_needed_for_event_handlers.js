/* 58_error_boundaries_not_needed_for_event_handlers.js

=====================================================
Error Boundaries Not Needed for Event Handlers in React
=====================================================

Definition:
In React, **error boundaries** catch errors during rendering, lifecycle methods, 
and constructors of the whole tree below them. However, errors in **event handlers** 
do not propagate to error boundaries—they need to be handled explicitly with try/catch.

-----------------------------------------------------
Key Points:
-----------------------------------------------------

1. **Scope of Error Boundaries**
   - Only catch errors in:
     - Rendering of components
     - Lifecycle methods (componentDidMount, etc.)
     - Constructors of child components
   - **Do NOT catch errors in event handlers**.

2. **Event Handler Errors**
   - Must be caught explicitly inside the handler using try/catch.
   - Errors do not crash the app automatically.

3. **Why**
   - Event handlers run asynchronously outside the rendering process.
   - React assumes the app should continue running even if an event handler fails.

-----------------------------------------------------
Example:
-----------------------------------------------------
import React, { Component } from "react";

class ClickButton extends Component {
  handleClick = () => {
    try {
      // Code that might throw
      throw new Error("Button click error!");
    } catch (error) {
      console.error("Caught in event handler:", error);
    }
  };

  render() {
    return <button onClick={this.handleClick}>Click Me</button>;
  }
}

export default ClickButton;

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Error boundaries = **safety nets under a trapeze** for rendering and lifecycle.
- Event handlers = performers on a separate stage; they need their own safety measures (try/catch).

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can an error boundary catch an error in a setTimeout callback?  
A1: No, asynchronous code errors are not caught; must use try/catch.

Q2: How do you globally handle event handler errors?  
A2: Implement a global error logging system inside try/catch in each handler.

Q3: Should all errors be caught in event handlers?  
A3: Ideally yes, especially user-triggered actions that may fail, to prevent crashes.

Q4: Can you combine error boundaries with event handler try/catch?  
A4: Yes, boundaries handle rendering errors, and try/catch handles user actions.  
*/
