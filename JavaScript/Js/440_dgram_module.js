/* 440_dgram_module.js

=====================================================
dgram Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `dgram` module in Node.js provides an API for **UDP (User Datagram Protocol) sockets**, 
   allowing you to send and receive datagrams over the network. 
   It is useful for applications requiring low-latency, connectionless communication, 
   such as real-time gaming, DNS servers, or IoT devices."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **createSocket(type[, callback])** → Creates a UDP socket. `type` can be `'udp4'` or `'udp6'`.
2. **socket.send(msg, port, address[, callback])** → Sends a message to a remote UDP host.
3. **socket.on('message', callback)** → Receives messages sent to the socket.
4. **socket.bind(port[, address][, callback])** → Binds the socket to a port and optional address.
5. **socket.close()** → Closes the socket.
6. Event-driven: handles `'message'`, `'listening'`, `'error'`, and `'close'` events.
7. Connectionless: no handshake or persistent connection is required.

-----------------------------------------------------
Basic Example (UDP Server)
-----------------------------------------------------
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
  console.log(`Received message: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.bind(41234, () => {
  console.log('UDP server listening on port 41234');
});

-----------------------------------------------------
Basic Example (UDP Client)
-----------------------------------------------------
const client = dgram.createSocket('udp4');
const message = Buffer.from('Hello UDP server');

client.send(message, 41234, 'localhost', (err) => {
  if (err) console.error(err);
  else console.log('Message sent');
  client.close();
});

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Real-time applications like games or chat apps.
- Lightweight message broadcasting.
- IoT devices communicating with minimal overhead.
- DNS servers and other network utilities requiring fast, connectionless protocols.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. UDP is **connectionless**, so delivery is not guaranteed.
2. Messages may arrive out of order or get lost; handle accordingly.
3. Use `Buffer` to send binary or text data.
4. Works for both IPv4 (`udp4`) and IPv6 (`udp6`).
5. Event-driven API makes it easy to handle multiple messages asynchronously.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of UDP as **sending letters without tracking**:
  - You just drop them in the mailbox (send), but you can't guarantee they will arrive or arrive in order.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between TCP and UDP?  
A1: TCP is connection-oriented and reliable; UDP is connectionless and faster but unreliable.

Q2: How do you handle lost UDP messages?  
A2: Implement retry mechanisms, sequence numbers, or acknowledgments in your application.

Q3: What events does a dgram socket emit?  
A3: `'message'`, `'listening'`, `'error'`, `'close'`.

Q4: Can UDP be used for streaming data?  
A4: Yes, for low-latency streaming, but you may need to handle packet loss and order.

Q5: How do you specify IPv4 vs IPv6 in dgram?  
A5: By using `'udp4'` for IPv4 and `'udp6'` for IPv6 when creating a socket.
*/
