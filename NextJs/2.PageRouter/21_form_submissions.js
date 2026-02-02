/* 21_form_submissions */
/*
========================================
21_form_submissions (Next.js Pages Router & App Router)
========================================

Definition:
Form submissions involve sending user input from the frontend to the server.
In Next.js, how you handle forms differs between Pages Router and App Router,
especially regarding server-side handling, security, and data fetching.

--------------------------------
1) Pages Router Approach:
--------------------------------
- Form submissions typically send data to an **API route** (/pages/api/*)
- API route handles server-side logic:
  - Validates input
  - Authenticates user
  - Saves to database
- After processing, API route responds with JSON, or the page redirects

Example:

// pages/contact.js
export default function Contact() {
  return (
    <form action="/api/contact" method="POST">
      <input name="name" />
      <input name="email" />
      <button type="submit">Send</button>
    </form>
  )
}

// pages/api/contact.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body
    // process form (save to DB, send email, etc.)
    res.status(200).json({ message: 'Form submitted successfully' })
  } else {
    res.status(405).end() // Method Not Allowed
  }
}

Notes:
- Form can be standard HTML form or handled via fetch/AJAX from React
- Server-side validation is recommended
- Tokens (auth) can be sent via HttpOnly cookies (secure) or in headers

--------------------------------
2) App Router Approach:
--------------------------------
- Uses **Actions** to handle form submissions server-side
- Form can be submitted with `<form action={action}>`
- Server action handles validation and database logic
- Can integrate directly with Server Components

Example:

// app/contact/page.js
'use server'

import { submitForm } from './actions'

export default function ContactPage() {
  return (
    <form action={submitForm}>
      <input name="name" />
      <input name="email" />
      <button type="submit">Send</button>
    </form>
  )
}

// app/contact/actions.js
'use server'

export async function submitForm(formData) {
  const name = formData.get('name')
  const email = formData.get('email')
  // handle form server-side (DB, email, etc.)
}

Notes:
- No need for API route unless you want a REST endpoint
- Can access cookies, server session, or database directly
- Safer and cleaner than Pages Router for server-side handling

--------------------------------
3) Key Differences:
--------------------------------
| Feature                  | Pages Router           | App Router                  |
|--------------------------|----------------------|-----------------------------|
| Server-side handling     | API routes           | Actions / server components |
| Colocation with page     | No                   | Yes                         |
| Access to cookies        | Only via req in API   | Directly in server actions  |
| Ease of submission       | Moderate (API route) | Easy (action integrated)    |
| Streaming / RSC support  | No                   | Yes                         |

--------------------------------
4) Best Practices:
--------------------------------
- Always validate forms server-side
- Use CSRF protection if sending auth tokens
- Use HttpOnly cookies for sensitive auth tokens
- Prefer App Router actions if possible for modern apps

--------------------------------
Interview-ready one-liner:
"Pages Router handles form submissions via API routes, while App Router uses server actions,
 which allows colocated, secure, and server-rendered handling of forms."
*/
