/*
=====================================
Async/Await in Plain React
=====================================

Definition:
Async/await in React is used to handle asynchronous operations, 
such as fetching data from APIs, in a more readable and synchronous-like manner.  
It can be used inside event handlers, useEffect hooks, or custom functions.

-------------------------------------
Key Points:
-------------------------------------
- `async` marks a function as asynchronous.  
- `await` pauses execution until a Promise resolves.  
- Always handle errors using `try/catch`.  
- Can be used in function components and event handlers.  
- Avoid making the top-level component function async; instead, define an inner async function.

-------------------------------------
Example 1: Fetch Data with useEffect
-------------------------------------
import React, { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) throw new Error("Network response not ok");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchUsers();
  }, []);

  if (error) return <div>Error: {error}</div>;
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

-------------------------------------
Example 2: Async Event Handler
-------------------------------------
function FetchButton() {
  const [message, setMessage] = React.useState("");

  const handleClick = async () => {
    try {
      const response = await fetch("https://api.example.com/data");
      const data = await response.json();
      setMessage(data.status);
    } catch (err) {
      setMessage("Error fetching data");
    }
  };

  return <button onClick={handleClick}>{message || "Fetch Data"}</button>;
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
Async/await is like ordering food 🍔 and waiting for it:  
- You "await" the delivery (Promise) before continuing to eat (next line of code).  
- `try/catch` handles the case if the food is delayed or unavailable (error handling).

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Why not make the component function itself async?
A1: React expects component functions to return JSX immediately; async functions return Promises, which breaks rendering.

Q2: Can you use async/await with useState updates?
A2: Yes, but setState itself is synchronous in React; async affects only the awaited operations.

Q3: How to handle multiple async requests simultaneously?
A3: Use Promise.all with async/await.

Q4: Is async/await supported in all browsers?
A4: Modern browsers support it; for older browsers, transpilation with Babel is needed.

Q5: Can you cancel an async request in useEffect?
A5: Yes, use AbortController to cancel fetch requests when the component unmounts.
*/
