/* 26_server_actions_problems */
/* 
Key Points (Interviewer Keywords + Explanation):
1. Server Actions Limitations - Despite their benefits, Server Actions have some **constraints**.
2. Client-side Only Features - Cannot directly use **useState, useEffect, or browser APIs** inside Server Actions.
3. Async Boundaries - Must handle **async operations** carefully; errors may require proper server-side handling.
4. Debugging Complexity - Debugging server-side functions can be **trickier** than client-side code.
5. Cannot Return DOM - Server Actions return data or trigger operations; they **cannot render JSX** directly.
6. Event-based Usage - They are tied to events (like form submissions or client triggers) and cannot run standalone like normal server code.
7. Server Load - Heavy usage of Server Actions for frequent operations may **increase server load**, since all logic executes on the server.

Definition (Using Specific Terms):
**Server Actions** in Next.js are powerful for secure server-side operations triggered by the client, 
but they have limitations. They cannot use **client-side hooks** or **browser APIs**, cannot render JSX, 
and must handle **async operations and errors carefully**. Overuse can increase server load, and debugging 
can be more complex compared to client-side code.

Code Example:

// app/dashboard/page.js
export async function addUser(data) {
  // Cannot use useState here ❌
  // const [count, setCount] = useState(0) // ❌ Invalid

  try {
    await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_KEY}`
      },
      body: JSON.stringify(data)
    })
  } catch (error) {
    console.error('Server Action Error:', error)
  }
  // Cannot return JSX
  return { success: true }
}

Follow-up Questions + Answers:

Q1: Can Server Actions use React hooks like useState or useEffect?
A1: No, Server Actions run on the server and cannot use client-side hooks or browser APIs.

Q2: Can Server Actions render JSX?
A2: No, they can only perform operations or return data; JSX must be rendered by Server/Client Components.

Q3: What are potential server-side issues with Server Actions?
A3: Heavy use may increase server load, and async error handling requires careful implementation.

Q4: How do you debug Server Actions?
A4: Use server logs, try/catch, and environment-specific debugging tools since they run on the server.

Q5: Can Server Actions run standalone without an event or trigger?
A5: No, they are meant to be invoked by client events like form submissions or direct calls from Client Components.
*/
