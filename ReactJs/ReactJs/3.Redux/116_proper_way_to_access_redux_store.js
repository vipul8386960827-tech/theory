/* 116_proper_way_to_access_redux_store.js */

/*
=====================================
Proper Way to Access Redux Store
=====================================

Definition:
The Redux store should primarily be accessed through **React-Redux bindings** 
rather than directly importing the store. This ensures that components 
re-render when the store state updates and helps maintain the unidirectional 
data flow.

-------------------------------------
Proper Ways:
-------------------------------------

1. Using `useSelector` Hook (Preferred in Functional Components)
   - Access specific slices of the Redux state inside a component.
   - Automatically subscribes to the store and re-renders when the state changes.

   Example:
   import { useSelector } from "react-redux";

   function UserProfile() {
     const user = useSelector((state) => state.user);
     return <h1>Hello, {user.name}</h1>;
   }

2. Using `useDispatch` Hook
   - Used to dispatch actions to update the Redux store.

   Example:
   import { useDispatch } from "react-redux";
   import { logout } from "../redux/authSlice";

   function LogoutButton() {
     const dispatch = useDispatch();
     return <button onClick={() => dispatch(logout())}>Logout</button>;
   }

3. Using `connect` HOC (Higher Order Component)
   - An older but still valid approach.
   - Useful when working with class components.

   Example:
   import { connect } from "react-redux";

   function Counter({ count }) {
     return <p>Count: {count}</p>;
   }

   const mapStateToProps = (state) => ({
     count: state.counter.value,
   });

   export default connect(mapStateToProps)(Counter);

-------------------------------------
Improper Way (Should Be Avoided):
-------------------------------------
- Directly importing the store and calling `store.getState()`
  - Breaks React’s reactivity (component won’t re-render on store updates).
  - Leads to tightly coupled and harder-to-test code.

   Example (❌ avoid this):
   import store from "./store";

   function BadComponent() {
     const state = store.getState(); // ❌
     return <p>{state.counter.value}</p>;
   }

-------------------------------------
Best Practice:
-------------------------------------
- Always access Redux store inside React components through **useSelector** or 
  **connect**, never directly.
- Use **useDispatch** (or mapDispatchToProps) to update the store.
- Only access the store directly in non-React files like:
  - Middleware
  - Utility functions
  - Outside the React tree (e.g., configuring API interceptors)

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why should we not directly access `store.getState()` inside components?  
A1: It won’t subscribe the component to store updates, so the UI won’t re-render 
    when the state changes.

Q2: When is it acceptable to directly access the store?  
A2: In non-UI code, like middleware, logging, or configuring network interceptors.

Q3: Difference between `useSelector` and `connect`?  
A3: `useSelector` is a hook for functional components, while `connect` is used for 
    class components or when you prefer HOCs.

Q4: Can you explain how `useSelector` knows when to re-render?  
A4: It uses strict equality (`===`) checks on the selected slice of state and 
    re-renders only when that slice changes.
*/
