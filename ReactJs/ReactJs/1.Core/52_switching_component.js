/*
=====================================
Switching Components in React
=====================================

Definition:
Switching components in React means rendering one component instead 
of another based on some condition (like state, props, or route).  
It’s a common pattern for conditional UI updates.

-------------------------------------
Key Points:
-------------------------------------
- Can be achieved using conditional rendering (if/else, ternary operators).  
- Often used for toggling views (login vs dashboard, light mode vs dark mode).  
- In routing, "Switch" (React Router v5) or "Routes" (React Router v6) 
  help render only the first matched route.  
- Useful for feature flags, authentication flows, tab switching.  

-------------------------------------
Example 1: Ternary Operator
-------------------------------------
function App({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <Dashboard /> : <Login />}
    </div>
  );
}

-------------------------------------
Example 2: State-Based Switching
-------------------------------------
function ToggleView() {
  const [view, setView] = React.useState("list");

  return (
    <div>
      <button onClick={() => setView("list")}>List View</button>
      <button onClick={() => setView("grid")}>Grid View</button>

      {view === "list" ? <ListView /> : <GridView />}
    </div>
  );
}

-------------------------------------
Example 3: Switch Using Mapping
-------------------------------------
function App() {
  const [page, setPage] = React.useState("home");

  const components = {
    home: <Home />,
    about: <About />,
    contact: <Contact />
  };

  return (
    <div>
      <nav>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("about")}>About</button>
        <button onClick={() => setPage("contact")}>Contact</button>
      </nav>
      {components[page]}
    </div>
  );
}

-------------------------------------
Example 4: Switching with React Router
-------------------------------------
// React Router v6
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
Switching components is like a TV remote 📺 — pressing a button 
changes the channel (component) displayed on the same screen.  

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: What’s the difference between conditional rendering and React Router?
A1: Conditional rendering switches UI based on logic in the component.  
    React Router switches based on the URL path.

Q2: Which approach is best for tab navigation?
A2: State-based switching (using if/else or mapping) is best.  

Q3: Why use mapping for switching components?
A3: It avoids long if/else chains and makes adding new views easier.  

Q4: How does React handle switching efficiently?
A4: React uses reconciliation and the Virtual DOM to only update 
    what changed, not the entire UI.  

Q5: Can I animate component switching?
A5: Yes, with libraries like Framer Motion or React Transition Group 
    to add smooth animations when switching.  
*/
