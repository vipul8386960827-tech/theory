/* 22_use_props_in_initial_state.js

=====================================
Using Props in Initial State
=====================================

Definition:
In React class components, you can use **props to initialize state** in the constructor.  
However, after initialization, the state does **not automatically update** when props change.  
This pattern should be used cautiously to avoid inconsistencies.

-------------------------------------
Key Points:
-------------------------------------
1. **Initializing State from Props**
   - In constructor:
     ```js
     constructor(props) {
       super(props);
       this.state = { count: props.initialCount };
     }
     ```
2. **Props Are Read-Only**
   - Props should not be directly mutated; they are **read-only**.
3. **State Won’t Sync Automatically**
   - If `initialCount` prop changes later, state will not update unless handled explicitly.
4. **Alternative**
   - Use `getDerivedStateFromProps` or rely on props directly in render instead of storing in state.

-------------------------------------
Example:
-------------------------------------
import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    // Initialize state using props
    this.state = { count: props.initialCount };
  }

  increment = () => {
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

// Usage
// <Counter initialCount={5} />

-------------------------------------
Analogy:
-------------------------------------
- Props = **ingredients delivered from outside**.  
- Initial state = **recipe prepared using those ingredients**.  
- Changing ingredients later won’t automatically update the already prepared recipe.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you update state when props change?  
A1: Yes, using `getDerivedStateFromProps` or `componentDidUpdate`.

Q2: Should you always copy props to state?  
A2: No, only for rare cases like caching initial values.

Q3: What is the risk of syncing props to state?  
A3: It can lead to inconsistent UI if not handled correctly.

Q4: How to avoid props/state inconsistency?  
A4: Prefer using props directly in render when possible, rather than copying to state.
*/
