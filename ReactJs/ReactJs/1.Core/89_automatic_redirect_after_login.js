/*
=====================================
Automatic Redirect After Login in React Router
=====================================

Definition:
Automatic redirect allows navigation to a specific route after a 
successful login. This can be done programmatically using the 
history object (v4/v5) or useNavigate hook (v6).

-------------------------------------
Key Points:
-------------------------------------
- Redirects after login improve UX by sending users to the correct page.  
- Use history.push or history.replace in v4/v5.  
- Use useNavigate() in v6.  
- Can also redirect based on authentication state using conditional rendering.  

-------------------------------------
Example 1: React Router v4/v5 (Class Component)
-------------------------------------
import React from "react";
import { Route, withRouter } from "react-router-dom";

class Login extends React.Component {
  handleLogin = () => {
    // Perform authentication logic here
    const isAuthenticated = true;
    if (isAuthenticated) {
      this.props.history.push("/dashboard"); // Redirect after login
    }
  };

  render() {
    return <button onClick={this.handleLogin}>Login</button>;
  }
}

export default withRouter(Login);

-------------------------------------
Example 2: React Router v6 (Functional Component)
-------------------------------------
import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform authentication logic here
    const isAuthenticated = true;
    if (isAuthenticated) {
      navigate("/dashboard"); // Redirect after login
    }
  };

  return <button onClick={handleLogin}>Login</button>;
}

-------------------------------------
Example 3: Redirect Based on Auth State (Functional Component)
-------------------------------------
import { Navigate } from "react-router-dom";

function Dashboard({ isAuthenticated }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect if not logged in
  }
  return <h2>Welcome to Dashboard</h2>;
}

-------------------------------------
Real-Life Analogy:
-------------------------------------
- Automatic redirect = a doorman 🚪 guiding you to the VIP lounge 
after verifying your ticket (login).

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Difference between push and replace in redirects?
A1: push adds a new entry to history (back button goes to login); replace overwrites current entry.

Q2: Can we redirect using state params?
A2: Yes, use history.push("/path", { state }) or navigate("/path", { state }) to pass extra data.

Q3: How to handle redirects after refresh?
A3: Persist authentication state in localStorage or context.

Q4: Can you redirect from non-component files?
A4: Yes, using a custom history object (v4/v5) or navigate function (v6) passed as prop.

Q5: Is conditional rendering necessary for redirects?
A5: Yes, especially to prevent unauthorized access to protected routes.
*/
