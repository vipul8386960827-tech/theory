/* 51_use_connect_from_react_redux.js

=====================================================
Using connect() from react-redux
=====================================================

Definition:
The `connect()` function from `react-redux` is a Higher-Order Component (HOC)  
that connects a React component to the Redux store. It allows components to  
access state and dispatch actions as props.

-----------------------------------------------------
Key Points:
-----------------------------------------------------

1. **Purpose**
   - To bind Redux state and actions to React components.  
   - Keeps components in sync with global state.  

2. **Syntax**
   connect(mapStateToProps, mapDispatchToProps)(Component);

3. **mapStateToProps**
   - Defines which parts of Redux state become props for the component.  

4. **mapDispatchToProps**
   - Defines which action creators become props.  

5. **Alternatives**
   - Hooks (`useSelector`, `useDispatch`) are now preferred in functional components.  

-----------------------------------------------------
Example 1: Basic Usage of connect
-----------------------------------------------------
import React from "react";
import { connect } from "react-redux";

function Counter({ count, increment }) {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

// Map Redux state to props
const mapStateToProps = (state) => ({
  count: state.counter,
});

// Map dispatch actions to props
const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch({ type: "INCREMENT" }),
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(Counter);

-----------------------------------------------------
Example 2: Shorthand for mapDispatchToProps
-----------------------------------------------------
import { increment } from "./actions";

export default connect(
  (state) => ({ count: state.counter }),
  { increment } // shorthand
)(Counter);

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Think of `connect` like a **translator between two people**.  
- Redux speaks "global state/actions," while React speaks "props."  
- `connect` translates Redux into props the component can use.  

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: How does `connect` differ from `useSelector` and `useDispatch`?  
A1: `connect` is an HOC mainly used with class components, while hooks are simpler and used in functional components.  

Q2: What happens if a component connected with `connect` re-renders often?  
A2: It can cause performance issues if not optimized; `connect` uses shallow equality checks to prevent unnecessary re-renders.  

Q3: Can you use both `connect` and hooks in the same app?  
A3: Yes, but typically teams migrate fully to hooks for consistency.  

Q4: What happens if mapStateToProps returns a new object every time?  
A4: It causes unnecessary re-renders; best practice is to memoize or avoid creating new objects inside `mapStateToProps`.  
*/
