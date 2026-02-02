/* 51_graphql_setup */
/*
Key Points (Interviewer Keywords + Explanation):
1. GraphQL Setup – Integrating GraphQL APIs into a Next.js project for 
   efficient data fetching.

2. Implementation – Use GraphQL clients like **Apollo Client** or **urql**
   to communicate with GraphQL endpoints.

3. Setup Steps – Install client, configure provider at app root, and 
   use queries/mutations in components.

4. Use Cases – Fetching only required fields, combining multiple resources 
   in one request, real-time updates with subscriptions.

5. Benefits – Reduces over-fetching compared to REST, improves client-side 
   data management, and works with SSR/SSG or client-side fetching.
*/

/*
Definition (Using Specific Terms):
Setting up GraphQL in Next.js involves installing a GraphQL client 
(e.g., Apollo Client), configuring it at the top level of the app, 
and using GraphQL queries and mutations to fetch data efficiently 
from GraphQL endpoints.
*/

/*
Code Example (Apollo Client Setup):

// 1. Install dependencies
// npm install @apollo/client graphql

// 2. Create Apollo Client (lib/apollo.js)
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://example.com/graphql",
  cache: new InMemoryCache(),
});

// 3. Wrap app with ApolloProvider (_app.js)
import { ApolloProvider } from "@apollo/client";
import { client } from "../lib/apollo";

export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

// 4. Use query in a component
import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

export default function Users() {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
*/

/*
Important Notes:
- GraphQL works with both Pages Router and App Router.
- Can be used with SSR/SSG by using `getServerSideProps` or `getStaticProps`.
- Apollo Client cache improves performance and reduces repeated requests.
- Use GraphQL fragments and queries to minimize over-fetching.
- Subscriptions allow real-time updates if server supports them.
*/

/*
Follow-up Questions + Answers:

Q1: How do you setup GraphQL in Next.js?
A1: Install a client (Apollo/urql), configure provider at app root, use queries/mutations.

Q2: Can GraphQL work with SSR or SSG?
A2: Yes, you can fetch data server-side using `getServerSideProps` or `getStaticProps`.

Q3: Why use GraphQL over REST?
A3: Fetch only required fields, combine multiple resources in one request, reduce over-fetching.

Q4: Which client libraries are common?
A4: Apollo Client, urql.

Q5: How can you optimize GraphQL client performance?
A5: Use caching, fragments, batching, and pagination techniques.
*/
