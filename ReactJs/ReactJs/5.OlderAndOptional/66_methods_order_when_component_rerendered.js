/* 66_methods_order_when_component_rerendered.js

=====================================================
Methods Order When a React Component Re-renders
=====================================================

Definition:
When a React component's state or props change, it triggers a **re-render**. 
React then calls lifecycle methods (for class components) in a defined order
to update the component efficiently.

-----------------------------------------------------
Class Component Re-render Lifecycle Order:
-----------------------------------------------------
1. static getDerivedStateFromProps(props, state)
   - Called first during re-render.
   - Updates state based on props changes (if needed).

2. shouldComponentUpdate(nextProps, nextState)
   - Determines if the component should re-render.
   - Return `true` to continue rendering, `false` to skip.

3. render()
   - Returns JSX to update the UI.

4. getSnapshotBeforeUpdate(prevProps, prevState)
   - Captures some info (like scroll position) before DOM changes.

5. componentDidUpdate(prevProps, prevState, snapshot)
   - Invoked after the DOM is updated.
   - Used for side effects, network requests, or DOM manipulations.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
- Constructor is **not called** again on re-render; only initial mount.
- static methods are called before render, instance methods after render.
- Functional components use hooks like useEffect and useLayoutEffect instead.

-----------------------------------------------------
Example (Class Component):
-----------------------------------------------------
import React, { Component } from "react";

class MyComponent extends Component {
  state = { count: 0 };

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps");
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate");
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate");
  }

  render() {
    console.log("render");
    return (
      <div>
        <h2>{this.state.count}</h2>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}

export default MyComponent;

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Re-render = updating a billboard:
  1. Check if content needs to change (getDerivedStateFromProps / shouldComponentUpdate)
  2. Prepare the new content (render)
  3. Note current position/details (getSnapshotBeforeUpdate)
  4. Update the billboard (DOM updated)
  5. Log or trigger post-update actions (componentDidUpdate)

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Does constructor run on re-render?  
A1: No, it only runs during initial mount.

Q2: Which method allows preventing unnecessary re-renders?  
A2: shouldComponentUpdate (or React.memo in functional components).

Q3: When is getSnapshotBeforeUpdate useful?  
A3: To capture DOM info (like scroll position) before it changes.

Q4: How do functional components handle this lifecycle?  
A4: Using useEffect and useLayoutEffect hooks to replicate componentDidUpdate and getSnapshotBeforeUpdate behavior.

*/
