/* 10_fetch_data_page */
/*
Key Points (Interviewer Keywords + Explanation):
1. Fetch Data Page – A Next.js page that retrieves data from an API or server 
   for rendering.

2. Purpose – Display dynamic content on pages using server-side or static fetching methods.

3. Features –
   - Can use `getStaticProps` for SSG (Static Site Generation).
   - Can use `getServerSideProps` for SSR (Server-Side Rendering).
   - Fetching can be from REST APIs, GraphQL, or local data.
   - Data is passed as `props` to the page component.

4. Benefits –
   - Pre-rendered data improves SEO and performance.
   - Fetching on server reduces client load and improves user experience.
   - Supports static or dynamic rendering based on use case.
*/

/*
Definition (Using Specific Terms):
A fetch data page in Next.js is a Pages Router component that retrieves
data using `getStaticProps` or `getServerSideProps` and renders it
on the server or at build time.
*/

/*
Code Example (Fetching Data in a Page):

// pages/users.js

// For SSG
export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  return {
    props: { users },
  };
}

// Page Component
export default function UsersPage({ users }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}

/*
Important Notes:
- Use `getStaticProps` for static pre-rendering (SSG) at build time.
- Use `getServerSideProps` for dynamic server-side fetching (SSR).
- Always handle errors and fallback states.
- Supports passing fetched data as props to the component.
*/

/*
Follow-up Questions + Answers:

Q1: How do you fetch data for a Next.js page?
A1: Use `getStaticProps` for SSG or `getServerSideProps` for SSR.

Q2: Where is the fetched data available?
A2: Passed as `props` to the page component.

Q3: Can you fetch data on the client-side?
A3: Yes, using useEffect or SWR, but SEO benefits may be reduced.

Q4: When to use SSG vs SSR?
A4: SSG for static content, SSR for dynamic content that changes per request.

Q5: Can APIs be external or internal?
A5: Both; can fetch from external REST/GraphQL APIs or internal Next.js API routes.
*/
