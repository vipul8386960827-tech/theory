/* 54_statics_object_with_es6_classes.js

=====================================================
Statics Object with ES6 Classes in React
=====================================================

Definition:
In React (before ES6 classes), static properties like `propTypes` and `defaultProps`  
were usually defined inside a `statics` object. With ES6 classes, you can define them  
using the `static` keyword directly on the class.

-----------------------------------------------------
Key Points:
-----------------------------------------------------

1. **Before ES6 (createClass syntax)**
   - You had a `statics` object for defining static methods and properties.  
   - Example:
     const MyComponent = React.createClass({
       statics: {
         customMethod() {
           return "I am static!";
         }
       },
       render() {
         return <div>Hello</div>;
       }
     });

2. **With ES6 Classes**
   - You use the `static` keyword to define static methods and properties.  
   - Example:
     class MyComponent extends React.Component {
       static customMethod() {
         return "I am static!";
       }
       render() {
         return <div>Hello</div>;
       }
     }

3. **Usage in React**
   - Commonly used for:
     - `propTypes`
     - `defaultProps`
     - Custom static helper methods

4. **Access**
   - Static properties are accessed on the class itself, not instances.  
   - Example:
     MyComponent.customMethod(); ✅
     const comp = new MyComponent();
     comp.customMethod(); ❌ (Not accessible this way)

-----------------------------------------------------
Example: Using Static in ES6 Class
-----------------------------------------------------
import React from "react";
import PropTypes from "prop-types";

class Greeting extends React.Component {
  // Define default props
  static defaultProps = {
    name: "Guest"
  };

  // Define prop types
  static propTypes = {
    name: PropTypes.string
  };

  // Custom static method
  static sayHello() {
    return "Hello from static method!";
  }

  render() {
    return <h2>Hello, {this.props.name}</h2>;
  }
}

// Usage
console.log(Greeting.sayHello()); // "Hello from static method!"

export default Greeting;

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Static methods in classes are like **utility functions inside a toolbox**.  
- You don’t need an object (instance) to use them; you just open the toolbox (class) directly.  

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why do we use static properties in React classes?  
A1: To define shared metadata like `propTypes`, `defaultProps`, or utility functions.  

Q2: Can you access static methods from a component instance?  
A2: No, they are only accessible from the class itself.  

Q3: Are static methods inherited in subclasses?  
A3: Yes, subclasses can inherit static methods from parent classes.  

Q4: How would you migrate from `statics` in createClass to ES6 classes?  
A4: Replace `statics` with `static` keyword inside the ES6 class.  
*/
