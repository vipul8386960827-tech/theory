/*
=====================================
"Router should have only one child element" Warning
=====================================

Definition:
In React Router (v4/v5), the <Router> component expects exactly one 
direct child element. If you pass multiple sibling elements directly, 
React will throw a warning.

-------------------------------------
Key Points:
-------------------------------------
- Occurs when multiple elements are passed without wrapping.  
- Can be fixed by wrapping children in a single container: <div> or <> (Fragment).  
- Applies to BrowserRouter, HashRouter, MemoryRouter, etc.

-------------------------------------
Example 1: Incorrect Usage (Causes Warning)
-------------------------------------
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";

function App() {
  return (
    <Router>
      <Home />
      <About />
    </Router>
  );
}

-------------------------------------
Example 2: Correct Usage with div
-------------------------------------
function App() {
  return (
    <Router>
      <div>
        <Home />
        <About />
      </div>
    </Router>
  );
}

-------------------------------------
Example 3: Correct Usage with Fragment
-------------------------------------
import React from "react";

function App() {
  return (
    <Router>
      <>
        <Home />
        <About />
      </>
    </Router>
  );
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Router = container room 🏠 for routes.  
- All rooms (routes) must fit inside a single building (child).  
- Multiple rooms directly outside the building = warning.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Can we use multiple Routes directly without a wrapper?
A1: No, must wrap with a single element like div or Fragment.

Q2: Does Fragment affect the DOM?
A2: No, it won’t add extra nodes to the DOM like a div would.

Q3: Why does Router enforce a single child?
A3: Internally, Router expects one React element to manage context.

Q4: Does this warning occur in v6?
A4: Rarely, because v6 recommends using <Routes> inside Router as a single child.

Q5: Can we wrap with another Router?
A5: Nesting Routers is possible but still each Router must have one child.
*/
