/* 2_purpose_of_callback_in_setstate.js */

/*
=====================================
Purpose of Callback in setState
=====================================

Definition:
In React class components, `setState` is asynchronous. To execute code 
after the state has been updated and the component has re-rendered, 
you can pass a **callback function** as the second argument to `setState`.

-------------------------------------
Key Points:
-------------------------------------

1. Asynchronous Nature of setState:
   - `setState` batches multiple state updates for performance.
   - State may not update immediately after calling `setState`.

2. Callback Function:
   - Syntax: `this.setState(updater, callback)`
   - Callback is executed after state is updated and component re-rendered.

3. Use Cases:
   - Perform actions dependent on the latest state.
   - Trigger side effects after state change.
   - Logging updated state values.

-------------------------------------
Example:
-------------------------------------
import React, { Component } from 'react';

class Counter extends Component {
  state = { count: 0 };

  increment = () => {
    // State update with callback
    this.setState(
      { count: this.state.count + 1 },
      () => {
        console.log('Updated count:', this.state.count); // Executes after re-render
      }
    );
  };

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

-------------------------------------
Analogy:
-------------------------------------
- setState is like sending a request to a printer:
  - You press the print button (call setState), but printing happens asynchronously.
  - Callback is like a notification after the document is printed (state updated and re-rendered).

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you use the callback in functional components with useState?  
A1: No, `useState` does not have a callback; use `useEffect` to react to state changes.

Q2: Why is setState asynchronous?  
A2: To batch multiple updates and improve performance by reducing unnecessary re-renders.

Q3: Can you have multiple callbacks in setState?  
A3: No, only one callback function is allowed per setState call.

Q4: What happens if you access this.state immediately after setState without a callback?  
A4: You may get the old state value because setState is asynchronous.
*/
