/* 119_different_ways_to_write_mapdispatchtoprops.js */

/*
=====================================
Different Ways to Write mapDispatchToProps in React Redux
=====================================

Definition:
`mapDispatchToProps` is a function used with the `connect` HOC in React Redux.  
It allows a component to dispatch actions to the Redux store.

-------------------------------------
1. Using Function Syntax
-------------------------------------
- Receives `dispatch` as an argument and returns an object.
- You explicitly call `dispatch` inside.

Example:
import { connect } from "react-redux";
import { increment } from "../redux/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    onIncrement: () => dispatch(increment())
  };
};

export default connect(null, mapDispatchToProps)(Counter);

-------------------------------------
2. Using Object Shorthand
-------------------------------------
- Pass an object with action creators instead of a function.
- React Redux automatically wraps them in `dispatch`.

Example:
import { connect } from "react-redux";
import { increment, decrement } from "../redux/actions";

const mapDispatchToProps = {
  onIncrement: increment,
  onDecrement: decrement
};

export default connect(null, mapDispatchToProps)(Counter);

-------------------------------------
3. Using Inline Arrow Function in connect
-------------------------------------
- Define `mapDispatchToProps` inline within `connect`.

Example:
export default connect(
  null,
  (dispatch) => ({
    onIncrement: () => dispatch(increment())
  })
)(Counter);

-------------------------------------
Best Practice:
-------------------------------------
- Use object shorthand for simplicity when no custom logic is needed.
- Use function syntax if you need to preprocess data or pass parameters dynamically.

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Function syntax: Manually writing a letter to the post office for each action.
- Object shorthand: Giving the post office pre-signed letters ready to send.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Can you use `mapDispatchToProps` with functional components?  
A1: Yes, but with hooks (`useDispatch`) it’s often simpler.

Q2: When should you prefer function syntax over object shorthand?  
A2: When you need custom logic, dynamic parameters, or preprocessing before dispatch.

Q3: Is `mapDispatchToProps` mandatory in `connect`?  
A3: No, if you don’t need to dispatch any actions, you can pass `null`.

Q4: How does `connect` know to wrap action creators in dispatch automatically?  
A4: React Redux internally uses `bindActionCreators` to wrap them for you.
*/
