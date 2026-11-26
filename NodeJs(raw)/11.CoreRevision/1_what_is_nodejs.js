/* 1_what_is_nodejs.js

=====================================================
What is Node.js?
=====================================================

Definition (What I should say in the interview):
- "Node.js is an open-source, cross-platform **JavaScript runtime environment** built on
   Chrome's **V8 engine**. It lets us run JavaScript outside the browser, mainly on the server.
   It uses an **event-driven, non-blocking I/O model** (powered by **libuv**), which makes it
   lightweight and efficient for I/O-heavy applications like APIs and real-time apps."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. **Runtime, not a language or framework** -> the language is JavaScript.
2. **V8 engine** -> compiles JS to machine code (fast execution).
3. **libuv** -> provides the event loop, async I/O and a thread pool.
4. **Single-threaded event loop** for JS code + non-blocking I/O -> handles many
   concurrent connections with few resources.
5. Comes with **built-in modules** (fs, http, path, events, crypto, stream...).
6. Has **npm**, the largest package ecosystem in the world.
7. Same language on frontend + backend -> full-stack JavaScript (MERN/MEAN).

-----------------------------------------------------
Basic Example (a web server in a few lines)
-----------------------------------------------------
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello from Node.js');
});

server.listen(3000, () => console.log('Server running on port 3000'));

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- REST / GraphQL APIs and backend services
- Real-time apps (chat, notifications, live dashboards) with WebSockets
- Streaming apps (video/audio, file uploads)
- Microservices, CLI tools, build tools (webpack, Vite run on Node)

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Browser = one "house" where JS lives. Node.js = a second house for JS on the server,
  with different furniture (fs, http, process instead of DOM, window).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Who created Node.js and when?
A1: Ryan Dahl, in 2009.

Q2: Is Node.js good for CPU-heavy work?
A2: Not by default - heavy CPU work blocks the single JS thread. Use worker_threads,
    child processes, or a different service for that.

Q3: Why is Node.js fast?
A3: V8 compiles JS to machine code, and non-blocking I/O means the thread never sits idle waiting for I/O.

Q4: What is the difference between Node.js and JavaScript?
A4: JavaScript is the language; Node.js is an environment that runs it outside the browser.
*/
