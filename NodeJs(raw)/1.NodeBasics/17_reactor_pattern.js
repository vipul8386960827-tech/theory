/* 17_reactor_pattern.js

=====================================================
Reactor Pattern
=====================================================

Definition (What I should say in the interview):
- "The reactor pattern is the design behind Node's event loop. The application submits an I/O
   request along with a **handler**, the **event demultiplexer** (OS mechanisms like epoll /
   kqueue / IOCP via libuv) watches all I/O, and when operations complete it pushes events to
   the **event queue**. The **event loop** then picks each event and calls its handler. This
   lets one thread manage many I/O operations."

-----------------------------------------------------
Steps
-----------------------------------------------------
1. App requests I/O and provides a handler (callback).
2. Request goes to the **Event Demultiplexer** (non-blocking; returns immediately).
3. When I/O completes, the demultiplexer pushes an event + handler into the **Event Queue**.
4. The **Event Loop** iterates over the queue and executes each handler.
5. Handlers may start new I/O -> cycle repeats.
6. When there is nothing left to do, the process exits.

-----------------------------------------------------
Diagram
-----------------------------------------------------
 Application --(I/O + handler)--> Event Demultiplexer (libuv / OS)
      ^                                      |
      |                               (I/O completed)
 Event Loop <---------- Event Queue <--------+

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Which component is the event demultiplexer in Node?
A1: libuv, which uses epoll (Linux), kqueue (macOS) or IOCP (Windows).

Q2: Why is it efficient?
A2: One thread handles many I/O operations without blocking or creating a thread per request.
*/
