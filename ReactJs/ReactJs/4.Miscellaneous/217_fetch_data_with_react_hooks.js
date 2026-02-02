/* 217_fetch_data_with_react_hooks.js

=====================================
Fetch Data with React Hooks
=====================================

Definition:
React **Hooks** such as `useState` and `useEffect` allow functional components 
to fetch data and manage state without using class components and lifecycle methods.

-------------------------------------
Key Points:
-------------------------------------
1. `useState` stores data, loading status, and errors.  
2. `useEffect` performs side effects like API calls after component mounts.  
3. Async functions are used inside `useEffect` to handle promises.  
4. Cleanup can prevent memory leaks if the component unmounts before fetch completes.  

-------------------------------------
Guidelines:
-------------------------------------
- Fetch data in `useEffect` to avoid multiple calls on each render.  
- Maintain separate state variables for `loading` and `error`.  
- Cancel or ignore fetch if the component unmounts during the request.  

-------------------------------------
Example:
-------------------------------------
import React, { useState, useEffect } from "react";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Network error");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures it runs once on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

-------------------------------------
Analogy:
-------------------------------------
- `useEffect` = **manual trigger after component mounts**.  
- `useState` = **storage box** for fetched data, errors, or loading status.  
- Together, they allow components to **fetch, store, and display data** efficiently.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: Why use `useEffect` for fetching instead of fetch in render?  
A1: Fetching in render causes infinite loops and multiple requests.

Q2: How to prevent state updates if component unmounts?  
A2: Use cleanup function or a flag to ignore state updates after unmount.

Q3: Can you fetch data on state or prop change?  
A3: Yes, include those variables in the `useEffect` dependency array.

Q4: How to handle fetch errors in hooks?  
A4: Use try/catch and maintain an `error` state to display error messages.
*/
