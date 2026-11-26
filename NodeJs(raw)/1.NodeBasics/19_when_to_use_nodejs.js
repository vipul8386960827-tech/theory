/* 19_when_to_use_nodejs.js

=====================================================
When to Use Node.js
=====================================================

Definition (What I should say in the interview):
- "Node.js is a great fit for **I/O-heavy, high-concurrency applications** - REST and GraphQL
   APIs, real-time apps like chat and notifications, streaming, microservices, and BFF layers
   for frontends. Basically, anywhere the server spends most of its time waiting on databases,
   networks or files rather than doing heavy computation."

-----------------------------------------------------
Good Use Cases
-----------------------------------------------------
1. **REST / GraphQL APIs** -> JSON in, JSON out, lots of DB calls.
2. **Real-time apps** -> chat, live tracking, multiplayer games, notifications (Socket.io).
3. **Streaming** -> video/audio, large file uploads/downloads.
4. **Microservices** -> lightweight, fast startup.
5. **BFF (Backend for Frontend)** / API gateways aggregating multiple services.
6. **Serverless functions** (AWS Lambda, Vercel).
7. **CLI tools and dev tooling** (npm, webpack, ESLint, Vite).
8. **SSR for frontend frameworks** (Next.js).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is Node good for real-time apps?
A1: Persistent connections (WebSockets) are cheap in an event-driven model - no thread per connection.
*/
