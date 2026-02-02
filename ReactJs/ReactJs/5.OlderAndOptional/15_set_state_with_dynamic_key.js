/* 15_set_state_with_dynamic_key.js

=====================================
setState with Dynamic Key in React
=====================================

Definition:
In React, you can update a component's state dynamically using computed property names 
([key]). This allows you to update a specific state property based on a variable, 
rather than hardcoding the key.

-------------------------------------
Key Points:
-------------------------------------
1. Useful for handling multiple input fields with a single onChange handler.
2. Works in both class components (this.setState) and functional components (useState).
3. Only the targeted property is updated, other state properties remain unchanged.

-------------------------------------
Example (Class Component):
-------------------------------------
import React, { Component } from "react";

class DynamicForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "" };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }); // dynamic key update
  };

  render() {
    return (
      <div>
        <input name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name" />
        <input name="email" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
        <div>Name: {this.state.name}, Email: {this.state.email}</div>
      </div>
    );
  }
}

-------------------------------------
Example (Functional Component):
-------------------------------------
import React, { useState } from "react";

function DynamicFormFunc() {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value })); // dynamic key update
  };

  return (
    <div>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <div>Name: {form.name}, Email: {form.email}</div>
    </div>
  );
}

-------------------------------------
Analogy:
-------------------------------------
- Dynamic key update is like labeling multiple boxes and updating only the content 
  of the box that matches the label.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why use computed property names ([key]) in setState?  
A1: To dynamically choose which state property to update without hardcoding.

Q2: Can this approach work with deeply nested objects?  
A2: Yes, but immutability helpers like spread operator or Immer are recommended.

Q3: Difference between class and functional components for dynamic state update?  
A3: Class components merge state automatically with this.setState, functional components 
    require manually merging using the spread operator.

Q4: Can this pattern be used for arrays in state?  
A4: Yes, but ensure immutability by creating a new array copy when updating.
*/
