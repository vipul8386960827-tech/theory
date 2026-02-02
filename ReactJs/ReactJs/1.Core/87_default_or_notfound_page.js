/*
=====================================
Default / Not Found Page in React Router
=====================================

Definition:
A default or "Not Found" page is displayed when no route matches 
the current URL. It helps handle invalid or unknown routes in SPAs.

-------------------------------------
Key Points:
-------------------------------------
- In React Router v5, use `<Switch>` with a `<Route path="*">`.  
- In React Router v6, use `<Routes>` with a `<Route path="*">`.  
- Always place the "Not Found" route last to catch unmatched paths.

-------------------------------------
Example 1: React Router v5
-------------------------------------
import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function Home() { return <h2>Home Page</h2>; }
function About() { return <h2>About Page</h2>; }
function NotFound() { return <h2>404 - Page Not Found</h2>; }

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="*" component={NotFound} /> {/* Default Route 
      </Switch>
    </Router>
  );
}

-------------------------------------
Example 2: React Router v6
-------------------------------------
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} /> {/* Default Route
      </Routes>
    </Router>
  );
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Default page = “Lost tourist 🚶‍♂️” sign.  
- Shows the user that they navigated to an invalid path and provides directions back.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Can you customize the 404 page per route section?
A1: Yes, create nested "Not Found" routes inside parent Routes.

Q2: Should the default route redirect or show a component?
A2: Usually show a component for UX; redirection is optional.

Q3: Does path="*" match query params too?
A3: Yes, it matches the path regardless of query parameters.

Q4: Can we add navigation back to home from 404?
A4: Yes, include a Link or button to navigate back.

Q5: How to handle default routes in server-side rendering?
A5: Configure server to always serve index.html for unmatched paths; React Router will show NotFound component.
*/
