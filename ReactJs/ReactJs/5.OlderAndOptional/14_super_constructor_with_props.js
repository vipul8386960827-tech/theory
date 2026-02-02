/* 14_super_constructor_with_props.js

=====================================
Super Constructor with Props in React
=====================================

Definition:
In React **class components**, the `super(props)` call in the constructor is used to 
pass `props` to the parent class (`React.Component`). This ensures that `this.props` 
is correctly initialized and accessible in the constructor.

-------------------------------------
Key Points:
-------------------------------------
1. Always call `super(props)` before using `this` in the constructor.
2. Without `super(props)`, `this.props` will be undefined inside the constructor.
3. Necessary only if you need to access `props` in the constructor; otherwise, it’s optional.

-------------------------------------
Example:
-------------------------------------
import React, { Component } from "react";

class Welcome extends Component {
  constructor(props) {
    super(props); // Pass props to React.Component
    console.log("Props in constructor:", this.props);
    this.state = { message: "Hello" };
  }

  render() {
    return (
      <div>
        {this.state.message}, {this.props.name}!
      </div>
    );
  }
}

// Usage
// <Welcome name="Kaizer" />

-------------------------------------
Analogy:
-------------------------------------
- Calling `super(props)` is like passing your personal notes to your supervisor 
  before starting a project; otherwise, the supervisor doesn’t know your details.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: What happens if you don’t call `super(props)` in a class component?  
A1: Accessing `this.props` in the constructor will throw an error; the component 
    will not have `props` initialized.

Q2: Can you omit `props` in `super()`?  
A2: Yes, if you don’t need `this.props` in the constructor, but it’s good practice 
    to include it.

Q3: Why is `super()` required at all in a constructor?  
A3: Because the class extends React.Component, and the parent constructor needs to be 
    called to initialize the component correctly.

Q4: Is `super(props)` needed in functional components?  
A4: No, functional components don’t have constructors or `this`; props are accessed 
    directly as function arguments.
*/
