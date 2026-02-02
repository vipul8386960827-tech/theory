/* 239_react_server_components.js

=====================================
React Server Components (RSC)
=====================================

Definition:
React Server Components allow rendering parts of a React application on the server
instead of the client. This reduces the amount of JavaScript sent to the browser,
improves performance, and enables seamless integration of server-side data fetching
with React components.

Key Points:
1. Server-Side Execution:
   - Components run on the server.
   - Can fetch data directly without sending extra JS to the client.

2. Reduced Bundle Size:
   - Client only receives code necessary for interactivity.
   - Static and server-only components do not bloat the client bundle.

3. Seamless Integration with Client Components:
   - RSC can be mixed with regular client components.
   - Client components handle interactivity, server components handle rendering and data.

4. No Browser-Specific APIs:
   - Server components cannot use hooks like useState or useEffect.
   - They focus on rendering and returning JSX.

5. Streaming Support:
   - Server components can stream content progressively to the client.

Example:
Server Component:
export default function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

Client Component using Server Component:
import UserList from './UserList.server';
function App() {
  const users = fetchUsersFromDB(); // Server-side fetch
  return <UserList users={users} />;
}

Analogy:
- Server Component = chef in the kitchen preparing meals (HTML/JSX) for you.
- Client Component = waiter serving and adding interactive toppings (clicks, inputs) in real-time.

Follow-Up Interview Questions:
Q1: Can server components use useState or useEffect?
A1: No, those hooks are client-side only.

Q2: How do server components improve performance?
A2: They reduce client JS bundle size and render components on the server, lowering network overhead.

Q3: Can you mix server and client components in one page?
A3: Yes, server components can pass props to client components seamlessly.

Q4: Do server components replace SSR (Server-Side Rendering)?
A4: Not entirely; they complement SSR by allowing selective server-only rendering for parts of the UI.

*/
