/* 
Key Points (Interviewer Keywords + Explanation):
1. Dynamic Routes - Routes in Next.js App Router that can change based on URL parameters.
2. Route Parameter - Placeholders in square brackets [param] that capture dynamic segments.
3. Optional Catch-all Routes - '[...param]' captures multiple URL segments as an array.
4. Accessing Params - The 'params' object is automatically passed to the page component.
5. Nested Dynamic Routes - You can combine dynamic routes with nested folders.
6. Client-side Navigation - 'useRouter' or 'Link' can be used to navigate to dynamic routes.
7. SEO-friendly URLs - Dynamic routes allow meaningful URLs like /blog/123 or /user/john.

Definition (Using Specific Terms):
In Next.js App Router, **Dynamic Routes** are created using square brackets in folder or file names. 
They allow capturing values from the URL as **route parameters**, which are accessible 
via the **params object**. Optional **catch-all routes** using '[...param]' can capture 
multiple segments, and dynamic routes can be nested to form complex URL structures.

Code Example:

// app/blog/[id]/page.js
export default function BlogPost({ params }) {
  return (
    <div>
      <h1>Blog Post ID: {params.id}</h1>
    </div>
  )
}

// app/blog/[category]/[postId]/page.js
export default function BlogCategoryPost({ params }) {
  return (
    <div>
      <h1>
        Category: {params.category}, Post ID: {params.postId}
      </h1>
    </div>
  )
}

// app/blog/[...slug]/page.js
export default function BlogCatchAll({ params }) {
  return (
    <div>
      <h1>Slug Path: {params.slug.join('/')}</h1>
    </div>
  )
}

// Client-side navigation example
'use client'
import Link from 'next/link'

export default function BlogList() {
  return (
    <div>
      <Link href="/blog/123">Go to Blog 123</Link>
      <Link href="/blog/tech/456">Go to Tech Blog 456</Link>
    </div>
  )
}

Follow-up Questions + Answers:

Q1: How do you create a dynamic route in App Router?
A1: Wrap the folder or file name in square brackets, e.g., '[id]' 
    to capture the URL segment as a route parameter.

Q2: What is a catch-all route?
A2: Use '[...param]' to capture multiple URL segments into an array, 
    useful for deeply nested or unknown paths.

Q3: How do you access route parameters in a page?
A3: Next.js passes a 'params' object to the page component. 
    For example, params.id for '[id]' or params.slug for '[...slug]'.

Q4: Can dynamic routes be nested?
A4: Yes, you can nest dynamic routes to create URLs like 
    /blog/[category]/[postId].

Q5: How do you navigate to a dynamic route from the client side?
A5: Use Next.js 'Link' component or 'useRouter().push' 
    for programmatic navigation.
*/
