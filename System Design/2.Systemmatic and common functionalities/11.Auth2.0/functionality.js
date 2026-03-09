import React, { useEffect, useState } from "react";

/**
 * GOOGLE OAUTH FLOW (SECURE COOKIE VERSION)
 * * 1. CLICK: User clicks "Continue with Google".
 * 2. REDIRECT: Browser goes to Google -> User logs in.
 * 3. CALLBACK: Google sends user to BACKEND (not frontend).
 * 4. HANDOFF: Backend sets an HttpOnly Cookie and redirects back to "/" or "/dashboard".
 * 5. VALIDATE: Frontend loads, calls /api/me. Browser automatically sends the Cookie.
 * 6. SESSION: Backend validates cookie and returns user data.
 */

const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";
const BACKEND_CALLBACK_URI = "http://localhost:5000/auth/google/callback";
const BACKEND_BASE_URL = "http://localhost:5000";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- 1. SESSION CHECK ON LOAD ---
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(`${BACKEND_BASE_URL}/api/me`, {
          method: "GET",
          // CRITICAL: This allows the browser to send the HttpOnly cookie stored in its jar
          credentials: "include",
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("No active session found:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  // --- 2. START OAUTH PROCESS ---
  const handleLogin = () => {
    const googleAuthURL = "https://accounts.google.com/o/oauth2/v2/auth";
    const state = crypto.randomUUID();

    // CSRF Protection: Store state to verify later if needed
    sessionStorage.setItem("oauth_state", state);

    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: BACKEND_CALLBACK_URI,
      response_type: "code",
      scope: "openid email profile",
      state: state,
      prompt: "select_account",
    });

    window.location.href = `${googleAuthURL}?${params.toString()}`;
  };

  // --- 3. LOGOUT ---
  const handleLogout = () => {
    // We redirect to the backend logout route so it can clear the cookie
    window.location.href = `${BACKEND_BASE_URL}/auth/logout`;
  };

  if (loading) return <div style={styles.container}>Loading Session...</div>;

  return (
    <div style={styles.container}>
      {user ? (
        <div style={styles.card}>
          <img src={user.picture} alt="Profile" style={styles.avatar} />
          <h1>Welcome, {user.name}!</h1>
          <p>{user.email}</p>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      ) : (
        <div style={styles.card}>
          <h1>App Login</h1>
          <p>Securely sign in using your Google account.</p>
          <button onClick={handleLogin} style={styles.loginBtn}>
            Continue with Google
          </button>
        </div>
      )}
    </div>
  );
}

// --- STYLES ---
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
    fontFamily: "Arial",
  },
  card: {
    padding: "40px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  loginBtn: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#4285F4",
    color: "white",
    border: "none",
    borderRadius: "4px",
  },
  logoutBtn: {
    padding: "8px 16px",
    marginTop: "20px",
    cursor: "pointer",
    backgroundColor: "#ff4d4f",
    color: "white",
    border: "none",
    borderRadius: "4px",
  },
};

/**
 * ==========================================
 * BACKEND SNIPPET (For Context)
 * ==========================================
 * * app.get('/auth/google/callback', async (req, res) => {
 * // ... verify code ...
 * const token = jwt.sign({ id: user.id }, SECRET);
 * * res.cookie('session_token', token, {
 * httpOnly: true,
 * secure: process.env.NODE_ENV === 'production',
 * maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days persistence
 * sameSite: 'Lax'
 * });
 * res.redirect('http://localhost:3000');
 * });
 * * app.get('/auth/logout', (req, res) => {
 * res.clearCookie('session_token');
 * res.redirect('http://localhost:3000');
 * });
 */
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
Google redirects to backend callback URL:

http://localhost:5000/auth/google/callback?code=AUTH_CODE&state=STATE

       ↓
---------------- BACKEND FLOW STARTS ----------------

Backend receives request:

GET /auth/google/callback?code=AUTH_CODE&state=STATE


Step 1 — Backend validates state parameter

Purpose:
Prevent CSRF attacks.

Backend checks:
state received from Google
vs
state stored earlier for that login session.

If state does not match:
    reject login


Step 2 — Backend exchanges authorization code with Google

Backend sends POST request to Google token endpoint:

POST https://oauth2.googleapis.com/token

with payload:

{
  client_id: GOOGLE_CLIENT_ID,
  client_secret: GOOGLE_CLIENT_SECRET,
  code: AUTH_CODE,
  redirect_uri: BACKEND_CALLBACK_URL,
  grant_type: "authorization_code"
}


Step 3 — Google verifies the code

Google checks:
- code validity
- redirect URI
- client credentials


Step 4 — Google returns tokens to backend

Response:

{
  access_token: "...",
  id_token: "...",
  refresh_token: "...",
  expires_in: 3600
}

Important:

id_token = JWT containing user identity information


Step 5 — Backend verifies ID Token

Backend verifies:

- JWT signature
- token expiration
- issuer = Google
- audience = your client_id


Step 6 — Backend extracts user profile

Decoded ID token contains:

{
  sub: "google_user_id",
  email: "user@gmail.com",
  name: "John Doe",
  picture: "profile_url"
}


Step 7 — Backend checks if user exists

If user exists in database:
    load user

Else:
    create new user


Step 8 — Backend creates session

Two common approaches:

Option A — Session Cookie
Option B — JWT token


Example JWT:

{
  userId: 123,
  email: "user@gmail.com"
}


Step 9 — Backend sets authentication cookie

Set-Cookie:

session_token=abc123
HttpOnly
Secure
SameSite=Strict


Step 10 — Backend redirects user to frontend dashboard

HTTP 302 Redirect

Location:
http://localhost:3000/dashboard


---------------- BACKEND FLOW ENDS ----------------


Dashboard loads in frontend
User is now authenticated
*/
