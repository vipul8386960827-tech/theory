/*
=====================================
Programmatic Navigation in React Router v4
=====================================

Definition:
Programmatic navigation allows a React app to navigate between routes 
using JavaScript instead of declarative <Link> components.  
In React Router v4, this is achieved via the `history` object.

-------------------------------------
Key Points:
-------------------------------------
- React Router v4 provides `history` prop to components rendered by Route.  
- Can also create a custom history object for non-route components.  
- Methods: `history.push(path, state)` and `history.replace(path, state)`.  
- Useful for navigation after events like form submission or authentication.

-------------------------------------
Example 1: Using history from Route Props
-------------------------------------
import React from "react";
import { Route } from "react-router-dom";

class Login extends React.Component {
  handleLogin = () => {
    // Navigate to dashboard after login
    this.props.history.push("/dashboard");
  };

  render() {
    return <button onClick={this.handleLogin}>Login</button>;
  }
}

export default function App() {
  return <Route path="/login" component={Login} />;
}

-------------------------------------
Example 2: Using withRouter HOC
-------------------------------------
import React from "react";
import { withRouter } from "react-router-dom";

class LogoutButton extends React.Component {
  handleLogout = () => {
    // Clear session or token here
    this.props.history.replace("/login"); // Redirect to login
  };

  render() {
    return <button onClick={this.handleLogout}>Logout</button>;
  }
}

export default withRouter(LogoutButton);

-------------------------------------
Example 3: Custom History Object
-------------------------------------
import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Dashboard from "./Dashboard";

const customHistory = createBrowserHistory();

function App() {
  const goToHome = () => {
    customHistory.push("/home");
  };

  return (
    <Router history={customHistory}>
      <button onClick={goToHome}>Go Home</button>
      <Dashboard />
    </Router>
  );
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
Programmatic navigation is like telling a GPS 🚗 to move to a 
destination after a trigger event (button click, login, etc.) 
instead of following preset road signs (links).

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Difference between push and replace?
A1: push adds a new entry to history; replace replaces the current entry.

Q2: Can functional components access history in v4?
A2: Yes, using `withRouter` HOC or `useHistory` hook in v5+.

Q3: Why use programmatic navigation instead of <Link>?
A3: Useful when navigation depends on logic or events, not static links.

Q4: Can you navigate outside component tree?
A4: Yes, by using a custom history object.

Q5: How is navigation handled in React Router v6?
A5: v6 uses `useNavigate` hook instead of history object.
*/
