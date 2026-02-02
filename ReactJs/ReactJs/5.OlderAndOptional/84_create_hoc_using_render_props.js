/* 84_create_hoc_using_render_props.js

=====================================================
Creating a Higher-Order Component (HOC) Using Render Props
=====================================================

Definition:
A Higher-Order Component (HOC) is a function that takes a component and returns a new component.
Render Props is a technique where a component accepts a function as a prop to control what to render.
Combining HOC and Render Props allows creating reusable logic that can be shared among multiple components.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. HOC Basics
   - Function that accepts a component and returns an enhanced component.
   - Example: const EnhancedComponent = withLogger(OriginalComponent);

2. Render Props Basics
   - A prop (usually named `render` or `children`) that is a function.
   - The function returns JSX based on passed-in data.

3. Combining HOC and Render Props
   - HOC can wrap a component and provide a render prop for flexible rendering.
   - Useful for shared state, conditional rendering, or injecting behavior.

-----------------------------------------------------
Example:
-----------------------------------------------------
import React, { Component } from "react";

// HOC using render prop
function withMouse(WrappedComponent) {
  return class extends Component {
    state = { x: 0, y: 0 };

    handleMouseMove = (event) => {
      this.setState({ x: event.clientX, y: event.clientY });
    };

    render() {
      return (
        <div onMouseMove={this.handleMouseMove}>
          <WrappedComponent {...this.props} mouse={this.state} />
        </div>
      );
    }
  };
}

// Using the HOC
function DisplayMouse({ mouse }) {
  return <p>Mouse position: {mouse.x}, {mouse.y}</p>;
}

const EnhancedDisplayMouse = withMouse(DisplayMouse);

export default EnhancedDisplayMouse;

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- HOC = wrapping a gift box (component) to add extra functionality.
- Render Prop = giving instructions (function) on how to use or display the gift.
- Combined = wrapped gift with custom instructions for each recipient.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can HOCs use state internally?  
A1: Yes, HOCs can manage their own state and pass it to wrapped components.

Q2: Why prefer render props inside HOCs?  
A2: Provides flexibility to customize rendering without modifying the HOC.

Q3: Are there alternatives to HOCs for sharing logic?  
A3: Yes, React hooks are the modern alternative for functional components.

Q4: What issues should you be aware of when using HOCs?  
A4: Prop name collisions, ref forwarding, and debugging wrapped component names.
*/
