/*
=====================================
React Router vs History Library
=====================================

Definition:
Both React Router and the history library are related to navigation in 
React apps, but they serve different purposes.  

- **React Router**: A high-level routing library for React that provides 
  declarative routing, components, and hooks to handle SPA navigation.  
- **History Library**: A low-level library for managing session history, 
  listening to navigation events, and programmatically navigating; 
  React Router internally uses it.

-------------------------------------
Key Points:
-------------------------------------
- React Router abstracts history management and provides Route, Link, and navigation hooks.  
- History library allows manual control over browser history stack (push, replace, go, back).  
- History library is useful in custom router implementations or non-React SPAs.  
- React Router uses history internally but provides React-specific APIs.  
- React Router v6 no longer exposes the history object directly; you use hooks like `useNavigate`.

-------------------------------------
Example 1: Using React Router
-------------------------------------
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

function Home() { return <h2>Home</h2>; }
function About() { return <h2>About</h2>; }

function NavigateButton() {
  const navigate = useNavigate();
  return <button onClick={() => navigate("/about")}>Go to About</button>;
}

function App() {
  return (
    <Router>
      <nav><Link to="/">Home</Link> | <Link to="/about">About</Link></nav>
      <NavigateButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

-------------------------------------
Example 2: Using History Library Directly
-------------------------------------
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

function goToAbout() {
  history.push("/about");
}

// You can listen to navigation changes
history.listen((location, action) => {
  console.log(action, location.pathname);
});

-------------------------------------
Real-Life Analogy:
-------------------------------------
- React Router = full GPS system 🗺️ for your app: maps routes, navigation, and handles links.  
- History library = the engine 🚗 under the hood that actually moves the user forward/back in history.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Can you use the history library without React Router?
A1: Yes, for custom routing solutions or non-React apps.

Q2: Why did React Router stop exposing history directly in v6?
A2: To encourage using declarative navigation with hooks for consistency and React patterns.

Q3: Can you replace history library in React Router?
A3: Not easily; React Router depends on history for navigation under the hood.

Q4: Which one is better for SPA routing?
A4: React Router is better because it provides declarative APIs and integrates with React.

Q5: How to programmatically navigate in React Router v6?
A5: Use the `useNavigate()` hook instead of directly using history.
*/
