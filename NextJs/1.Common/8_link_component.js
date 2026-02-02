/*
Key Points (Interviewer Keywords + Explanation):
1. Client-Side Navigation –
   The Link component enables navigation
   without a full page reload.

2. SPA Behavior –
   It preserves application state
   and provides smooth transitions.

3. Framework Integration –
   In React, it comes from react-router-dom.
   In Next.js, it comes from next/link.

4. Performance Optimization –
   Next.js Link supports automatic
   route prefetching.

5. SEO Friendly –
   It renders as a standard <a> tag.
   This makes it crawlable by search engines.

6. Accessibility –
   It supports keyboard navigation
   and screen readers.
*/

/*
Definition (Using Specific Terms):
The Link component is a routing abstraction
that enables client-side navigation
in React-based applications.

Instead of triggering a full page reload
like a normal anchor tag,
it leverages the framework’s router
to update the URL.

It reuses existing state
and renders only the required components.

In Next.js, Link also supports
route prefetching
and automatic code splitting.
*/

/*
Code Example (Usage):

// React (react-router-dom)
<Link to="/profile">Profile</Link>

// Next.js
import Link from "next/link";

<Link href="/profile">Profile</Link>
*/

/*
Follow-up Questions + Answers:

Q1: Why should we use Link instead of an <a> tag?
A1: Link prevents full page reloads
    and enables faster client-side navigation.

Q2: Does Next.js Link render an <a> tag internally?
A2: Yes, it renders a standard anchor tag
    under the hood.

Q3: What is prefetching in Next.js Link?
A3: Next.js automatically preloads
    the linked page’s code
    when the link enters the viewport.

Q4: Should Link be used for external URLs?
A4: No, external URLs should use
    a normal <a> tag.

Q5: Does using Link improve SEO?
A5: Indirectly yes,
    because it improves performance
    while still rendering crawlable links.
*/
/*
Key Points (Interviewer Keywords + Explanation):
1. Client-Side Navigation –
   The Link component enables navigation
   without a full page reload.

2. SPA Behavior –
   It preserves application state
   and provides smooth transitions.

3. Framework Integration –
   In React, it comes from react-router-dom.
   In Next.js, it comes from next/link.

4. Performance Optimization –
   Next.js Link supports automatic
   route prefetching.

5. SEO Friendly –
   It renders as a standard <a> tag.
   This makes it crawlable by search engines.

6. Accessibility –
   It supports keyboard navigation
   and screen readers.
*/

/*
Definition (Using Specific Terms):
The Link component is a routing abstraction
that enables client-side navigation
in React-based applications.

Instead of triggering a full page reload
like a normal anchor tag,
it leverages the framework’s router
to update the URL.

It reuses existing state
and renders only the required components.

In Next.js, Link also supports
route prefetching
and automatic code splitting.
*/

/*
Code Example (Usage):

// React (react-router-dom)
<Link to="/profile">Profile</Link>

// Next.js
import Link from "next/link";

<Link href="/profile">Profile</Link>
*/

/*
Follow-up Questions + Answers:

Q1: Why should we use Link instead of an <a> tag?
A1: Link prevents full page reloads
    and enables faster client-side navigation.

Q2: Does Next.js Link render an <a> tag internally?
A2: Yes, it renders a standard anchor tag
    under the hood.

Q3: What is prefetching in Next.js Link?
A3: Next.js automatically preloads
    the linked page’s code
    when the link enters the viewport.

Q4: Should Link be used for external URLs?
A4: No, external URLs should use
    a normal <a> tag.

Q5: Does using Link improve SEO?
A5: Indirectly yes,
    because it improves performance
    while still rendering crawlable links.
*/
