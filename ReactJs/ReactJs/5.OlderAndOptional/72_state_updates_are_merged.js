/* 72_state_updates_are_merged.js */
/* 72_state_updates_are_merged.js

=====================================================
State Updates are Merged in React
=====================================================

Definition:
In React class components, multiple calls to `setState` are **shallowly merged** into the component’s current state.
This means only the properties you specify are updated; other state properties remain unchanged.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Merging Behavior
   - `setState` merges new state with existing state.
   - Only top-level properties are merged (shallow merge).
   - Nested objects are not merged automatically.

2. Functional Updates
   - When new state depends on previous state, use functional form:
     this.setState(prevState => ({ count: prevState.count + 1 }));

3. Batch Updates
   - Multiple `setState` calls inside event handlers may be batched for performance.

-----------------------------------------------------
Example:
-----------------------------------------------------
import React, { Component } from "react";

class UserProfile extends Component {
  state = {
    name: "Alice",
    age: 25,
    location: "NY"
  };

  updateName = () => {
    this.setState({ name: "Bob" });
    // age and location remain unchanged
  };

  incrementAge = () => {
    this.setState(prevState => ({ age: prevState.age + 1 }));
  };

  render() {
    return (
      <div>
        <h2>Name: {this.state.name}</h2>
        <h2>Age: {this.state.age}</h2>
        <h2>Location: {this.state.location}</h2>
        <button onClick={this.updateName}>Change Name</button>
        <button onClick={this.incrementAge}>Increment Age</button>
      </div>
    );
  }
}

export default UserProfile;

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Shallow merge = updating one field in a form without overwriting other fields.
- Each `setState` only changes what you specify; the rest stays intact.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Are state updates in functional components merged automatically?  
A1: No, `useState` replaces the state entirely; merging must be handled manually.

Q2: What happens if you try to update a nested object in state?  
A2: Only the top-level object reference changes; nested properties need manual merging (spread operator or immutability helpers).

Q3: Why use functional updates with `setState`?  
A3: To ensure correct state updates when new state depends on previous state, especially with batched updates.

Q4: Can `setState` take a callback?  
A4: Yes, second argument to `setState` is a callback executed after the state has been updated.
*/
