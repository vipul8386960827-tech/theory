/* 
Key Points (Interviewer Keywords + Explanation):
1. API Routes - Server-side endpoints in Next.js to handle HTTP requests 
   (GET, POST, PUT, DELETE).
2. File-based Routing - Created under `app/api/` (App Router) or `pages/api/` (Pages Router) 
   with folder structure defining route paths.
3. Server Components Only - API Routes run only on the server, cannot use client-side hooks.
4. Request & Response - API handlers receive `Request` object (App Router) 
   or `(req, res)` (Pages Router).
5. Middleware Integration - Can use middleware for authentication or preprocessing 
   before hitting API routes.
6. Use Cases - CRUD operations, authentication, form submissions, interacting with databases.
7. Edge & Serverless - Can deploy API routes on serverless functions 
   or Edge Runtime for fast responses.

Definition (Using Specific Terms):
**API Routes** in Next.js are server-side endpoints that handle HTTP requests.  
In the App Router, they are defined under `app/api/route.js` or folders, 
and receive a **Request** object to read data. API routes cannot run client-side code; 
they are ideal for **CRUD operations**, form submissions, authentication, 
or database interactions. Middleware can be used for **pre-processing** requests 
or authentication. API Routes can run on serverless functions or Edge Runtime 
for global low-latency execution.

Code Example (App Router):

// app/api/hello/route.js
export async function GET(request) {
  return new Response(
    JSON.stringify({ message: 'Hello World' }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  )
}

export async function POST(request) {
  const data = await request.json()
  // handle POST data, e.g., save to DB
  return new Response(
    JSON.stringify({ received: data }),
    {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    }
  )
}

// Example usage in Client Component
'use client'
import { useState } from 'react'

export default function Form() {
  const [name, setName] = useState('')
  const [response, setResponse] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await fetch(
      '/api/hello',
      {
        method: 'POST',
        body: JSON.stringify({ name }),
      }
    )
    const data = await res.json()
    setResponse(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={name} 
        onChange={e => setName(e.target.value)} 
        placeholder="Name" 
      />
      <button type="submit">Submit</button>
      {response && <p>{JSON.stringify(response)}</p>}
    </form>
  )
}

Follow-up Questions + Answers:

Q1: Where do you create API Routes in App Router?
A1: Under `app/api/` using folder and `route.js` files.

Q2: Can API Routes run client-side code?
A2: No, they run only on the server.

Q3: How do you handle GET and POST requests?
A3: By exporting `GET`, `POST` functions from the route file.

Q4: Can API Routes interact with a database?
A4: Yes, Server-side code can safely query databases inside API Routes.

Q5: Can middleware be used with API Routes?
A5: Yes, middleware can pre-process requests, handle authentication, 
    or redirect before the API handler runs.
*/
