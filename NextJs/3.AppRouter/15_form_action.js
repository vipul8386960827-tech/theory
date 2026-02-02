/* 
Key Points (Interviewer Keywords + Explanation):
1. Form Actions - Mechanism to trigger **server-side logic** 
   from a form submission in Next.js.
2. Server Actions - Functions defined in **Server Components** 
   that handle these submissions securely.
3. Server Components - Server Actions must live here to access 
   **server-only resources** like API keys or databases.
4. Security - Form Actions allow **client-triggered operations** 
   without exposing sensitive data or API calls to the browser.
5. No Network Tab Exposure - Unlike client-side fetch, Server Actions 
   execute entirely on the **server**, so the network tab does not show backend API calls.
6. Use Cases - Adding, updating, deleting data; form submissions; 
   operations requiring secure credentials.

Definition (Using Specific Terms):
A **Form Action** in Next.js is a way to trigger a **Server Action** 
from a form submission. The Server Action runs entirely on the **server**, 
allowing you to perform API calls, database operations, or any sensitive tasks. 
This ensures that the client only sees the rendered HTML or page updates, 
and the raw API calls or data remain hidden from the browser.

Code Example:

// app/dashboard/page.js (Server Component)
export default function Dashboard() {
  // Server Action to handle form submission
  async function addUser(data) {
    // This runs only on the server
    await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_KEY}`
      },
      body: JSON.stringify(data)
    })
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <form action={addUser}>
        <input name="name" placeholder="Enter name" />
        <button type="submit">Add User</button>
      </form>
    </div>
  )
}

Follow-up Questions + Answers:

Q1: What is a Form Action in Next.js?
A1: It is a mechanism to trigger **server-side logic** 
    (Server Action) securely from a form submission.

Q2: Where do Form Actions run?
A2: Inside **Server Components** on the server — 
    local dev, company server, or serverless/Edge runtime in production.

Q3: Can Form Actions access sensitive resources like API keys?
A3: Yes, they can safely access **database connections, API keys, and environment variables**.

Q4: Will the API call inside a Form Action appear in the network tab?
A4: No, only the form submission is visible; backend API calls remain hidden 
    from the client.

Q5: Why use Form Actions instead of client-side fetch?
A5: To keep sensitive data and API calls secure, prevent exposure 
    in network requests, and maintain server-side control over operations.

Q6: What are typical use cases for Form Actions?
A6: Submitting forms, creating/updating/deleting records, interacting with APIs 
    that require secrets, or performing sensitive operations triggered by the client.
*/
