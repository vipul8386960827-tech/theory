/* 10_phases_of_component_lifecycle.js

=====================================
Phases of React Component Lifecycle
=====================================

Definition:
The **component lifecycle** in React represents the series of methods a component 
goes through from creation, updating, to unmounting. It helps manage side effects, 
state, and DOM interactions in class components.

-------------------------------------
Phases:
-------------------------------------

1. **Mounting**
   - Occurs when a component is being created and inserted into the DOM.
   - Methods:
     - constructor(): Initialize state and bind methods.
     - static getDerivedStateFromProps(): Update state from props before rendering.
     - render(): Returns JSX to display UI.
     - componentDidMount(): Run after the component is inserted into the DOM (e.g., fetch data).

2. **Updating**
   - Happens when props or state change.
   - Methods:
     - static getDerivedStateFromProps(): Update state from props.
     - shouldComponentUpdate(): Decide if component should re-render.
     - render(): Render updated UI.
     - getSnapshotBeforeUpdate(): Capture info from DOM before changes.
     - componentDidUpdate(): Run after updates are flushed to the DOM.

3. **Unmounting**
   - When the component is removed from the DOM.
   - Method:
     - componentWillUnmount(): Cleanup (timers, subscriptions, listeners).

4. **Error Handling**
   - Catch errors in any phase of children components.
   - Methods:
     - static getDerivedStateFromError(): Update state when error occurs.
     - componentDidCatch(): Log or perform side effects on error.

-------------------------------------
Example:
-------------------------------------
import React, { Component } from "react";

class LifecycleExample extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log("Constructor");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps");
    return null;
  }

  componentDidMount() {
    console.log("componentDidMount");
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

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    console.log("Render");
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}

-------------------------------------
Analogy:
-------------------------------------
- Mounting = Moving into a new house and arranging furniture.  
- Updating = Renovating rooms or changing furniture as needed.  
- Unmounting = Moving out and cleaning up.  
- Error handling = Calling a repair service when something breaks.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Which lifecycle method is best for fetching API data?  
A1: componentDidMount.

Q2: When would you use shouldComponentUpdate?  
A2: To optimize performance and prevent unnecessary re-renders.

Q3: What is the difference between getSnapshotBeforeUpdate and componentDidUpdate?  
A3: getSnapshotBeforeUpdate captures info from the DOM before changes; componentDidUpdate runs after DOM updates.

Q4: Can functional components use lifecycle methods?  
A4: No, but hooks like useEffect simulate lifecycle behavior.
*/
