/* 25_server_actions_benefits */
/* 
Key Points (Interviewer Keywords + Explanation):
1. Server Actions - Functions in **Server Components** that run entirely on the **server**.
2. Security - Sensitive operations like database updates, API calls with secrets, or token handling 
   are never exposed to the client.
3. Automatic Token Handling - Server Actions can access **HTTP-only cookies** or session data 
   directly, without sending tokens manually from the client.
4. No Network Tab Exposure - API calls or sensitive logic inside Server Actions are **hidden from the browser**.
5. Simplified Form Handling - Can be used directly as a **form action**, reducing boilerplate.
6. Reduced Client-side Bundle - Server Actions keep logic on the server, **reducing client-side JavaScript**.
7. Hybrid Rendering - Can be combined with Client Components for interactive UI while keeping 
   sensitive logic on the server.
8. Reusability - Server Actions can be **called programmatically** from Client Components or forms.

Definition (Using Specific Terms):
**Server Actions** in Next.js allow secure, server-side execution of functions triggered by 
client events. They keep **sensitive logic, tokens, and API keys hidden**, reduce client-side 
JavaScript, and integrate seamlessly with forms or Client Components. They enable a hybrid 
architecture where the server handles heavy or sensitive tasks, and the client handles 
interactivity.

Code Example:

// app/dashboard/page.js (Server Component)
export async function addUser(data) {
  await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.API_KEY}`
    },
    body: JSON.stringify(data)
  })
}

// Using as form action
export default function Dashboard() {
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

Q1: What are the main benefits of Server Actions?
A1: Security (sensitive data hidden), no network tab exposure, automatic token handling, 
    reduced client bundle, hybrid rendering, and simplified form handling.

Q2: Can Server Actions access secrets and environment variables?
A2: Yes, they run on the **server only** and can safely access API keys, database credentials, 
    and other secrets.

Q3: Do Server Actions appear in the browser’s network tab?
A3: No, API calls or sensitive logic inside Server Actions are invisible to the client.

Q4: Can Server Actions be called programmatically?
A4: Yes, they can be called from Client Components or directly from forms.

Q5: How do Server Actions help reduce client-side JavaScript?
A5: By keeping logic on the server and only sending minimal HTML/props to the client, 
    the client bundle is smaller and faster.
*/
