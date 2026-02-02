/* 
Key Points (Interviewer Keywords + Explanation):
1. Form Submissions - Handling user input from HTML forms in Next.js App Router.
2. Server Actions - New Next.js 13+ feature to handle form submissions directly on the server.
3. 'use client' - Required for forms that need client-side interactivity (state, events, validation).
4. FormData - Browser API to extract form values in server or client components.
5. Redirects - Use 'redirect()' from 'next/navigation' after successful submission.
6. Validation - Can be handled client-side or server-side.
7. Security - Server Actions reduce need for API routes, improving security and performance.

Definition (Using Specific Terms):
In Next.js App Router, **Form Submissions** can be handled using **Server Actions** or 
traditional client-side event handlers. A **Server Action** is a function that runs 
on the server, can receive a **FormData** object, perform operations, and optionally 
use **redirect()** to navigate. Forms that require **interactivity** must be in **Client Components** 
(marked with 'use client').

Code Example:

// app/contact/page.js
'use client'
import { useState } from 'react'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const name = formData.get('name')
    const email = formData.get('email')

    // Call a server action
    await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name, email }),
    })
    setSubmitted(true)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" required />
      <input name="email" placeholder="Email" type="email" required />
      <button type="submit">Submit</button>
      {submitted && <p>Form submitted successfully!</p>}
    </form>
  )
}

// Server Action Example (app/actions/contact.js)
'use server'
import { redirect } from 'next/navigation'

export async function submitContact(formData) {
  const name = formData.get('name')
  const email = formData.get('email')
  // Perform server-side operation, e.g., save to database
  console.log('Received:', name, email)

  // Redirect after submission
  redirect('/thank-you')
}

Follow-up Questions + Answers:

Q1: What is a Server Action in Next.js form handling?
A1: A Server Action is a server-side function that can handle form submissions directly, 
    eliminating the need for separate API routes.

Q2: Do all forms require 'use client'?
A2: Only forms that need client-side interactivity (state, events, validation) require 'use client'. 
    Pure server-handled forms can remain in Server Components.

Q3: How do you access form values in Server Actions?
A3: Use the **FormData** API to get values from submitted form fields.

Q4: Can you redirect after form submission?
A4: Yes, using the 'redirect()' helper from 'next/navigation' in Server Actions.

Q5: Can validation be handled server-side in App Router?
A5: Yes, Server Actions allow server-side validation for security and consistency.
*/
