/* 439_http2_module.js

=====================================================
HTTP/2 Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `http2` module in Node.js allows creating **HTTP/2 clients and servers**, 
   providing faster and more efficient communication compared to HTTP/1.1. 
   HTTP/2 supports multiplexing, header compression, server push, and stream prioritization, 
   improving performance for modern web applications."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Supports **HTTP/2 server** and **client** APIs.
2. **Multiplexing**: Multiple streams over a single TCP connection.
3. **Header compression**: Uses HPACK to reduce redundant header data.
4. **Server push**: Allows sending resources proactively to the client.
5. Integrates with **TLS/HTTPS** using `http2.createSecureServer()`.
6. Supports event-driven streams (`stream`, `response`, `close` events).
7. Compatible with Node.js async and event loop patterns.

-----------------------------------------------------
Basic Example (HTTP/2 Server)
-----------------------------------------------------
const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem')
});

server.on('stream', (stream, headers) => {
  stream.respond({ 'content-type': 'text/plain', ':status': 200 });
  stream.end('Hello from HTTP/2 server');
});

server.listen(8443, () => console.log('HTTP/2 server running on port 8443'));

-----------------------------------------------------
Example (HTTP/2 Client)
-----------------------------------------------------
const client = http2.connect('https://localhost:8443');

const req = client.request({ ':path': '/' });

req.on('data', (chunk) => { console.log(chunk.toString()); });
req.on('end', () => { client.close(); });
req.end();

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- High-performance web servers requiring multiple simultaneous streams.
- Applications leveraging server push to reduce latency.
- APIs and microservices needing efficient header and connection handling.
- Modern web applications needing secure and fast HTTP communication.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. HTTP/2 requires TLS/SSL for browsers; Node.js allows both secure and insecure connections.
2. Multiplexed streams reduce the need for multiple TCP connections.
3. Use `http2` over `http` for performance benefits in modern web apps.
4. HTTP/2 headers use pseudo-headers like `:method`, `:path`, `:status`.
5. Streams are event-driven; proper handling of 'stream', 'error', and 'close' events is critical.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of HTTP/2 as a **multi-lane highway**:
  - Multiple cars (streams) can travel simultaneously on a single road (connection), 
    reducing traffic jams (latency) and improving efficiency.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between HTTP/1.1 and HTTP/2?  
A1: HTTP/2 supports multiplexing, header compression, server push, and prioritization, whereas HTTP/1.1 opens separate connections per request and lacks these features.

Q2: What is server push in HTTP/2?  
A2: The server can proactively send resources to the client before the client requests them.

Q3: Are HTTP/2 streams independent?  
A3: Yes, multiple streams can run concurrently over a single TCP connection.

Q4: Can HTTP/2 be used without TLS?  
A4: Node.js allows non-TLS HTTP/2, but browsers require TLS for HTTP/2.

Q5: How do you handle errors in HTTP/2 streams?  
A5: By listening to 'error' events on both the server and stream objects.
*/
