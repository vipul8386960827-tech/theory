/* 27_purpose_of_getderivedstatefromprops.js

=====================================
Purpose of getDerivedStateFromProps in React
=====================================

Definition:
`getDerivedStateFromProps` is a **static lifecycle method** in React that runs
before rendering, both during mounting and updating. It allows a component to
update its internal state based on changes in props.

-------------------------------------
Key Points:
-------------------------------------
1. Static Method:
   - Cannot access `this`.
   - Receives `props` and `state` as parameters.

2. Usage:
   - Derive state from props when props change.
   - Avoid side effects (network calls, DOM manipulation).
   - Should return an object to update state or `null` if no update is needed.

3. Replacement for:
   - `componentWillReceiveProps` (deprecated in React v16).

-------------------------------------
Example:
-------------------------------------
import React, { Component } from "react";

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { derivedValue: props.initialValue };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.initialValue !== prevState.derivedValue) {
      return { derivedValue: nextProps.initialValue };
    }
    return null;
  }

  render() {
    return <h1>Derived Value: {this.state.derivedValue}</h1>;
  }
}

export default MyComponent;

-------------------------------------
Analogy:
-------------------------------------
- Props = ingredients coming into a kitchen.
- State = final dish.
- `getDerivedStateFromProps` = adjusting the dish based on incoming ingredients before serving.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you perform side effects inside getDerivedStateFromProps?  
A1: No, it should be pure; side effects should go into componentDidUpdate.

Q2: When is getDerivedStateFromProps called?  
A2: Before every render, on both mounting and updating.

Q3: What should getDerivedStateFromProps return?  
A3: An object to update state or `null` if no state update is needed.

Q4: Can it replace all uses of componentWillReceiveProps?  
A4: Mostly yes, but without side effects.
*/
