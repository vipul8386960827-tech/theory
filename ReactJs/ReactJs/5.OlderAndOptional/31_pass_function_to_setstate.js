/* 31_pass_function_to_setstate.js

=====================================
Passing a Function to setState in React
=====================================

Definition:
In React, `setState` can accept either an **object** or a **function**. 
Passing a function is recommended when the new state depends on the previous state, 
ensuring correct state updates in asynchronous scenarios.

-------------------------------------
Key Points:
-------------------------------------
1. Object Form
   - Directly provides new state.
   - Can cause bugs if multiple state updates are batched.

   this.setState({ count: this.state.count + 1 });

2. Function Form
   - Receives previous state and props.
   - Ensures the latest state is used.

   this.setState((prevState, props) => ({
     count: prevState.count + 1
   }));

-------------------------------------
Example:
-------------------------------------
import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  incrementIncorrect = () => {
    // Object form - may be buggy if multiple updates occur
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });
  };

  incrementCorrect = () => {
    // Function form - reliable
    this.setState((prevState) => ({ count: prevState.count + 1 }));
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.incrementIncorrect}>Increment Incorrect</button>
        <button onClick={this.incrementCorrect}>Increment Correct</button>
      </div>
    );
  }
}

export default Counter;

-------------------------------------
Analogy:
-------------------------------------
- Object form = writing a new note without checking the old one → risk of overwriting.
- Function form = reading the current note and then updating it → safe and consistent.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why should we prefer function form over object form?  
A1: To avoid stale state issues when updates are asynchronous or batched.

Q2: Can we use props inside the function form?  
A2: Yes, the function receives `(prevState, props)`.

Q3: What happens if you call object form twice in a row?  
A3: The second call might overwrite the first if updates are batched.

Q4: Is function form required for independent state updates?  
A4: No, only necessary when new state depends on previous state.
*/
