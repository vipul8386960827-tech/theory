/*
=====================================
React Router in React
=====================================

Definition:
React Router is a library for handling navigation and routing 
in React applications. It enables single-page applications (SPAs) 
to have multiple views without full page reloads.

-------------------------------------
Key Points:
-------------------------------------
- Provides declarative routing via components.  
- Supports dynamic routes, nested routes, and route parameters.  
- Works with BrowserRouter, HashRouter, MemoryRouter, etc.  
- Enables navigation using <Link>, <NavLink>, and programmatic routing with useNavigate.  
- Compatible with React Hooks and functional components.

-------------------------------------
Example 1: Basic Setup
-------------------------------------
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() { return <h2>Home Page</h2>; }
function About() { return <h2>About Page</h2>; }

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

-------------------------------------
Example 2: Dynamic Route with Params
-------------------------------------
import { useParams } from "react-router-dom";

function User() {
  const { id } = useParams();
  return <h2>User ID: {id}</h2>;
}

// Route
<Route path="/user/:id" element={<User />} />

-------------------------------------
Example 3: Programmatic Navigation
-------------------------------------
import { useNavigate } from "react-router-dom";

function LoginButton() {
  const navigate = useNavigate();
  const handleLogin = () => { 
    // After login, navigate to dashboard
    navigate("/dashboard"); 
  };
  return <button onClick={handleLogin}>Login</button>;
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
React Router is like a GPS 🗺️ in a city:  
- It directs users to different “locations” (pages)  
- Without making them exit the app (full page reload).

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Difference between BrowserRouter and HashRouter?
A1: BrowserRouter uses HTML5 history API; clean URLs.  
   HashRouter uses URL hash (#) to maintain state; better for static servers.

Q2: Can you have nested routes?
A2: Yes, you can define child routes inside parent routes.

Q3: How do you handle 404 pages?
A3: Add a Route with path="*" at the end.

Q4: Can you protect routes?
A4: Yes, using PrivateRoute components or conditional rendering based on auth.

Q5: Difference between Link and NavLink?
A5: NavLink applies an active class when the route matches, useful for styling navigation.
*/
