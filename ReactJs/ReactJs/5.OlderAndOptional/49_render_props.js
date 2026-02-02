/* 49_render_props.js

=====================================================
Render Props in React
=====================================================

Definition:
A **render prop** is a technique for sharing code between React components using a prop  
whose value is a function. Instead of hardcoding what to render, the component delegates  
the rendering logic to the function passed as a prop.

-----------------------------------------------------
Key Points:
-----------------------------------------------------

1. **Purpose**
   - Enables code reuse between components.  
   - Alternative to Higher-Order Components (HOCs).  
   - Makes components more flexible and reusable.  

2. **Naming Convention**
   - The prop is often called `render` or `children`.  

3. **Difference from HOCs**
   - HOC: wraps a component.  
   - Render Props: passes a function that returns JSX.  

4. **Caution**
   - Overuse can cause “wrapper hell” (too many nested functions).  
   - Hooks are now a cleaner alternative in many cases.  

-----------------------------------------------------
Example 1: Simple Render Prop
-----------------------------------------------------
import React from "react";

class MouseTracker extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({ x: event.clientX, y: event.clientY });
  };

  render() {
    return (
      <div style={{ height: "200px" }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

function App() {
  return (
    <MouseTracker
      render={({ x, y }) => (
        <h2>
          Mouse position: ({x}, {y})
        </h2>
      )}
    />
  );
}

-----------------------------------------------------
Example 2: Using Children as a Function
-----------------------------------------------------
class DataProvider extends React.Component {
  state = { data: "Hello World" };

  render() {
    return this.props.children(this.state.data);
  }
}

function App2() {
  return (
    <DataProvider>
      {(data) => <h1>{data}</h1>}
    </DataProvider>
  );
}

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Think of a **render prop** as a customizable **chef’s special dish**.  
- The restaurant provides the kitchen and ingredients (component logic),  
  but the customer chooses the final recipe (render function).  

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: How are render props different from children props?  
A1: Children props can also be functions, making them a form of render props.  

Q2: Can you combine render props with HOCs?  
A2: Yes, but it can make code harder to read — hooks are preferred now.  

Q3: What are modern alternatives to render props?  
A3: React hooks (like `useState`, `useEffect`, `useContext`).  

Q4: When would you still use render props today?  
A4: When dealing with older codebases or when needing explicit control of rendering logic.  
*/
