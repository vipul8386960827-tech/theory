/* 20_setstate_in_constructor.js

=====================================
Using setState in Constructor
=====================================

Definition:
In React class components, **you should not use `this.setState` inside the constructor**.  
Instead, initialize the state directly using `this.state = {}`.  
`setState` is meant for updating state **after the component is mounted**, not during construction.

-------------------------------------
Key Points:
-------------------------------------
1. **Constructor Usage**
   - Only use the constructor to initialize state:
     ```js
     constructor(props) {
       super(props);
       this.state = { count: 0 };
     }
     ```
2. **Why not setState**
   - `setState` triggers re-render, but the component isn’t mounted yet.
   - Using it in the constructor may cause errors or unexpected behavior.
3. **Updating State Later**
   - Use `this.setState` in event handlers, lifecycle methods like `componentDidMount`,
     or other methods after the component is mounted.

-------------------------------------
Example:
-------------------------------------
import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    // Correct way to initialize state
    this.state = { count: 0 };
  }

  increment = () => {
    // Correct way to update state
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <h2>Count: {this.state.count}</h2>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

-------------------------------------
Analogy:
-------------------------------------
- Constructor = **preparing ingredients** before cooking (initial setup).  
- setState = **cooking process** after ingredients are ready.  
  You cannot cook before preparing ingredients.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you use setState in componentDidMount?  
A1: Yes, it's safe to update state in componentDidMount.

Q2: What happens if you use setState in constructor?  
A2: It may throw an error or behave unexpectedly because the component isn’t mounted yet.

Q3: How to initialize complex state in constructor?  
A3: Directly assign an object to `this.state` with all initial values.

Q4: Is it necessary to call super(props) in constructor?  
A4: Yes, it ensures `this.props` is available in the constructor.
*/
