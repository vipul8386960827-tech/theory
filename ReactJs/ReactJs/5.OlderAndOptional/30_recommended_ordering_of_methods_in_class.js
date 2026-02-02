/* 30_recommended_ordering_of_methods_in_class.js

=====================================
Recommended Ordering of Methods in React Class Components
=====================================

Definition:
React class components can have multiple lifecycle methods, event handlers, and custom 
methods. Following a consistent **method order** improves readability, maintainability, 
and team collaboration.

-------------------------------------
Recommended Method Order:
-------------------------------------
1. **Static properties / methods**
   - `static defaultProps`
   - `static propTypes`
   - `static getDerivedStateFromProps`

2. **Constructor**
   - Initialize state
   - Bind methods (if not using arrow functions)

3. **Lifecycle Methods (Mounting)**
   - `componentDidMount`

4. **Lifecycle Methods (Updating)**
   - `shouldComponentUpdate`
   - `getSnapshotBeforeUpdate`
   - `componentDidUpdate`

5. **Event Handlers / Custom Methods**
   - Handlers like `handleClick`, `fetchData`
   - Utility methods specific to the component

6. **Lifecycle Methods (Unmounting)**
   - `componentWillUnmount`

7. **Render Method**
   - `render()` should always be last
   - Contains JSX to display

-------------------------------------
Example:
-------------------------------------
import React, { Component } from "react";
import PropTypes from "prop-types";

class MyComponent extends Component {
  // 1. Static properties
  static propTypes = {
    name: PropTypes.string,
  };

  static defaultProps = {
    name: "Guest",
  };

  // 2. Constructor
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  // 3. componentDidMount
  componentDidMount() {
    console.log("Mounted");
  }

  // 4. shouldComponentUpdate
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.count !== this.state.count;
  }

  // 5. Custom method
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  // 6. componentWillUnmount
  componentWillUnmount() {
    console.log("Unmounting");
  }

  // 7. Render method
  render() {
    return (
      <div>
        <h2>Hello {this.props.name}</h2>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default MyComponent;

-------------------------------------
Analogy:
-------------------------------------
- Think of a **class component like a book**:
  - Static properties = Title page
  - Constructor = Preface
  - Lifecycle methods = Chapters (Mounting, Updating, Unmounting)
  - Custom methods = Side notes / exercises
  - Render = Conclusion / final output

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Is it mandatory to follow this order?  
A1: No, React will work, but following this order improves readability.

Q2: Where should event handlers go in the class?  
A2: After lifecycle methods but before `render()`.

Q3: Can `render()` be placed anywhere?  
A3: Technically yes, but conventionally it should always be last.

Q4: What about arrow functions vs bound methods?  
A4: Arrow functions can be declared anywhere; bound methods usually in constructor.
*/
