/* 22_nodejs_vs_other_backends.js

=====================================================
Node.js vs Other Backends (Java, Python, PHP, Go, .NET)
=====================================================

Definition (What I should say in the interview):
- "The main difference is the **concurrency model**. Traditional stacks like Java (Spring MVC),
   PHP or Django usually handle each request on its own thread or process, which blocks while
   waiting for I/O. Node uses a **single-threaded event loop with non-blocking I/O**, so one
   process can handle thousands of concurrent connections with low memory. The trade-off is that
   Node is weaker for CPU-heavy work, where Java, Go or .NET can use multiple cores more naturally."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Node -> event loop + async I/O; great for I/O-bound APIs, real-time apps, BFFs.
2. Java / .NET -> multi-threaded, mature enterprise tooling, strong typing, good for heavy CPU.
3. Python -> great for ML/data science; Django/Flask are mostly sync (FastAPI/asyncio is async).
4. PHP -> classic request-per-process model, simple hosting (WordPress, Laravel).
5. Go -> goroutines give cheap concurrency AND real parallelism; compiled, fast, small binaries.
6. Node advantage: same language (JavaScript/TypeScript) on frontend and backend, huge npm ecosystem.

-----------------------------------------------------
Comparison Table
-----------------------------------------------------
| Feature           | Node.js          | Java (Spring)     | Python (Django)  | Go              |
|-------------------|------------------|-------------------|------------------|-----------------|
| Concurrency       | Event loop       | Thread per request| Process/thread   | Goroutines      |
| CPU-heavy work    | Weak (needs      | Strong            | Weak (GIL)       | Strong          |
|                   | worker_threads)  |                   |                  |                 |
| Memory per conn.  | Low              | Higher            | Higher           | Low             |
| Typing            | Dynamic (TS opt.)| Static            | Dynamic          | Static          |
| Best for          | APIs, real-time  | Enterprise, banks | ML, scripting    | Infra, services |

-----------------------------------------------------
Example (Node handling many waits without threads)
-----------------------------------------------------
const http = require('http');

http.createServer(async (req, res) => {
  // simulate a 1s DB call - the thread is NOT blocked while waiting
  await new Promise((r) => setTimeout(r, 1000));
  res.end('done');
}).listen(3000);
// 1000 concurrent requests all finish in about 1s, with one thread.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Don't say "Node is faster than Java" in general. It is efficient for I/O-bound work;
  for raw CPU throughput Java/Go are usually faster.
- Modern Java (virtual threads, WebFlux) and Python (asyncio) can also do non-blocking I/O.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: When would you choose Java or Go over Node?
A1: For CPU-intensive services (heavy computation, video processing) or when a team needs
    strict typing and multi-core parallelism out of the box.

Q2: Why did your team pick Node?
A2: Mostly I/O-bound REST APIs, same language as the React frontend, fast development with npm,
    and easy JSON handling.

Q3: Can Node use multiple cores?
A3: Yes, via the cluster module, PM2, or worker_threads, or by running multiple containers.
*/
