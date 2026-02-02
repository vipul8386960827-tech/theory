/* 52_purpose_of_at_symbol_in_redux_connect.js

=====================================================
Purpose of the @ Symbol in Redux Connect
=====================================================

Definition:
The `@` symbol in React-Redux code examples is **not a Redux feature itself**,  
but rather **JavaScript decorator syntax**. It is often used with `connect()`  
to make the code cleaner when attaching Redux store data to class components.

-----------------------------------------------------
Key Points:
-----------------------------------------------------

1. **@connect Syntax**
   - Instead of wrapping a component like:
     export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
   - You can write:
     @connect(mapStateToProps, mapDispatchToProps)
     class MyComponent extends React.Component { ... }

2. **Requirement**
   - Decorators are an experimental JavaScript feature.  
   - You must enable Babel plugin: `@babel/plugin-proposal-decorators`.  

3. **Purpose**
   - Provides syntactic sugar for using HOCs like `connect`.  
   - Makes the code more declarative and readable.  

4. **Modern Alternatives**
   - React hooks (`useSelector`, `useDispatch`) are now recommended  
     instead of decorators with `connect`.  

-----------------------------------------------------
Example: Using @connect
-----------------------------------------------------
import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  count: state.counter,
});

const mapDispatchToProps = {
  increment: () => ({ type: "INCREMENT" }),
};

@connect(mapStateToProps, mapDispatchToProps)
class Counter extends Component {
  render() {
    const { count, increment } = this.props;
    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;

-----------------------------------------------------
Equivalent Without @ Symbol
-----------------------------------------------------
class Counter extends Component { ... }

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Using `@connect` is like **sticking a label on a box** instead of  
  taping a piece of paper on it. Both identify the box, but one looks cleaner.  

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Is the `@` symbol required for Redux connect?  
A1: No, it’s just syntactic sugar; `connect()` works without decorators.  

Q2: Are decorators part of official JavaScript?  
A2: Not yet; they’re experimental and need Babel/TypeScript support.  

Q3: What’s the modern alternative to using decorators with connect?  
A3: Using React hooks (`useSelector`, `useDispatch`).  

Q4: Why might a team avoid `@connect` in production?  
A4: Because decorators are experimental and may change in future JavaScript versions.  
*/
