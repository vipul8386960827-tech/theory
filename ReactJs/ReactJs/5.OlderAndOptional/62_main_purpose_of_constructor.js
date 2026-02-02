/* 62_main_purpose_of_constructor.js

=====================================================
Main Purpose of Constructor in React Class Components
=====================================================

Definition:
In React class components, the `constructor` is a special method used to initialize the component 
before it is mounted. It sets up the initial state, binds event handlers, and can accept props.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Initialize State
   - The most common use of constructor is to initialize `this.state`.
   - Example: `this.state = { count: 0 }`

2. Bind Event Handlers
   - To ensure `this` refers to the component instance inside methods.
   - Example: `this.handleClick = this.handleClick.bind(this)`

3. Access Props
   - Props can be accessed via `this.props` after calling `super(props)`.

4. Must Call super(props)
   - Before using `this` in constructor, `super(props)` must be called.
   - If you skip `props`, `this.props` will be undefined inside constructor.

-----------------------------------------------------
Example:
-----------------------------------------------------
import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props); // Required to access this.props
    // Initialize state
    this.state = {
      count: props.initialCount || 0
    };
    // Bind event handler
    this.increment = this.increment.bind(this);
  }

  increment() {
    this.setState(prevState => ({ count: prevState.count + 1 }));
  }

  render() {
    return (
      <div>
        <h2>Count: {this.state.count}</h2>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Constructor = **blueprint setup for a building**.
- It sets initial configurations (state) and tools (bound methods) before the building (component) is ready.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can you omit the constructor in a React class component?  
A1: Yes, if you don’t need to initialize state or bind methods. You can use class fields instead.

Q2: Why call super(props) instead of just super()?  
A2: To make `this.props` available in the constructor.

Q3: Can we set state without constructor?  
A3: Yes, using class fields syntax: `state = { count: 0 }`

Q4: Should you bind event handlers in the constructor or elsewhere?  
A4: Either constructor binding or using arrow functions in class fields. Constructor binding is traditional and avoids re-creating functions on each render.
*/
