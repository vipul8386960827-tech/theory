/* 441_net_module.js

=====================================================
Net Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `net` module in Node.js provides an API for creating **TCP or IPC (Inter-Process Communication) servers and clients**. 
   It allows developers to establish reliable, connection-oriented network communication, handle streaming data, 
   and build custom protocols over TCP."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **createServer([options][, connectionListener])** → Creates a TCP server.
2. **server.listen(port[, host][, callback])** → Starts listening on a specified port.
3. **net.connect(options[, connectionListener]) / net.createConnection()** → Creates a TCP client.
4. **socket.write(data[, encoding][, callback])** → Sends data over the socket.
5. **socket.on('data', callback)** → Receives incoming data.
6. **socket.on('end', callback)** → Triggered when the client disconnects.
7. Event-driven API supports `'connect'`, `'data'`, `'end'`, `'error'`, `'close'`.
8. Supports both IPv4 and IPv6 communication.
9. Provides low-level network control for custom protocols or streaming.

-----------------------------------------------------
Basic Example (TCP Server)
-----------------------------------------------------
const net = require('net');

const server = net.createServer((socket) => {
  console.log('Client connected');
  socket.on('data', (data) => {
    console.log('Received:', data.toString());
    socket.write('Echo: ' + data);
  });
  socket.on('end', () => console.log('Client disconnected'));
});

server.listen(8080, () => console.log('TCP server listening on port 8080'));

-----------------------------------------------------
Basic Example (TCP Client)
-----------------------------------------------------
const client = net.createConnection({ port: 8080 }, () => {
  console.log('Connected to server');
  client.write('Hello server!');
});

client.on('data', (data) => {
  console.log('Server says:', data.toString());
  client.end();
});

client.on('end', () => console.log('Disconnected from server'));

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Building custom TCP-based protocols or services.
- Real-time communication between servers or clients.
- Chat servers, game servers, or streaming services.
- IPC communication between Node.js processes.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. TCP is **connection-oriented** and ensures reliable, ordered delivery of data.
2. Data events may receive **chunks of data**, not full messages, so proper buffering may be needed.
3. Always handle `'error'` events to prevent crashes.
4. Supports both IPv4 and IPv6.
5. Use `net` for low-level network programming; higher-level protocols like HTTP can be built on top.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of `net` as a **phone call system**:
  - You establish a connection (call), talk (send/receive data), and hang up (end).
  - Unlike UDP, you are guaranteed that the message is delivered in order.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between `net` and `dgram` modules?  
A1: `net` uses TCP (reliable, connection-oriented), while `dgram` uses UDP (unreliable, connectionless).

Q2: How do you handle partial data in TCP?  
A2: Buffer incoming data and parse messages properly, since TCP delivers streams in chunks.

Q3: Can `net` be used for IPC?  
A3: Yes, by using UNIX domain sockets or named pipes.

Q4: What events are emitted by a TCP socket?  
A4: `'connect'`, `'data'`, `'end'`, `'error'`, `'close'`.

Q5: How is TCP different from HTTP?  
A5: HTTP is an application-level protocol built on top of TCP, while `net` works at the transport layer.
*/
