/*
User visits website
       ↓
LoginPage renders
       ↓
User clicks "Continue with Google"
       ↓
Browser redirects to Google OAuth endpoint
       ↓
User selects Google account
       ↓
Google redirects to:

/auth/google/callback?code=AUTH_CODE
       ↓
GoogleCallbackPage loads
       ↓
Frontend extracts authorization code
       ↓
Frontend sends code to backend
       ↓
Backend verifies with Google OAuth server
       ↓
Backend returns JWT/session
       ↓
Frontend stores token
       ↓
User redirected to dashboard

*/

import React, { useEffect } from "react";

/*
This file demonstrates the basic Google OAuth login flow from the frontend.

Flow:
1. User clicks "Login with Google"
2. Frontend redirects the user to Google OAuth page
3. User selects a Google account
4. Google redirects back to our app with an authorization code
5. Frontend extracts the code from the URL
6. Frontend sends that code to the backend
7. Backend exchanges the code with Google to get user information and tokens
*/

const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";

/*
This is the redirect URI where Google will send the user after login.
This exact URL must be registered in Google Cloud Console.
*/
const REDIRECT_URI = "http://localhost:3000/auth/google/callback";

export default function App() {
  /*
  This function is triggered when the user clicks the login button.
  It redirects the browser to Google's OAuth authorization endpoint.
  */
  const loginWithGoogle = () => {
    /*
    OAuth endpoint of Google
    */
    const googleAuthURL = "https://accounts.google.com/o/oauth2/v2/auth";

    /*
    We construct the full OAuth URL with required parameters.

    client_id
      identifies our application

    redirect_uri
      where Google should redirect after authentication

    response_type=code
      tells Google we want an authorization code

    scope
      what user information we want access to
    */
    const url =
      `${googleAuthURL}?` +
      `client_id=${GOOGLE_CLIENT_ID}` +
      `&redirect_uri=${REDIRECT_URI}` +
      `&response_type=code` +
      `&scope=openid email profile`;

    /*
    Redirect the browser to Google login page
    */
    window.location.href = url;
  };

  /*
  This effect runs when the page loads.
  If Google redirected the user back with a code, we handle it here.
  */
  useEffect(() => {
    /*
    Extract query parameters from URL
    Example redirect:
    http://localhost:3000/auth/google/callback?code=abc123
    */
    const params = new URLSearchParams(window.location.search);

    /*
    Get authorization code returned by Google
    */
    const code = params.get("code");

    /*
    If code exists, send it to backend
    */
    if (code) {
      /*
      Send authorization code to backend.

      Backend will:
      1. Exchange code with Google
      2. Get access token and user info
      3. Create user session / JWT
      4. Return authentication response
      */
      fetch("http://localhost:5000/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          /*
        Store authentication token returned by backend
        */
          localStorage.setItem("token", data.token);

          console.log("User logged in successfully");
        })
        .catch((err) => console.error("Login failed", err));
    }
  }, []);

  return (
    <div>
      {/* Button user clicks to start Google login */}
      <button onClick={loginWithGoogle}>Login with Google</button>
    </div>
  );
}
