/* 429_tls_module.js

=====================================================
TLS Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `tls` module in Node.js provides an implementation of the **Transport Layer Security (TLS)**
  and **Secure Socket Layer (SSL)** protocols. It allows Node.js applications to create secure 
  client-server communication channels with encryption and authentication."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Provides **encryption** for TCP connections (e.g., HTTPS).
2. Supports both **TLS servers** and **TLS clients**.
3. Uses **X.509 certificates** for authentication.
4. Built on top of the `net` module, but with security added.
5. Enables **mutual TLS authentication** (both server and client verify identities).
6. Can handle **ALPN** (Application-Layer Protocol Negotiation) for protocol selection (e.g., HTTP/2).

-----------------------------------------------------
Basic Example (TLS Server)
-----------------------------------------------------
const tls = require('tls');
const fs = require('fs');

const options = {
  key: fs.readFileSync('server-key.pem'),   // private key
  cert: fs.readFileSync('server-cert.pem'), // certificate
};

const server = tls.createServer(options, (socket) => {
  console.log('Client connected');
  socket.write('Welcome to the secure TLS server!\n');
  socket.setEncoding('utf8');
  socket.pipe(socket);
});

server.listen(8000, () => {
  console.log('TLS server listening on port 8000');
});

-----------------------------------------------------
Basic Example (TLS Client)
-----------------------------------------------------
const tls = require('tls');
const fs = require('fs');

const options = {
  ca: [ fs.readFileSync('server-cert.pem') ] // trusted certificate
};

const client = tls.connect(8000, options, () => {
  console.log('Client connected',
    client.authorized ? 'authorized' : 'unauthorized');
  client.write('Hello from client!\n');
});

client.on('data', (data) => {
  console.log('Received:', data.toString());
});

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Building secure servers (like HTTPS but custom protocols).
- Secure database connections (e.g., MongoDB, MySQL over TLS).
- Encrypted peer-to-peer communication.
- Mutual TLS authentication in enterprise apps.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. TLS requires certificates and private keys (can be self-signed or from a CA).
2. Always validate certificates in production to prevent MITM (Man-in-the-Middle attacks)
3. For HTTP specifically, prefer using the `https` module which internally uses `tls`.
4. Supports modern TLS versions (TLSv1.2, TLSv1.3 depending on Node version).
5. You can use ALPN for HTTP/2 or other protocol negotiation.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of TLS as **sealing a letter inside an envelope**:
  - Without TLS, anyone can read the letter (plain TCP).
  - With TLS, the letter is encrypted inside a secure envelope, only the intended recipient can read it.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between `https` and `tls`?  
A1: `https` is built on top of `tls` specifically for HTTP protocol. `tls` can be used for any protocol, not just HTTP.

Q2: What is the role of certificates in TLS?  
A2: Certificates validate the identity of servers (and optionally clients) and help establish trust.

Q3: How does TLS prevent eavesdropping?  
A3: By encrypting communication with symmetric keys exchanged securely via public-key cryptography.

Q4: Can TLS be used for mutual authentication?  
A4: Yes, TLS supports mutual authentication where both server and client present certificates.

Q5: What is the difference between TLS and SSL?  
A5: SSL is the older, deprecated protocol; TLS is the modern, secure replacement.
*/
