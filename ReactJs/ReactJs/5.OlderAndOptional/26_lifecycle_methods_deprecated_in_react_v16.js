/* 26_lifecycle_methods_deprecated_in_react_v16.js

=====================================
Deprecated Lifecycle Methods in React v16
=====================================

Definition:
React v16 introduced changes to improve predictability and reduce bugs. 
Some lifecycle methods were deprecated because they were unsafe for async rendering
and could lead to unexpected behavior. These methods should be avoided in new code.

-------------------------------------
Deprecated Lifecycle Methods:
-------------------------------------
1. **componentWillMount()**
   - Called before mounting (before render).
   - Deprecated because it may execute multiple times in async rendering.
   - Use constructor or getDerivedStateFromProps instead.

2. **componentWillReceiveProps(nextProps)**
   - Called before receiving new props.
   - Deprecated because it often caused side effects and bugs.
   - Use static getDerivedStateFromProps instead.

3. **componentWillUpdate(nextProps, nextState)**
   - Called before updating due to state/props change.
   - Deprecated due to async rendering issues.
   - Use getSnapshotBeforeUpdate instead for capturing pre-update info.

-------------------------------------
Replacement Methods:
-------------------------------------
- **constructor(props)** → Initialization
- **static getDerivedStateFromProps(props, state)** → Updating state from props
- **getSnapshotBeforeUpdate(prevProps, prevState)** → Capturing snapshot before DOM update

-------------------------------------
Example:
-------------------------------------
import React, { Component } from "react";

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  static getDerivedStateFromProps(props, state) {
    return null;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("Snapshot before update");
    return null;
  }

  componentDidMount() {
    console.log("Component mounted");
  }

  componentDidUpdate() {
    console.log("Component updated");
  }

  render() {
    return <h1>Count: {this.state.count}</h1>;
  }
}

export default MyComponent;

-------------------------------------
Analogy:
-------------------------------------
- Deprecated methods = old shortcuts in a building renovation.
  - They worked before but now may cause instability.
  - New methods = stable and safe ways to handle updates.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why were these methods deprecated?  
A1: They are unsafe for async rendering and can lead to inconsistent state or side effects.

Q2: Can old components still use these methods?  
A2: Yes, they work with warnings, but new development should avoid them.

Q3: Which method replaces componentWillReceiveProps?  
A3: static getDerivedStateFromProps replaces it.

Q4: Can getSnapshotBeforeUpdate replace componentWillUpdate fully?  
A4: Yes, for capturing info before DOM changes, combined with componentDidUpdate.
*/
