/* 6_advantages_of_nodejs.js

=====================================================
Advantages of Node.js
=====================================================

Definition (What I should say in the interview):
- "The main advantages of Node.js are its **non-blocking, event-driven architecture** that
   handles many concurrent requests efficiently, **fast execution with V8**, **one language
   for the full stack**, and the **npm ecosystem**."

-----------------------------------------------------
Advantages
-----------------------------------------------------
1. **Non-blocking I/O** -> the thread doesn't wait for DB/file/network; serves other requests.
2. **Fast** -> V8 compiles JS to machine code (JIT).
3. **Scalable** -> handles thousands of connections with low memory; easy horizontal scaling.
4. **Single language** -> JavaScript on frontend + backend.
5. **npm** -> huge library ecosystem.
6. **Great for real-time** -> chat, gaming, notifications, streaming.
7. **Streams** -> process large data in chunks with low memory.
8. **Lightweight** -> ideal for microservices and serverless.
9. **Active community** and regular LTS releases.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Which advantage matters most for an API server?
A1: Non-blocking I/O - most API time is spent waiting on DB/network, and Node keeps serving
    other requests during that wait.
*/
