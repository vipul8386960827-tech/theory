/* 50_dispatch_action_on_load.js

=====================================================
Dispatching an Action on Component Load in React/Redux
=====================================================

Definition:
In a React-Redux application, we often need to **dispatch an action immediately when a component loads**.  
This is usually done to fetch data or initialize state.

-----------------------------------------------------
Key Points:
-----------------------------------------------------

1. **When to Dispatch**
   - On initial render (component mount).  
   - Typically in `componentDidMount` (class components) or `useEffect` (functional components).  

2. **Why**
   - Automatically triggers data fetching.  
   - Keeps UI and state in sync from the beginning.  

3. **How**
   - Import `useDispatch` (for functional) or connect HOC (for class).  
   - Call `dispatch(actionCreator())` inside lifecycle method or hook.  

4. **Best Practice**
   - Use `useEffect` with an empty dependency array `[]` for one-time dispatch on mount.  

-----------------------------------------------------
Example 1: Functional Component with useEffect
-----------------------------------------------------
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./actions";

function Users() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch action on load
    dispatch(fetchUsers());
  }, [dispatch]);

  return <div>Users Component</div>;
}

-----------------------------------------------------
Example 2: Class Component with componentDidMount
-----------------------------------------------------
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "./actions";

class UsersClass extends Component {
  componentDidMount() {
    this.props.fetchUsers(); // dispatch on load
  }

  render() {
    return <div>Users Component</div>;
  }
}

export default connect(null, { fetchUsers })(UsersClass);

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Imagine entering a **restaurant** (component mount).  
- The waiter automatically brings you **water** (dispatch action) before you ask.  

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why use `useEffect` with `[]` for dispatch?  
A1: To ensure the action only runs once when the component mounts.  

Q2: What if the action should run when props change?  
A2: Add the relevant props to the dependency array in `useEffect`.  

Q3: Can you dispatch multiple actions on load?  
A3: Yes, just call `dispatch()` multiple times inside the same `useEffect` or `componentDidMount`.  

Q4: How do you test dispatching on component load?  
A4: Use libraries like React Testing Library with Jest to check if the action creator was called.  
*/
