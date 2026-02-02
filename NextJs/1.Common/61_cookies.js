/* 61_cookies */
/*
Key Points (Interviewer Keywords + Explanation):
1. Cookies – Small pieces of data stored on the client’s browser
   and sent with every HTTP request.

2. Purpose – Store session data, authentication tokens,
   preferences, or other client-specific information.

3. Implementation – In Next.js, cookies can be handled using:
   - Native Node.js `res.setHeader("Set-Cookie", ...)` for API routes
   - Libraries like `cookie` or `nookies` for easier parsing and setting.

4. Types – 
   - HttpOnly: Not accessible via JavaScript (safer)
   - Secure: Sent only over HTTPS
   - SameSite: Controls cross-site sending (Strict, Lax, None)

5. Benefits – Enables persistent sessions, user preferences,
   authentication management, and secure storage of small data.
*/

/*
Definition (Using Specific Terms):
Cookies in Next.js are key-value pairs stored in the browser.
They can be set in API routes using HTTP headers or helper libraries.
They are useful for authentication, session management, and storing preferences.
*/

/*
Code Example (Pages Router: pages/api/set-cookie.js):

import { serialize } from "cookie";

export default function handler(req, res) {
  // Set a secure, HttpOnly cookie
  res.setHeader(
    "Set-Cookie",
    serialize("token", "abc123", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })
  );
  res.status(200).json({ message: "Cookie set" });
}

// Reading cookies
export default function handler(req, res) {
  const cookies = req.headers.cookie; // raw cookie string
  res.status(200).json({ cookies });
}

/*
Code Example (App Router: app/api/set-cookie/route.js):

import { NextResponse } from "next/server";
import { serialize } from "cookie";

export function GET() {
  const response = NextResponse.json({ message: "Cookie set" });
  response.headers.set(
    "Set-Cookie",
    serialize("token", "abc123", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    })
  );
  return response;
}
*/

/*
Important Notes:
- Use HttpOnly and Secure flags for authentication cookies.
- `nookies` library simplifies reading/writing cookies in Next.js.
- Works in both Pages Router and App Router.
- Cookies are included automatically in client requests if path/domain match.
- Avoid storing sensitive data in non-HttpOnly cookies.
*/

/*
Follow-up Questions + Answers:

Q1: How do you set a cookie in Next.js?
A1: Use res.setHeader("Set-Cookie", ...) in Pages Router or response.headers.set in App Router, or a library like nookies.

Q2: What is HttpOnly and why use it?
A2: HttpOnly cookies cannot be accessed via JS, making them safer for tokens.

Q3: Can cookies be used for authentication?
A3: Yes, store JWT or session IDs in secure cookies.

Q4: Difference between Pages Router and App Router for cookies?
A4: Pages Router uses res.setHeader; App Router uses NextResponse.headers.set.

Q5: How to read cookies on server?
A5: Parse req.headers.cookie (Pages) or request.cookies (App Router) or use a helper library like nookies.
*/
