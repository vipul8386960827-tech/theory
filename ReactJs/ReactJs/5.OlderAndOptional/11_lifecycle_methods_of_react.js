/* 11_lifecycle_methods_of_react.js

=====================================
Lifecycle Methods of React Components
=====================================

Definition:
Lifecycle methods are special methods in React class components that are called 
at different phases of a component’s life: mounting, updating, unmounting, and error handling. 
They allow developers to perform side effects, state updates, and cleanup operations.

-------------------------------------
Lifecycle Methods:
-------------------------------------

1. **Mounting Phase**
   - constructor(): Initialize state and bind methods.
   - static getDerivedStateFromProps(): Update state based on props before render.
   - render(): Render JSX to the DOM.
   - componentDidMount(): Called after the component is mounted; ideal for API calls, subscriptions.

2. **Updating Phase**
   - static getDerivedStateFromProps(): Update state when props change.
   - shouldComponentUpdate(): Determines if re-render is necessary; performance optimization.
   - render(): Updates the UI based on new state or props.
   - getSnapshotBeforeUpdate(): Capture DOM info before it changes.
   - componentDidUpdate(): Perform actions after updates (e.g., network requests, DOM manipulations).

3. **Unmounting Phase**
   - componentWillUnmount(): Cleanup before removing the component (timers, event listeners).

4. **Error Handling Phase**
   - static getDerivedStateFromError(): Update state when a child throws an error.
   - componentDidCatch(): Log errors or display fallback UI.

-------------------------------------
Example:
-------------------------------------
import React, { Component } from 'react';

class LifecycleMethodsExample extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
    console.log("Constructor");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps");
    return null;
  }

  componentDidMount() {
    console.log("componentDidMount");
    // Example API call
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

  componentDidCatch(error, info) {
    console.log("componentDidCatch", error, info);
  }

  render() {
    console.log("Render");
    return <div>Check console for lifecycle logs.</div>;
  }
}

-------------------------------------
Analogy:
-------------------------------------
- Mounting = Arriving in a new office and setting up your desk.  
- Updating = Making changes or improvements to your workspace as required.  
- Unmounting = Packing up and leaving.  
- Error Handling = Calling support when something breaks.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Which lifecycle method is called only once during mounting?  
A1: componentDidMount.

Q2: Which method can prevent unnecessary re-renders?  
A2: shouldComponentUpdate.

Q3: How do error boundaries work in React?  
A3: Use componentDidCatch and getDerivedStateFromError to catch errors in child components.

Q4: Can hooks replace lifecycle methods in functional components?  
A4: Yes, useEffect and other hooks simulate lifecycle behavior.
*/
