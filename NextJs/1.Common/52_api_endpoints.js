/* 52_api_endpoints */
/*
Key Points (Interviewer Keywords + Explanation):
1. API Endpoints – Next.js allows creating backend endpoints
   inside the `pages/api` (Pages Router) or `app/api` (App Router) folder.

2. Purpose – Handle server-side logic like CRUD operations,
   authentication, form submission, or database access.

3. Implementation – Each file inside `api` folder exports a function
   that receives `req` and `res` objects.

4. HTTP Methods – Handle GET, POST, PUT, DELETE, etc. based on `req.method`.

5. Benefits – Provides serverless functions, no need for a separate backend,
   fully integrated with Next.js project.
*/

/*
Definition (Using Specific Terms):
API endpoints in Next.js are serverless functions that live inside
`pages/api` or `app/api`. Each endpoint handles HTTP requests and
returns responses using Node.js style `req` and `res` objects.
*/

/*
Code Example (Pages Router: pages/api/users.js):

export default function handler(req, res) {
  if (req.method === "GET") {
    // Return list of users
    res.status(200).json([{ id: 1, name: "John" }]);
  } else if (req.method === "POST") {
    // Create new user
    const { name } = req.body;
    res.status(201).json({ id: 2, name });
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

/*
Code Example (App Router: app/api/users/route.js):

import { NextResponse } from "next/server";

export async function GET(req) {
  return NextResponse.json([{ id: 1, name: "John" }]);
}

export async function POST(req) {
  const body = await req.json();
  return NextResponse.json({ id: 2, name: body.name });
}
*/

/*
Important Notes:
- Pages Router: use default export function with (req, res).
- App Router: use named exports (GET, POST, etc.) with NextResponse.
- API routes can access environment variables securely.
- Useful for backend logic without deploying a separate server.
- Can be deployed as serverless functions on Vercel or other platforms.
*/

/*
Follow-up Questions + Answers:

Q1: How do you create an API endpoint in Next.js?
A1: Pages Router: create file in pages/api and export a function (req, res). 
   App Router: create route.js in app/api and export GET/POST/etc functions.

Q2: Can you handle multiple HTTP methods in one endpoint?
A2: Yes, check req.method (Pages Router) or create separate function exports (App Router).

Q3: Can API routes access environment variables?
A3: Yes, using process.env for server-side secure variables.

Q4: Are Next.js API routes serverless?
A4: Yes, deployed as serverless functions by default.

Q5: When should you use API routes?
A5: For CRUD operations, authentication, form handling, or any server-side logic.
*/
