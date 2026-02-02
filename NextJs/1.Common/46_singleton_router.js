/* 46_singleton_router */
/*
Key Points (Interviewer Keywords + Explanation):
1. Singleton Router – Next.js provides a single global router instance
   accessible anywhere in the app.

2. Purpose – Allows using router methods (push, replace, prefetch) 
   outside React components, like in utility functions or modules.

3. Implementation – Import `singletonRouter` from `next/router` 
   (Pages Router) or use `useRouter` inside components.

4. Methods – Common methods include `push()`, `replace()`, `prefetch()`, 
   `events.on()` for route changes.

5. Use Cases – Programmatic navigation in non-component code, 
   analytics on route change, prefetching pages globally.
*/

/*
Definition (Using Specific Terms):
Singleton Router in Next.js is a globally accessible router instance 
that mirrors the behavior of `useRouter` but can be used anywhere, 
not just inside React components. It allows programmatic navigation 
and listening to route events globally.
*/

/*
Code Example (Using Singleton Router outside component):

import Router from "next/router";

// Navigate programmatically
function goToAbout() {
  Router.push("/about");
}

// Listen to route change events
Router.events.on("routeChangeStart", (url) => {
  console.log("Route is changing to:", url);
});

export { goToAbout };
*/

/*
Code Example (Inside Component with useRouter):

import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/about"); // component-level navigation
  };

  return <button onClick={handleClick}>Go to About</button>;
}
*/

/*
Important Notes:
- Singleton Router is specific to Pages Router; App Router uses `useRouter` hook.
- Useful for navigation in non-component files or global route handling.
- Supports all router methods: push, replace, prefetch, and event listeners.
- Avoid overusing singletonRouter for component logic; prefer useRouter inside components.
*/

/*
Follow-up Questions + Answers:

Q1: What is Singleton Router in Next.js?
A1: A globally accessible router instance for programmatic navigation and event handling.

Q2: How is it different from useRouter?
A2: useRouter works inside React components; Singleton Router can be used anywhere.

Q3: Which router does it apply to?
A3: Pages Router (pages/ folder).

Q4: What can you do with Singleton Router?
A4: push/replace navigation, prefetch pages, listen to route events globally.

Q5: Should you use it inside components?
A5: Prefer useRouter inside components; Singleton Router is mainly for non-component code.
*/