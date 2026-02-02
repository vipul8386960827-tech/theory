/* 
Key Points (Interviewer Keywords + Explanation):
1. 'use client' Directive - Special directive in Next.js 13+ that marks a file as a **Client Component**.
2. Server Components vs Client Components - By default, components in **app/** folder are **Server Components**. 
   Adding 'use client' switches it to a **Client Component**.
3. Client-side Hooks - To use React hooks like **useState, useEffect, useContext**, the component must be a Client Component.
4. Browser APIs - Only Client Components can access **window, localStorage, document** or other browser-only APIs.
5. Interactivity - Components that need **dynamic behavior** or respond to user events should be Client Components.
6. Nested Components - Server Components can include Client Components as children to add interactivity where needed.

Definition (Using Specific Terms):
In Next.js, adding the `'use client'` directive at the top of a file marks it as a **Client Component**. 
This allows the use of **React hooks** and **browser APIs**, enabling interactivity. 
All components in the **app/** folder are Server Components by default, which cannot use hooks or browser APIs. 
Client Components are typically used for forms, buttons, modals, or any UI that reacts to user actions.

Code Example:

// app/counter/Counter.js
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

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Server Component can render Client Component }
      <Counter />
    </div>
  )
}

Follow-up Questions + Answers:

Q1: What happens if you use useState or useEffect in a Server Component?
A1: You will get an error because **Server Components cannot use React hooks** that require client-side rendering.

Q2: Can a Server Component include a Client Component?
A2: Yes, Server Components can include Client Components as children for interactivity.

Q3: What kind of tasks require a Client Component?
A3: Any task needing **React hooks, browser APIs, or dynamic interactivity**, like forms, modals, buttons.

Q4: What happens if you forget 'use client' in a component that needs hooks?
A4: The app will throw an error indicating that hooks cannot be used in a Server Component.

Q5: Can Client Components fetch data from the server?
A5: Yes, but **fetching from a Client Component is client-side** and will appear in the browser’s network tab.  
    For server-side fetching, use **Server Components** instead.

*/
