/*
=====================================
Getting History Object in React Router v4
=====================================

Definition:
The history object allows programmatic navigation and access to the 
browser's session history. In React Router v4, components rendered 
by <Route> automatically receive the history prop. For non-route 
components, `withRouter` HOC can be used.

-------------------------------------
Key Points:
-------------------------------------
- history.push(path, state) → navigate to a new URL.  
- history.replace(path, state) → replace current entry in history stack.  
- history.goBack() → navigate back one entry.  
- history.go(n) → navigate n entries forward/back.  
- Automatically available to route components; use `withRouter` for others.

-------------------------------------
Example 1: Accessing history in Route component
-------------------------------------
import React from "react";
import { Route } from "react-router-dom";

class Dashboard extends React.Component {
  goToSettings = () => {
    this.props.history.push("/settings");
  };

  render() {
    return <button onClick={this.goToSettings}>Go to Settings</button>;
  }
}

export default function App() {
  return <Route path="/" component={Dashboard} />;
}

-------------------------------------
Example 2: Accessing history in Non-Route Component
-------------------------------------
import React from "react";
import { withRouter } from "react-router-dom";

class LogoutButton extends React.Component {
  handleLogout = () => {
    this.props.history.replace("/login");
  };

  render() {
    return <button onClick={this.handleLogout}>Logout</button>;
  }
}

export default withRouter(LogoutButton);

-------------------------------------
Example 3: Custom History Object
-------------------------------------
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "./App";

const customHistory = createBrowserHistory();

function Main() {
  return (
    <Router history={customHistory}>
      <App />
    </Router>
  );
}

// You can use customHistory.push("/path") anywhere to navigate

-------------------------------------
Real-Life Analogy:
-------------------------------------
- history object = remote control 🚀 for navigating pages.  
- push = move forward, replace = overwrite, goBack = reverse.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Can functional components access history in v4?
A1: Yes, by using `withRouter` HOC on the component.

Q2: What is the difference between push and replace?
A2: push adds a new entry to history; replace updates the current entry.

Q3: How to navigate programmatically outside React components?
A3: Create a custom history object and use it with <Router>.

Q4: Does history object include route state?
A4: Yes, you can pass state with push/replace and access it via location.state.

Q5: Is history still needed in React Router v6?
A5: No, v6 uses useNavigate hook instead of directly accessing history.
*/
