/* 68_next_link */
/*
Key Points (Interviewer Keywords + Explanation):
1. Next/Link – Built-in Next.js component for client-side navigation
   between pages.

2. Purpose – Provides faster navigation by prefetching pages and
   avoiding full page reloads.

3. Implementation – Import Link from "next/link" and wrap anchor tags or components.

4. Features –
   - Client-side routing
   - Prefetch pages in the background
   - Works with dynamic routes
   - Supports both App Router and Pages Router

5. Benefits – Improved performance, seamless SPA-like navigation,
   better user experience, and SEO-friendly links.
*/

/*
Definition (Using Specific Terms):
Next/Link is a Next.js component that enables client-side navigation,
preloading linked pages for performance, and supports dynamic and static routes.
*/

/*
Code Example (Basic Usage):

import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/about">Go to About Page</Link>
    </div>
  );
}

/*
Code Example (With Dynamic Route):

// pages/blog/[id].js
export default function BlogPost({ params }) {
  return <h1>Blog Post {params.id}</h1>;
}

// Usage
<Link href="/blog/123">Read Blog 123</Link>

/*
Important Notes:
- Prefetch is enabled by default in production.
- Works for both static and dynamic routes.
- Supports App Router and Pages Router.
- Can wrap any component, not just <a>.
- Improves navigation speed without full page reload.
*/

/*
Follow-up Questions + Answers:

Q1: What is next/link used for?
A1: Client-side navigation between pages with prefetching.

Q2: Can it be used with dynamic routes?
A2: Yes, supports dynamic routes like /blog/[id].

Q3: How does prefetching work?
A3: Next.js automatically preloads linked pages in the background.

Q4: Does it reload the page like a normal anchor?
A4: No, it performs SPA-like navigation without full reload.

Q5: Can it be used in App Router?
A5: Yes, works in both App Router and Pages Router.
*/
