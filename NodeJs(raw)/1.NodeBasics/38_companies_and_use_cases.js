/* 38_companies_and_use_cases.js

=====================================================
Companies Using Node.js and Real-World Use Cases
=====================================================

Definition (What I should say in the interview):
- "Node is used by companies like **Netflix, PayPal, LinkedIn, Uber, Walmart, NASA and Trello**.
   They mainly use it for **I/O-heavy** services: REST and GraphQL APIs, real-time features like
   chat and notifications, streaming, and backend-for-frontend layers that aggregate data from
   other microservices. A well-known example is PayPal, which reported faster development and
   better response times after moving parts of its stack from Java to Node. In my own work I've
   used Node mostly for REST APIs with Express and integrations with databases and third-party APIs."

-----------------------------------------------------
Companies and How They Use Node
-----------------------------------------------------
| Company   | Use case                                                        |
|-----------|-----------------------------------------------------------------|
| Netflix   | UI/server layer (BFF), faster startup times for web UI          |
| PayPal    | Web apps moved from Java to Node; fewer lines, faster responses |
| LinkedIn  | Mobile backend moved from Ruby on Rails to Node                 |
| Uber      | Matching and dispatch systems (high volume of I/O)              |
| Walmart   | Handling heavy traffic for e-commerce (e.g. Black Friday)       |
| Trello    | Real-time updates using WebSockets                              |
| NASA      | Data APIs for spacesuit and mission data                        |

-----------------------------------------------------
Common Use Cases
-----------------------------------------------------
1. REST / GraphQL APIs and microservices.
2. Real-time apps -> chat, live dashboards, notifications (Socket.IO, WebSockets).
3. BFF / API gateway -> aggregating multiple backend calls for the frontend.
4. Streaming -> file uploads, video/audio streaming, proxies.
5. Serverless functions -> AWS Lambda, Vercel, Cloudflare (fast cold start).
6. SSR -> Next.js, Nuxt.
7. CLI tools and dev tooling -> npm, ESLint, Webpack, Vite.
8. IoT and queue consumers -> lightweight event-driven processing.

-----------------------------------------------------
Example (typical real-time use case)
-----------------------------------------------------
const { WebSocketServer } = require('ws');   // npm i ws
const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (socket) => {
  socket.on('message', (msg) => {
    // broadcast to all clients - thousands of idle connections are cheap in Node
    wss.clients.forEach((client) => client.send(msg.toString()));
  });
});

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Avoid Node for heavy CPU work (video encoding, ML training) unless offloaded to workers.
- Exact numbers from case studies vary by source; in interviews, mention the pattern, not stats.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why do companies choose Node for a BFF layer?
A1: It's mostly waiting on other services (I/O), JSON is native, and frontend devs can work on it.

Q2: Give an example where Node is a bad fit.
A2: A service doing heavy image processing or big number crunching on every request.
*/
