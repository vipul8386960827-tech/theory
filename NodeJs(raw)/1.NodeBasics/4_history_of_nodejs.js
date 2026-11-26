/* 4_history_of_nodejs.js

=====================================================
History of Node.js
=====================================================

Definition (What I should say in the interview):
- "Node.js was created by **Ryan Dahl in 2009**. He wanted a better way to handle many
   concurrent connections than the traditional thread-per-request model, so he combined
   Google's V8 engine with an event loop and non-blocking I/O."

-----------------------------------------------------
Key Timeline
-----------------------------------------------------
- 2009 -> Ryan Dahl releases Node.js.
- 2010 -> npm is introduced (Isaac Z. Schlueter).
- 2014 -> io.js fork (community wanted faster releases and open governance).
- 2015 -> Node.js and io.js merge under the **Node.js Foundation**.
- 2019 -> Node.js Foundation + JS Foundation merge into the **OpenJS Foundation**.
- Today -> a new major version every ~6 months; even-numbered versions become **LTS**.

-----------------------------------------------------
Why it was created
-----------------------------------------------------
- Servers like Apache used one thread per connection -> memory heavy, threads sit idle waiting for I/O.
- Node's idea: one thread + event loop + non-blocking I/O -> handle thousands of connections cheaply.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Who maintains Node.js now?
A1: The OpenJS Foundation and the open-source community.

Q2: What did Ryan Dahl create later?
A2: Deno (2018), addressing what he considered Node's design mistakes.
*/
