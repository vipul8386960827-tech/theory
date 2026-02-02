/* 
Key Points (Interviewer Keywords + Explanation):
1. 'use server' (Server Components) - Components that run entirely on the **server**. They can fetch 
   data, access environment variables, databases, and perform sensitive operations. Cannot use 
   client-side hooks or browser APIs.
2. 'use client' (Client Components) - Components that run on the **browser**. They can use 
   **React hooks**, browser APIs, and handle interactivity.
3. Default Behavior - In **app/** folder, components are **Server Components by default**. 
   Adding `'use client'` overrides this.
4. Hybrid Rendering - Server Components can include Client Components as children to combine 
   server-side rendering and client-side interactivity.
5. Performance - Server Components reduce client-side JS bundle and unnecessary re-renders, 
   while Client Components manage UI updates and dynamic behavior.
6. Data Security - Sensitive data should remain in Server Components to avoid exposure to the browser.

Definition (Using Specific Terms):
In Next.js 13+, components in the **app/** folder are **Server Components** by default. 
Adding `'use client'` makes a **Client Component** that can use **hooks** and **browser APIs**. 
Server Components are ideal for **fetching data, accessing environment variables, and handling sensitive logic**, 
while Client Components handle **interactivity and dynamic UI**. Combining both allows a hybrid approach, 
where server does heavy lifting and client manages responsive UI.

Code Example:

// app/counter/Counter.js (Client Component)
'use client'
import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

// app/dashboard/page.js (Server Component)
import Counter from '../counter/Counter'

export default async function Dashboard() {
  const users = await fetch('https://api.example.com/users').then(res => res.json())

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {users.map(u => <li key={u.id}>{u.name}</li>)}
      </ul>
      {/* Client Component as child 
      <Counter />
    </div>
  )
}

Follow-up Questions + Answers:

Q1: What is the difference between 'use server' and 'use client'?
A1: 'use server' (default) runs on the server and cannot use hooks or browser APIs. 
    'use client' runs in the browser and supports hooks and interactivity.

Q2: Can Server Components include Client Components?
A2: Yes, Server Components can render Client Components as children for interactivity.

Q3: Can Client Components include Server Components?
A3: No, Client Components cannot render Server Components; this will throw an error.

Q4: Why use Server Components?
A4: To fetch data, access environment variables, perform sensitive logic, 
    and reduce client-side JS bundle and unnecessary re-renders.

Q5: Why use Client Components?
A5: To manage UI interactivity, React hooks, and browser APIs.
*/
