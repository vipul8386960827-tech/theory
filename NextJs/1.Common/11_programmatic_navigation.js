/* 11_programmatic_navigation */
/*
Key Points (Interviewer Keywords + Explanation):
1. Definition – Programmatic navigation means changing routes using JavaScript
   instead of clicking links.

2. Router Hook – In Next.js, this is done using the useRouter hook.

3. Client-Side Navigation – Navigation happens without a full page reload.

4. Common Scenarios – Used after form submission, login success, logout,
   or conditional redirects.

5. App Router Context – Programmatic navigation works only in Client Components.
*/

/*
Definition (Using Specific Terms):
Programmatic navigation is the process of navigating between routes using router APIs
instead of UI links.

In Next.js App Router, this is achieved using the useRouter hook from "next/navigation",
which provides methods like push, replace, and back.
*/

/*
Code Example (Usage):

"use client";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/dashboard");
  };

  return <button onClick={handleLogin}>Login</button>;
}
*/

/*
Common Navigation Methods:
- router.push() → Navigate and add a history entry.
- router.replace() → Navigate without adding a history entry.
- router.back() → Go to the previous page.
- router.refresh() → Re-fetch server data.
*/

/*
Follow-up Questions + Answers:

Q1: What is programmatic navigation?
A1: Navigating between routes using JavaScript logic instead of clicking links.

Q2: Which hook is used for programmatic navigation in Next.js?
A2: useRouter from "next/navigation".

Q3: Can programmatic navigation cause a full page reload?
A3: No, it uses client-side routing.

Q4: Can it be used in Server Components?
A4: No, it works only in Client Components.

Q5: When should we prefer programmatic navigation?
A5: When navigation depends on logic or user actions.
*/
