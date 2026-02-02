/* 82_create_react_class_components_without_es6.js */
/* 82_create_react_class_components_without_es6.js

=====================================================
Creating React Class Components Without ES6
=====================================================

Definition:
Before ES6 classes were widely adopted, React allowed creating components using the `React.createClass` method.
This was an older approach, now deprecated, but it illustrates how components were defined without ES6 syntax.

-----------------------------------------------------
Key Points:
-----------------------------------------------------
1. Using React.createClass
   - Pass an object with lifecycle methods, render method, and state.
   Example:
     const MyComponent = React.createClass({
       getInitialState: function() {
         return { count: 0 };
       },
       handleClick: function() {
         this.setState({ count: this.state.count + 1 });
       },
       render: function() {
         return (
           <div>
             <p>Count: {this.state.count}</p>
             <button onClick={this.handleClick}>Increment</button>
           </div>
         );
       }
     });

2. State Initialization
   - Use `getInitialState` instead of constructor.

3. Autobinding
   - Methods are autobound to the component instance; no need for manual binding.

4. Deprecated in Modern React
   - React team recommends using ES6 classes or functional components with hooks.
   - `React.createClass` requires `create-react-class` package in newer React versions.

-----------------------------------------------------
Example:
-----------------------------------------------------
import React from "react";
import createReactClass from "create-react-class";

const Counter = createReactClass({
  getInitialState: function() {
    return { count: 0 };
  },
  increment: function() {
    this.setState({ count: this.state.count + 1 });
  },
  render: function() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
});

export default Counter;

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- React.createClass = old recipe for baking a cake: it works, but modern recipes (ES6 classes/hooks) are cleaner and more flexible.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why is React.createClass deprecated?  
A1: ES6 classes and hooks offer better syntax, tree-shaking, and more predictable behavior.

Q2: Are methods autobound in ES6 classes?  
A2: No, you need to bind them manually or use arrow functions.

Q3: Can you still use React.createClass in modern projects?  
A3: Only via the `create-react-class` package; not recommended.

Q4: What is the difference in state initialization between createClass and ES6 classes?  
A4: `getInitialState` vs `constructor` with `this.state`.
*/
