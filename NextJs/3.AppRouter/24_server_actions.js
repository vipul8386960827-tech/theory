/* 24_server_actions */
/* 
Key Points (Interviewer Keywords + Explanation):
1. Server Actions - Functions defined in **Server Components** that run entirely on the **server** 
   when triggered by a client event (like a form submission).
2. Security - Server Actions allow **client-triggered operations** without exposing sensitive data, 
   API keys, or database credentials to the browser.
3. Form Integration - Server Actions can be directly used as a **form’s action** in Next.js 13+ 
   for secure submissions.
4. No Network Tab Exposure - Since execution happens on the server, **API calls inside Server Actions** 
   are not visible in the client’s network tab.
5. State Handling - Server Actions can modify server-side data, and the updated state can be 
   passed to Client Components for UI updates.
6. Hybrid Approach - Combine **Server Actions** with Client Components for interactive UI 
   while keeping sensitive logic on the server.

Definition (Using Specific Terms):
**Server Actions** in Next.js 13+ are server-side functions that can be called from the client 
without exposing sensitive information. They run only on the **server**, making them ideal for 
handling operations like database updates, API calls with secrets, or sensitive computations. 
Server Actions can be used as **form actions** or event handlers, while Client Components manage 
the UI.

Code Example:

// app/dashboard/page.js (Server Component)
export default function Dashboard() {
  // Server Action
  async function addUser(data) {
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

Q1: What is a Server Action in Next.js?
A1: A Server Action is a **server-side function** that can be triggered by client events, 
    like form submissions, without exposing sensitive data.

Q2: Where do Server Actions run?
A2: On the **server only** — local development server, company server, or serverless/Edge runtime in production.

Q3: Can Server Actions access secrets or databases?
A3: Yes, they can safely access **environment variables, API keys, and databases**.

Q4: Will API calls inside a Server Action appear in the network tab?
A4: No, the client only triggers the action; the backend API calls remain hidden.

Q5: How do Server Actions integrate with Client Components?
A5: Server Actions perform the sensitive operations, while Client Components can use the 
    returned data to update the UI dynamically.

Q6: When should you use Server Actions?
A6: For secure form submissions, CRUD operations, API calls requiring secrets, or any 
    sensitive operation triggered by the client.
*/