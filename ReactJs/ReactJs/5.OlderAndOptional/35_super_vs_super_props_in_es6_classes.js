/* 35_super_vs_super_props_in_es6_classes.js

=====================================
super() vs super(props) in ES6 Classes
=====================================

Definition:
In ES6 class-based React components, `super()` is used to call the parent class 
constructor (usually `React.Component`). Passing `props` to `super` makes the props 
available inside the constructor via `this.props`.

-------------------------------------
Key Points:
-------------------------------------

1. Using super()
   - Calls the parent constructor.
   - If you don’t need props in the constructor, you can simply use `super()`.
   Example:
     class MyComponent extends React.Component {
       constructor() {
         super();
       }
     }

2. Using super(props)
   - Passes props to the parent constructor.
   - Required if you want to access `this.props` inside the constructor.
   Example:
     class MyComponent extends React.Component {
       constructor(props) {
         super(props);
         console.log(this.props); // Now accessible
       }
     }

3. React Recommendation
   - Always use `super(props)` if you plan to access props in the constructor.
   - If you don’t access props in constructor, `super()` is enough.

-------------------------------------
Analogy:
-------------------------------------
- `super()` = calling the parent's constructor, like asking your manager for instructions.
- `super(props)` = calling the parent's constructor and giving it some initial data (props) for setup.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: What happens if you access this.props without passing props to super?  
A1: `this.props` will be undefined inside the constructor, causing errors.

Q2: Can you omit constructor entirely in class components?  
A2: Yes, if you don’t need to initialize state or access props in constructor.

Q3: Is super() mandatory in a subclass?  
A3: Yes, you must call `super()` before using `this` in a constructor.

Q4: Does functional component need super()?  
A4: No, functional components don’t have constructors.
*/
