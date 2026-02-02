/* 48_ajax_call_and_lifecycle_methods.js

=====================================================
AJAX Calls and Lifecycle Methods in React
=====================================================

Definition:
AJAX (Asynchronous JavaScript and XML) calls are used to fetch or send data to a server without  
reloading the page. In React, AJAX calls are commonly made in lifecycle methods or hooks.

-----------------------------------------------------
Key Points:
-----------------------------------------------------

1. **Where to Make AJAX Calls**
   - **Class Components:**  
     - `componentDidMount`: Best place to fetch data after the component mounts.  
     - `componentDidUpdate`: For refetching when props/state change.  
     - `componentWillUnmount`: For cleanup (e.g., aborting requests).  

   - **Functional Components:**  
     - `useEffect`: Equivalent of `componentDidMount` and `componentDidUpdate`.  

2. **Why Not Constructor or Render**
   - Constructor: Should only initialize state, not perform side-effects.  
   - Render: Must be pure, no async calls or side-effects.  

3. **Error Handling**
   - Always use `.catch()` or `try/catch` with `async/await`.  
   - Consider setting a loading state and error state.  

4. **Best Practice**
   - Use `async/await` for readability.  
   - Use `AbortController` or cleanup functions to cancel requests when unmounted.  

-----------------------------------------------------
Example 1: Class Component with componentDidMount
-----------------------------------------------------
import React, { Component } from "react";

class Users extends Component {
  state = { users: [], loading: true };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => this.setState({ users: data, loading: false }))
      .catch(err => console.error(err));
  }

  render() {
    const { users, loading } = this.state;
    return (
      <div>
        {loading ? <p>Loading...</p> : users.map(u => <p key={u.id}>{u.name}</p>)}
      </div>
    );
  }
}

-----------------------------------------------------
Example 2: Functional Component with useEffect
-----------------------------------------------------
import React, { useState, useEffect } from "react";

function UsersFunctional() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setUsers(data);
          setLoading(false);
        }
      });
    return () => {
      isMounted = false; // cleanup to prevent state updates after unmount
    };
  }, []);

  return (
    <div>
      {loading ? <p>Loading...</p> : users.map(u => <p key={u.id}>{u.name}</p>)}
    </div>
  );
}

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Think of a component as a **restaurant table**.  
- When the customer (component) arrives (`componentDidMount`), the waiter (AJAX call) takes the order.  
- If the customer leaves (`componentWillUnmount`), the waiter stops serving that table.  

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Why is `componentDidMount` better than `constructor` for AJAX calls?  
A1: Because the component is guaranteed to be mounted before setting state, avoiding race conditions.  

Q2: How do you cancel an API request in React?  
A2: Use `AbortController` (for fetch) or cancellation tokens (for axios).  

Q3: How would you handle loading and error states?  
A3: Maintain separate `loading` and `error` states in your component.  

Q4: What’s the difference between AJAX calls in class vs functional components?  
A4: Class components use lifecycle methods, while functional components rely on `useEffect`.  
*/
