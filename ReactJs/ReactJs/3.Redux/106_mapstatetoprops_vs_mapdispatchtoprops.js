/* 106_mapstatetoprops_vs_mapdispatchtoprops.js */

/*
=====================================
mapStateToProps vs mapDispatchToProps
=====================================

Definition:
When connecting a React component to Redux using `connect` from 
`react-redux`, we use two functions:  
- `mapStateToProps` → maps Redux store state to component props.  
- `mapDispatchToProps` → maps dispatching of actions to component props.  

-------------------------------------
mapStateToProps:
-------------------------------------
- Used to access data from the Redux store and pass it as props to a component.  
- Automatically subscribes the component to the Redux store.  
- Whenever the store updates, the component re-renders with new props.  

Example:
function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

-------------------------------------
mapDispatchToProps:
-------------------------------------
- Used to dispatch actions from a component.  
- It provides functions as props that call `dispatch` internally.  
- Keeps UI components separate from Redux logic.  

Example:
function mapDispatchToProps(dispatch) {
  return {
    increment: () => dispatch({ type: "INCREMENT" }),
    decrement: () => dispatch({ type: "DECREMENT" })
  };
}

-------------------------------------
Combined Usage Example:
-------------------------------------

import React from "react";
import { connect } from "react-redux";

function Counter({ counter, increment, decrement }) {
  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  counter: state.counter
});

const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch({ type: "INCREMENT" }),
  decrement: () => dispatch({ type: "DECREMENT" })
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

-------------------------------------
Key Difference:
-------------------------------------
- `mapStateToProps` → Reads state from store → gives data as props.  
- `mapDispatchToProps` → Dispatches actions → gives functions as props.  

-------------------------------------
Real-Life Analogy:
-------------------------------------
Think of a **TV remote**:  
- `mapStateToProps` = the **current channel number** shown on the TV screen 
  (state mapped as props).  
- `mapDispatchToProps` = the **buttons on the remote** (actions mapped as props) 
  that change the channel.  

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can we use `connect` without `mapDispatchToProps`?  
A1: Yes, if you only need to read state and not dispatch actions.  

Q2: What happens if you omit both?  
A2: The component will still receive `dispatch` as a prop by default.  

Q3: How does `mapStateToProps` impact performance?  
A3: Overusing it may cause unnecessary re-renders; selectors (like Reselect) 
    help optimize.  

Q4: In modern React, do we still use these?  
A4: Less often. The `useSelector` and `useDispatch` hooks from `react-redux` 
    are now more common.  
*/
