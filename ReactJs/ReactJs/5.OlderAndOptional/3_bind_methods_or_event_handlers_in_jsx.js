/* 3_bind_methods_or_event_handlers_in_jsx.js */

/*
=====================================
Binding Methods or Event Handlers in JSX
=====================================

Definition:
In React class components, event handler methods do not automatically bind `this` 
to the component instance. To access `this.state` or `this.props` inside a method, 
you need to **bind the method** either in the constructor, inline, or using class fields.

-------------------------------------
Key Points:
-------------------------------------

1. Why Binding is Needed:
   - In JavaScript, class methods are not bound by default.
   - Without binding, `this` inside the method is `undefined` or incorrect.

2. Ways to Bind:
   a) Bind in Constructor:
      ```js
      this.handleClick = this.handleClick.bind(this);
      ```
   b) Arrow Function as Class Property (ES6):
      ```js
      handleClick = () => { ... }
      ```
   c) Inline Arrow Function in JSX:
      ```js
      <button onClick={() => this.handleClick()}>Click</button>
      ```

3. Pros & Cons:
   - Constructor binding: Efficient, avoids creating new function on every render.
   - Arrow function in JSX: Easy, but creates a new function every render (minor performance cost).

-------------------------------------
Example:
-------------------------------------
import React, { Component } from 'react';

class Clicker extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };

    // ✅ Bind in constructor
    this.increment = this.increment.bind(this);
  }

  // Method using bound 'this'
  increment() {
    this.setState(prev => ({ count: prev.count + 1 }));
  }

  // Arrow function as class property
  decrement = () => {
    this.setState(prev => ({ count: prev.count - 1 }));
  };

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
        {/* Inline arrow function 
        <button onClick={() => this.setState({ count: 0 })}>Reset</button>
      </div>
    );
  }
}

-------------------------------------
Analogy:
-------------------------------------
- Binding is like giving a key to a worker:
  - Without a key, the worker (method) cannot access the building (component state/props).
  - Binding ensures the method has the correct access to its component instance.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why can’t we directly call this.state in an unbound method?  
A1: Because `this` will be undefined or incorrect; binding ensures proper context.

Q2: Which binding method is preferred?  
A2: Arrow function as class property or constructor binding. Avoid inline functions in render for performance in large lists.

Q3: Do functional components require binding?  
A3: No, functional components use hooks and arrow functions that automatically have the correct `this` context.

Q4: What happens if you forget to bind a method?  
A4: `TypeError: Cannot read property 'setState' of undefined` when calling the method.
*/
