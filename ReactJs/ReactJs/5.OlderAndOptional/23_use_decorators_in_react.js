/* 23_use_decorators_in_react.js

=====================================
Using Decorators in React
=====================================

Definition:
Decorators are a JavaScript experimental feature that allows you to modify classes or class methods
using the @decorator syntax. In React, decorators are often used with higher-order components (HOCs)
to enhance components cleanly. They are not part of the official JavaScript standard and require
a Babel plugin to use.

-------------------------------------
Key Points:
-------------------------------------
1. Purpose
   - Simplifies HOC syntax.
   - Applies cross-cutting concerns (logging, authorization, theming) declaratively.

2. Syntax
   @withAuth
   class Dashboard extends React.Component { ... }
   - Equivalent to:
   class Dashboard extends React.Component { ... }
   export default withAuth(Dashboard);

3. Requirements
   - Enable Babel plugin: @babel/plugin-proposal-decorators.
   - Ensure experimental feature support in project.

4. Caution
   - Since decorators are experimental, they may change in the future.
   - Not recommended for production without considering stability.

-------------------------------------
Example:
-------------------------------------
import React, { Component } from "react";

// Example HOC
function withLogger(WrappedComponent) {
  return class extends Component {
    componentDidMount() {
      console.log("Component mounted:", WrappedComponent.name);
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

// Using decorator (requires Babel plugin)
@withLogger
class MyComponent extends Component {
  render() {
    return <h2>Hello World</h2>;
  }
}

export default MyComponent;

-------------------------------------
Analogy:
-------------------------------------
- Decorator = wrapping a gift.
- The gift (component) is the same, but the wrapping (decorator/HOC) adds extra functionality.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you use decorators with functional components?  
A1: Not directly; decorators are primarily for class components, though you can wrap functions manually.

Q2: Are decorators officially supported in JavaScript?  
A2: No, they are experimental and require Babel or TypeScript support.

Q3: Why prefer decorators over manual HOC wrapping?  
A3: Cleaner, declarative syntax and easier to apply multiple HOCs.

Q4: What are alternatives to decorators in React?  
A4: Using HOC functions directly or React hooks for functionality injection.
*/
