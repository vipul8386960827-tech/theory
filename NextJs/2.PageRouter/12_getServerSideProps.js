/*
Key Points (Interviewer Keywords + Explanation):
1. getServerSideProps – A Next.js Pages Router function used for Server-Side Rendering (SSR).

2. Purpose – Fetch data **on every request** and render the page on the server with that data.

3. Features –
   - Runs on the server **for each request**.
   - Returns an object with `props` to pass to the page component.
   - Can access request-specific data like headers, cookies, or query parameters.
   - Ideal for dynamic data that changes frequently.

4. Benefits –
   - Page is always up-to-date with latest data.
   - SEO-friendly since HTML is generated on the server.
   - Can access authentication or session data per request.
*/

/*
Definition (Using Specific Terms):
`getServerSideProps` is a Pages Router function that fetches data at
request time, allowing the page to be server-rendered with dynamic content.
*/

/*
Code Example (getServerSideProps):

// pages/orders.js
export async function getServerSideProps(context) {
  const { req, query } = context; // access request or query params
  const res = await fetch(`https://api.example.com/orders?user=${req.cookies.userId}`);
  const orders = await res.json();

  return {
    props: { orders }, // passed to page component
  };
}

// Page Component
export default function OrdersPage({ orders }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Orders</h1>
      <ul>
        {orders.map((o) => (
          <li key={o.id}>{o.productName} - {o.status}</li>
        ))}
      </ul>
    </div>
  );
}

/*
Important Notes:
- Runs on every request (SSR).
- Can access request-specific data like cookies, headers, and query.
- Slower than SSG since server generates HTML per request.
- Ideal for frequently changing data or authenticated content.
*/

/*
Follow-up Questions + Answers:

Q1: What is getServerSideProps?
A1: A function to fetch data at request time for SSR in Pages Router.

Q2: When is getServerSideProps executed?
A2: On every page request, server-side.

Q3: Can it access request headers or cookies?
A3: Yes, through the `context` parameter.

Q4: How does it differ from getStaticProps?
A4: getStaticProps runs at build time; getServerSideProps runs per request.

Q5: Can you use it with dynamic routes?
A5: Yes, works with dynamic routes like [id].js and query parameters.
*/
