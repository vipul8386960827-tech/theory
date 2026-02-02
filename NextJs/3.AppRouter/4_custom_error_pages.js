/* 
Key Points (Interviewer Keywords + Explanation):
1. Custom Error Pages - Pages that handle specific HTTP errors like 404 or 500.
2. File Naming Convention - Use 'not-found.js' for 404 and 'error.js' for global errors in App Router.
3. Error Boundaries - 'error.js' acts as a React error boundary to catch runtime errors in child components.
4. Server and Client Rendering - Error pages can be Server Components by default or Client Components if needed.
5. Redirects - You can programmatically redirect from error pages using 'redirect()' or 'notFound()'.
6. Reusability - Shared layout can be used for custom error pages to keep UI consistent.
7. User-friendly Messages - Provides clear feedback to the user instead of generic server errors.

Definition (Using Specific Terms):
In Next.js App Router, **Custom Error Pages** allow developers to handle HTTP errors 
like 404 (Not Found) or runtime errors in components. A **'not-found.js'** file handles 
404 errors, while **'error.js'** acts as an **Error Boundary** catching exceptions. 
These pages can use existing **layouts**, be rendered on the **server** or **client**, 
and provide user-friendly messages or redirects using built-in helpers.

Code Example:

// app/not-found.js
export default function NotFoundPage() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  )
}

// app/error.js
'use client'
import { useEffect } from 'react'

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  )
}

// Using layout with error pages
// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <header>Header</header>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  )
}

Follow-up Questions + Answers:

Q1: How do you create a 404 custom page in App Router?
A1: Create a 'not-found.js' file in the 'app' directory. 
    Next.js automatically uses it for missing pages.

Q2: How does 'error.js' work in App Router?
A2: 'error.js' acts as a React **Error Boundary** and catches runtime errors 
    in child components. It receives 'error' and 'reset' props.

Q3: Can error pages use Client Components?
A3: Yes, you can mark error pages with 'use client' if interactivity is needed, 
    e.g., reset buttons.

Q4: How do you programmatically show 404 from a Server Component?
A4: Import and call the 'notFound()' helper from 'next/navigation' 
    to throw a 404 error.

Q5: Can layouts be used with error pages?
A5: Yes, error pages can share layouts for consistent header/footer or design.
*/
