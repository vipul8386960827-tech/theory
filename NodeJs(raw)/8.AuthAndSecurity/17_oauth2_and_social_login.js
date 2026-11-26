/* 17_oauth2_and_social_login.js

=====================================================
OAuth 2.0 and Social Login
=====================================================

Definition (What I should say in the interview):
- "**OAuth 2.0** is an **authorization** framework that lets an app get limited access to a
   user's resources on another service without seeing their password. 'Login with Google' is
   actually built on **OpenID Connect**, a layer on top of OAuth 2.0 that adds an ID token so we
   know who the user is. The recommended flow for web and mobile apps is the **Authorization
   Code flow with PKCE**: the user logs in at Google, we get a short-lived code, and our backend
   exchanges it for tokens. After that, I create or find the user and issue our own session/JWT."

-----------------------------------------------------
Roles
-----------------------------------------------------
- Resource Owner (user), Client (our app), Authorization Server (Google), Resource Server (API).

-----------------------------------------------------
Flow (Authorization Code + PKCE)
-----------------------------------------------------
1. App creates code_verifier (random) and code_challenge = base64url(SHA256(verifier)) + state.
2. Redirect user -> Google /authorize?client_id&redirect_uri&scope=openid email&state&code_challenge.
3. User logs in and consents at Google.
4. Google redirects back -> /auth/google/callback?code=...&state=...
5. Server checks state (CSRF protection), then POSTs code + code_verifier (+ client_secret) to
   the token endpoint.
6. Gets access_token + id_token -> verifies id_token -> find/create user -> issue our own JWT.

-----------------------------------------------------
Example (Passport.js)
-----------------------------------------------------
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
  state: true,
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ googleId: profile.id });
  if (!user) user = await User.create({ googleId: profile.id, email: profile.emails[0].value });
  done(null, user);
}));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => { issueTokensAsCookies(res, req.user); res.redirect('/dashboard'); });

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Implicit flow (token in URL fragment) is deprecated -> use code flow + PKCE.
- Register exact redirect URIs; open redirects can leak codes.
- Request minimal scopes. Do not auto-link accounts by email unless the provider says it is verified.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: OAuth vs OpenID Connect?
A1: OAuth = authorization (access to APIs). OIDC = authentication on top of it (ID token, user info).

Q2: What does PKCE protect against?
A2: Authorization code interception - a stolen code is useless without the original code_verifier.

Q3: What is the state parameter for?
A3: A random value tied to the user's session to prevent CSRF on the callback.
*/
