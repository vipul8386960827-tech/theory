/* 25_lifecycle_methods_order_in_mounting.js

=====================================
React Lifecycle Methods Order in Mounting
=====================================

Definition:
Mounting is the phase in React when a component is being inserted into the DOM for the first time.
React provides lifecycle methods (for class components) to hook into different points during 
mounting, allowing you to perform setup tasks.

-------------------------------------
Mounting Lifecycle Methods Order:
-------------------------------------
1. **constructor(props)**
   - Initializes state and binds event handlers.
   - Called before the component is mounted.
   
2. **static getDerivedStateFromProps(props, state)**
   - Invoked right before rendering, both on initial mount and updates.
   - Allows updating state based on props.
   - Must return an object to update state or null to do nothing.

3. **render()**
   - Returns the JSX to render.
   - Pure function: should not modify state or interact with DOM.

4. **componentDidMount()**
   - Invoked immediately after the component is mounted.
   - Suitable for API calls, DOM interactions, subscriptions, or timers.

-------------------------------------
Example:
-------------------------------------
import React, { Component } from "react";

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log("constructor");
  }

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps");
    return null;
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  render() {
    console.log("render");
    return <h1>Count: {this.state.count}</h1>;
  }
}

export default MyComponent;

-------------------------------------
Analogy:
-------------------------------------
- Mounting = moving into a new house:
  - constructor = unpack boxes and set up furniture (initialize state)
  - getDerivedStateFromProps = check and arrange based on house rules (props)
  - render = place furniture visually in rooms (JSX in DOM)
  - componentDidMount = start using the house (API calls, DOM access, subscriptions)

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Which method is called first in mounting?  
A1: constructor(props) is called first.

Q2: Can you make API calls in constructor?  
A2: No, API calls should be made in componentDidMount after DOM is mounted.

Q3: When is getDerivedStateFromProps useful?  
A3: To update state in response to prop changes before render.

Q4: Is render safe for side effects?  
A4: No, render should be pure; side effects must go in componentDidMount or useEffect.
*/
