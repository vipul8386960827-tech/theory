/* 21_setstate_in_componentwillmount.js

=====================================
Using setState in componentWillMount
=====================================

Definition:
`componentWillMount` is a legacy React lifecycle method that is called **before the first render**.  
Using `this.setState` inside `componentWillMount` is **deprecated** and should be avoided.  
Modern React recommends initializing state in the constructor or using `componentDidMount` instead.

-------------------------------------
Key Points:
-------------------------------------
1. **Legacy Method**
   - `componentWillMount` is considered unsafe in React 16+ (`UNSAFE_componentWillMount`).
2. **Why Not setState**
   - setState here is synchronous and may trigger unnecessary re-renders.
   - React may call this method multiple times in future versions.
3. **Recommended Alternatives**
   - Initialize state in the constructor:
     ```js
     this.state = { data: null };
     ```
   - Or fetch/update state in `componentDidMount`.

-------------------------------------
Example:
-------------------------------------
import React, { Component } from "react";

class DataFetcher extends Component {
  constructor(props) {
    super(props);
    // Initialize state here
    this.state = { data: null };
  }

  componentDidMount() {
    // Correct way to update state after mount
    fetch("/api/data")
      .then(res => res.json())
      .then(data => this.setState({ data }));
  }

  render() {
    return <div>{this.state.data ? this.state.data : "Loading..."}</div>;
  }
}

-------------------------------------
Analogy:
-------------------------------------
- `componentWillMount` = **packing a bag before leaving the house**.  
- Using setState here is like **changing the bag’s content while already on the way**, which can cause confusion.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can we still use componentWillMount in React 17/18?  
A1: It's deprecated; use `UNSAFE_componentWillMount` if necessary, but not recommended.

Q2: Where should we fetch data in class components?  
A2: In `componentDidMount`.

Q3: Can setState be called in constructor?  
A3: No, use direct state assignment `this.state = {...}`.

Q4: Why did React deprecate componentWillMount?  
A4: To avoid side effects during server-side rendering and improve predictability.
*/
