/* 60_required_method_for_class_component.js

=====================================================
Required Method for Class Component in React
=====================================================

Definition:
A React class component **must define a `render()` method**.  
The `render()` method returns the JSX (or null) that defines what the UI should display.  
Without `render()`, the component cannot render anything.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Purpose
   - `render()` describes the UI structure for the component.
   - Called automatically by React during mounting and updating phases.

2. Rules
   - Must be a pure function: avoid modifying state or causing side effects inside it.
   - Can return:
     - JSX elements
     - `null`
     - Arrays of elements
   - Multiple sibling elements must be wrapped (using `<div>` or `<React.Fragment>`).

3. Optional Class Methods
   - Constructor: optional, only needed for initializing state or binding methods.
   - Lifecycle methods: optional.

-----------------------------------------------------
Example:
-----------------------------------------------------
import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  // Required method
  render() {
    return (
      <div>
        <h2>Count: {this.state.count}</h2>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}

export default Counter;

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- `render()` is like the **blueprint of a house**.  
- Without it, React does not know what to display, similar to how construction cannot proceed without a blueprint.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can a class component exist without a constructor?  
A1: Yes, if no state or method binding is required.

Q2: Can `render()` return multiple elements directly?  
A2: No, they must be wrapped in a single parent element or a Fragment.

Q3: Should you perform side effects in `render()`?  
A3: No, side effects belong in lifecycle methods like `componentDidMount`.

Q4: How often is `render()` called?  
A4: It is called automatically whenever the component mounts or updates.
*/
