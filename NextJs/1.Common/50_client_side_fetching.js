/* 50_client_side_fetching */
/*
Key Points (Interviewer Keywords + Explanation):
1. Client-Side Fetching – Fetching data from the client (browser)
   after the page has loaded, using JavaScript.

2. Implementation – Use React hooks like `useEffect` and `useState`
   to fetch data from APIs or endpoints.

3. Use Cases – Dynamic data that changes frequently,
   personalized content, user interactions.

4. Tools – `fetch`, `axios`, or any client-side HTTP library can be used.

5. Benefits – Offloads initial page rendering, enables dynamic updates,
   and reduces server load for non-critical content.
*/

/*
Definition (Using Specific Terms):
Client-Side Fetching in Next.js is the process of fetching data
from APIs on the browser after the initial page render.
It contrasts with SSR/SSG, where data is fetched on the server.
*/

/*
Code Example (Fetching in a component):

import { useState, useEffect } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
*/

/*
Important Notes:
- Runs in the browser after hydration.
- Useful for frequently changing or user-specific data.
- Can be combined with SWR or React Query for caching and revalidation.
- Unlike SSR/SSG, it does not improve SEO because data is not present on initial HTML.
- Avoid over-fetching to prevent unnecessary network requests.
*/

/*
Follow-up Questions + Answers:

Q1: What is client-side fetching in Next.js?
A1: Fetching data on the browser after page load using hooks or JS.

Q2: How is it different from SSR/SSG?
A2: SSR/SSG fetches data on the server; client-side fetching fetches in the browser.

Q3: Which hooks are commonly used?
A3: useEffect and useState.

Q4: Does client-side fetching improve SEO?
A4: No, because data is not present in the initial HTML.

Q5: Can you optimize client-side fetching?
A5: Yes, by using SWR, React Query, or caching strategies.
*/
