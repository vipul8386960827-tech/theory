/* 33_constructor_vs_getinitialstate.js

=====================================
Constructor vs getInitialState in React
=====================================

Definition:
React components can define initial state in **two ways** depending on the component type 
and version of React being used.

-------------------------------------
Key Points:
-------------------------------------

1. getInitialState (Legacy)
   - Used in **React.createClass** (pre-ES6 classes).
   - Method returns an object representing the initial state.
   - Deprecated since ES6 class components were introduced.
   Example:
     const MyComponent = React.createClass({
       getInitialState() {
         return { count: 0 };
       },
       render() { return <div>{this.state.count}</div>; }
     });

2. Constructor (ES6 Classes)
   - Used in **class components**.
   - Initializes `this.state` object directly.
   - Can also bind event handlers here.
   Example:
     class MyComponent extends React.Component {
       constructor(props) {
         super(props);
         this.state = { count: 0 };
       }
       render() { return <div>{this.state.count}</div>; }
     }

-------------------------------------
Differences:
-------------------------------------
- **Syntax:** getInitialState is a method; constructor uses `this.state`.
- **Component Type:** getInitialState works only with React.createClass; constructor works with ES6 classes.
- **Deprecation:** getInitialState is deprecated; constructor is standard now.
- **Props Access:** In constructor, `props` must be passed to `super(props)`.

-------------------------------------
Analogy:
-------------------------------------
- getInitialState = filling a form for the first time using a template.
- Constructor = writing your own initial values explicitly before the component starts.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you use getInitialState in ES6 class components?  
A1: No, it only works with React.createClass which is now deprecated.

Q2: Why do we call super(props) in constructor?  
A2: To properly initialize `this.props` before using it in constructor.

Q3: Can state be set outside constructor in class components?  
A3: Yes, using class fields syntax: `state = { count: 0 }`.

Q4: Are functional components allowed to have constructors?  
A4: No, they use hooks like `useState` to manage state.
*/
