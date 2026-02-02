/* 24_ssr */
/*
Key Points (Interviewer Keywords + Explanation):
1. SSR (Server-Side Rendering) – Next.js renders pages on the server
   at request time, sending fully formed HTML to the client.

2. Performance – Improves SEO and faster first meaningful paint
   compared to client-side rendering (CSR).

3. Data Fetching – Can fetch data on the server using getServerSideProps
   (Pages Router) or fetch in server components (App Router).

4. Use Cases – SEO-critical pages, dynamic content, dashboards,
   e-commerce product pages.

5. Trade-offs – Slower response per request than static pages,
   server load increases.
*/

/*
Definition (Using Specific Terms):
SSR in Next.js is a rendering strategy where the server generates
HTML for each request. The server fetches required data, renders
the React components, and sends complete HTML to the client.
This improves SEO and provides faster content display on initial load.
*/

/*
Code Example (Pages Router):

// pages/dashboard.js
export async function getServerSideProps() {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();

  return { props: { data } };
}

export default function Dashboard({ data }) {
  return <div>{JSON.stringify(data)}</div>;
}
*/

/*
Code Example (App Router – Server Component):

// app/dashboard/page.js
async function fetchData() {
  const res = await fetch("https://api.example.com/data");
  return res.json();
}

export default async function DashboardPage() {
  const data = await fetchData();
  return <div>{JSON.stringify(data)}</div>;
}
*/

/*
Important Notes:
- SSR pages are rendered on every request.
- Good for SEO and dynamic content.
- Increases server computation compared to static pages.
- Can combine SSR with client-side hydration for interactivity.
*/

/*
Follow-up Questions + Answers:

Q1: What is SSR in Next.js?
A1: Rendering pages on the server at request time, sending full HTML.

Q2: How do you implement SSR in Pages Router?
A2: Using getServerSideProps to fetch data server-side.

Q3: How about App Router?
A3: Server components or fetch in async page functions achieve SSR.

Q4: When should you use SSR?
A4: For SEO-critical, dynamic, or frequently changing content.

Q5: Disadvantages of SSR?
A5: Slower per-request response and higher server load.
*/
