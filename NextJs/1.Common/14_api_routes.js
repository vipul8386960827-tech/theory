/* 14_api_routes */
/*
Key Points (Interviewer Keywords + Explanation):
1. Built-in Backend – API Routes allow creating backend endpoints
   directly inside a Next.js application.

2. No Separate Server – They remove the need for a separate
   Express or Node server for simple APIs.

3. Server-Side Only – API routes run only on the server
   and are never exposed to the browser.

4. Routing Convention – File-based routing is used
   to define API endpoints.

5. Common Use Cases – Used for authentication,
   database access, form handling, and third-party API calls.
*/

/*
Definition (Using Specific Terms):
API Routes in Next.js are server-side functions that act as
backend endpoints within the same project.

They use file-based routing and run on the server,
allowing secure access to databases, secrets,
and external services without exposing them to the client.
*/

/*
Code Example (Pages Router):

// pages/api/users.js
export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({ users: [] });
  }
}
*/

/*
Code Example (App Router – Route Handlers):

// app/api/users/route.js
export async function GET() {
  return Response.json({ users: [] });
}
*/

/*
Key Differences:
- Pages Router → uses default export handler(req, res)
- App Router → uses HTTP method functions like GET, POST
*/

/*
Important Notes:
- API routes run on the server only.
- They can access environment variables securely.
- They can be deployed as serverless functions.
*/

/*
Follow-up Questions + Answers:

Q1: Do API routes run on the client or server?
A1: They run only on the server.

Q2: Can API routes access databases securely?
A2: Yes, because they run on the server.

Q3: Are API routes available in App Router?
A3: Yes, via route handlers in app/api.

Q4: Can API routes replace a full backend?
A4: For many use cases yes, but not always for large systems.

Q5: Are API routes serverless?
A5: Yes, they are typically deployed as serverless functions.
*/
