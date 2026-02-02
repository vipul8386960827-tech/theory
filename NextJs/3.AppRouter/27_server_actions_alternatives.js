/* 27_server_actions_alternatives */
/* 
Key Points (Interviewer Keywords + Explanation):
1. Alternatives to Server Actions - Methods to perform server-side operations without Server Actions.
2. API Routes - Use **pages/api/** or **app/api/** routes for CRUD operations or backend logic. 
   Client Components can call these endpoints.
3. Server Components with fetch - Server Components can fetch data directly from databases or APIs 
   and pass it as props to Client Components.
4. Middleware - Can handle **authorization, authentication, and request pre-processing** on the server.
5. Edge Functions / Serverless Functions - Deploy server-side logic in **serverless environments** like 
   Vercel Edge Functions, AWS Lambda, etc.
6. RPC-style Calls - Direct server-side functions can be exposed via API endpoints and called from the client.
7. Form Submission via API - Traditional form submissions can hit an API route instead of a Server Action.

Definition (Using Specific Terms):
If Server Actions are not suitable, Next.js provides several alternatives for server-side operations. 
**API Routes** allow creating RESTful endpoints that Client Components can call. **Server Components** 
can fetch and process data directly on the server. **Middleware** can manage auth or pre-processing. 
Serverless/Edge functions provide isolated server-side execution. Traditional form submissions 
can also POST to API routes, offering flexibility to implement server-side logic securely.

Code Example:

// app/api/users/route.js (API Route alternative)
import { NextResponse } from 'next/server'

export async function POST(request) {
  const data = await request.json()
  await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.API_KEY}`
    },
    body: JSON.stringify(data)
  })
  return NextResponse.json({ success: true })
}

// app/dashboard/AddButton.js (Client Component calling API route)
'use client'
export default function AddButton() {
  const handleClick = async () => {
    await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name: 'John' }),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  return <button onClick={handleClick}>Add User</button>
}

Follow-up Questions + Answers:

Q1: What are the main alternatives to Server Actions?
A1: **API Routes, Server Components with fetch, Middleware, Serverless/Edge functions, and form submissions to API endpoints**.

Q2: Can API routes replace Server Actions?
A2: Yes, API routes can handle server-side logic and be called from Client Components, but Server Actions offer more seamless 
integration with forms and less boilerplate.

Q3: How do Server Components fetch data securely without exposing it to the client?
A3: Server Components fetch data directly on the server and pass only the necessary props to Client Components.

Q4: When would you choose middleware over Server Actions?
A4: Middleware is ideal for **authorization, authentication, redirects, and pre-processing requests**, while Server Actions
 are for operations triggered by client events.

Q5: Can serverless or edge functions be used instead of Server Actions?
A5: Yes, they provide isolated server-side execution and can handle backend operations triggered by the client.
*/
