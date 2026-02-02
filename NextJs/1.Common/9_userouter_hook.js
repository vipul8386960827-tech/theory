/* 9_userouter_hook */
/*
Key Points (Interviewer Keywords + Explanation):
1. Routing Hook –
   useRouter is a hook provided by Next.js
   to access routing information.

2. Programmatic Navigation –
   It allows navigation using JavaScript
   instead of clicking links.

3. Route Information –
   Provides access to pathname,
   query params, and route params.

4. Client-Side Only –
   useRouter works only in
   Client Components.

5. Next.js Specific –
   It is part of Next.js routing
   and not available in plain React.
*/

/*
Definition (Using Specific Terms):
useRouter is a Next.js hook
that provides access to the router object.

It allows developers to
navigate programmatically,
read the current route,
and access dynamic route parameters.

In the App Router,
useRouter comes from "next/navigation"
and is used inside Client Components.
*/

/*
Code Example (Usage):

"use client";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const goToProfile = () => {
    router.push("/profile");
  };

  return <button onClick={goToProfile}>Go</button>;
}
*/

/*
Common Router Methods:
- router.push() →
  Navigate to a new route.

- router.replace() →
  Navigate without adding history entry.

- router.back() →
  Go back to previous page.

- router.refresh() →
  Re-fetch server data for current route.
*/

/*
Follow-up Questions + Answers:

Q1: Why do we need useRouter?
A1: To navigate programmatically
    and access route-related data.

Q2: Can useRouter be used in Server Components?
A2: No, it works only
    in Client Components.

Q3: From where do we import useRouter
    in App Router?
A3: From "next/navigation".

Q4: What is the difference between
    push and replace?
A4: push adds a history entry,
    replace does not.

Q5: Is useRouter available in React?
A5: No, it is specific to Next.js.
*/
