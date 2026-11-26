/* 35_os_level_async_io.js

=====================================================
OS-Level Async I/O (epoll, kqueue, IOCP)
=====================================================

Definition (What I should say in the interview):
- "For network I/O, Node does not need extra threads, because the operating system itself can
   notify a single thread when many sockets are ready. libuv uses **epoll on Linux, kqueue on
   macOS and BSD, and IOCP on Windows**. In the poll phase, the event loop asks the OS 'which of
   my thousands of sockets have data?', gets the ready ones back, and runs their callbacks. That
   is how one Node process can hold tens of thousands of open connections cheaply."

-----------------------------------------------------
Mechanisms
-----------------------------------------------------
| OS             | Mechanism       | Model                                       |
|----------------|-----------------|---------------------------------------------|
| Linux          | epoll           | readiness: "socket is ready to read/write"  |
| macOS / BSD    | kqueue          | readiness                                   |
| Windows        | IOCP            | completion: "your read has completed"       |
| SunOS          | event ports     | readiness                                   |

-----------------------------------------------------
How it works (simplified)
-----------------------------------------------------
1. A socket is created and registered with epoll/kqueue/IOCP.
2. JS continues - nothing waits.
3. In the poll phase libuv calls epoll_wait (or equivalent), sleeping until something happens
   or until the next timer is due.
4. OS returns the list of ready sockets -> libuv reads data -> your 'data' / callback runs.

-----------------------------------------------------
Example (thousands of concurrent connections, one thread)
-----------------------------------------------------
const net = require('net');

let open = 0;
const server = net.createServer((socket) => {
  open++;
  socket.on('data', (d) => socket.write(`echo: ${d}`));
  socket.on('close', () => open--);
});

server.listen(4000, () => console.log('echo server on 4000'));
setInterval(() => console.log('open connections:', open), 5000).unref();
// Each idle connection costs only a file descriptor + small memory, not a thread.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Regular files are always "ready" for epoll, so it is useless for disk files -> that is why fs
  goes to the thread pool. Newer libuv versions experimented with io_uring on Linux for fs.
- Readiness (epoll) vs completion (IOCP) is hidden by libuv, so the same JS works everywhere.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Instead of a receptionist calling every room to ask "need anything?", each room has a bell and
  the receptionist just reacts to bells that ring.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is this better than one thread per connection?
A1: Threads cost memory (stack) and context switches; with epoll one thread handles thousands of idle sockets.

Q2: What limits connections then?
A2: File descriptor limits (ulimit -n), memory, and CPU for actual request processing.

Q3: Is this the C10K problem?
A3: Yes, event-driven I/O with epoll/kqueue is the classic solution to handling 10K+ concurrent connections.
*/
