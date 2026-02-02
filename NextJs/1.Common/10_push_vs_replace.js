/* 10_push_vs_replace */
/*
Key Points (Interviewer Keywords + Explanation):
1. Programmatic Navigation –
   push and replace are methods
   used for navigation via useRouter.

2. History Management –
   push adds a new entry
   to the browser history.

   replace updates the current entry
   without adding a new one.

3. Back Button Behavior –
   push allows going back
   to the previous page.

   replace prevents navigating back
   to the replaced page.

4. Common Use Cases –
   push is used for normal navigation.

   replace is used for redirects,
   auth flows, or form submissions.
*/

/*
Definition (Using Specific Terms):
router.push() navigates to a new route
and adds a new entry
to the browser history stack.

router.replace() navigates to a new route
but replaces the current history entry,
so the previous page
is not accessible via the back button.
*/

/*
Code Example (Usage):

"use client";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const goWithPush = () => {
    router.push("/dashboard");
  };

  const goWithReplace = () => {
    router.replace("/login");
  };

  return (
    <>
      <button onClick={goWithPush}>Push</button>
      <button onClick={goWithReplace}>Replace</button>
    </>
  );
}
*/

/*
Comparison Summary:
push →
- Adds history entry
- Back button works

replace →
- No history entry
- Back button blocked
*/

/*
Follow-up Questions + Answers:

Q1: When should we use push?
A1: For normal navigation
    where back navigation is required.

Q2: When should we use replace?
A2: For redirects
    or auth-related flows.

Q3: Do push and replace cause
    a full page reload?
A3: No, both use
    client-side navigation.

Q4: Are push and replace
    available in React Router?
A4: Yes, similar behavior exists
    using navigate().

Q5: Do push and replace
    work in Server Components?
A5: No, they are
    Client Component APIs.
*/
