/*
==================================================
Types of Tokens (Frontend System Design)
==================================================

Note:
There is no strict fixed number, but commonly we deal with 3 main types.

--------------------------------------------------
1. 🔐 Access Token
--------------------------------------------------

 Short-lived (e.g., 10–30 minutes)
 Sent with every API request
 Contains user identity + permissions

 Purpose:
 → Used to authorize API calls

 Example:
 Authorization: Bearer <access_token>


--------------------------------------------------
2. 🔄 Refresh Token
--------------------------------------------------

 Long-lived (days/weeks)
 Used to generate a new access token
 Not sent with every request

 Purpose:
 → Keeps user logged in without asking them to login again

 Flow:
 Access token expires → send refresh token → get new access token

 Best practice:
 → Store in HttpOnly cookie (secure)


--------------------------------------------------
3. 🆔 ID Token
--------------------------------------------------

 Contains user identity info (name, email, etc.)
 Used mainly in OAuth / OpenID Connect

 Purpose:
 → Used for authentication (who the user is)
 → Not typically used for API authorization


--------------------------------------------------
🧠 FRONTEND BEST PRACTICE
--------------------------------------------------

 Access token → store in memory (short-lived)
 Refresh token → store in HttpOnly cookie

 Why?
 - Prevents XSS attacks
 - Maintains good user experience (auto login)


--------------------------------------------------
🎯 FINAL SUMMARY
--------------------------------------------------

 Access Token  → "Can I access this API?"
 Refresh Token → "Give me a new access token"
 ID Token      → "Who is the user?"

*/
