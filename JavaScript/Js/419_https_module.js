/* 419_https_module.js

=====================================================
HTTPS Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `https` module in Node.js is a core module that allows developers to **create secure HTTPS servers and clients**. 
   It works similarly to the `http` module but uses **TLS/SSL encryption** to ensure secure communication over the network."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Can create **HTTPS servers** that handle encrypted requests and responses.
2. Can make **HTTPS client requests** to secure endpoints.
3. Uses **request and response objects** similar to the HTTP module.
4. Supports **custom certificates, keys, and secure options**.
5. Compatible with **streams** for handling large secure data.
6. Essential for building **secure APIs and web applications**.

-----------------------------------------------------
Basic Example (HTTPS Server)
-----------------------------------------------------
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

const server = https.createServer(options, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello Secure Node.js HTTPS!');
});

server.listen(443, () => {
  console.log('HTTPS Server running at https://localhost/');
});

-----------------------------------------------------
Making HTTPS Requests (Client)
-----------------------------------------------------
https.get('https://jsonplaceholder.typicode.com/todos/1', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Response:', data);
  });
}).on('error', (err) => {
  console.error('Error:', err);
});

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Serving secure web pages and APIs over HTTPS.
- Making secure API calls to external services.
- Streaming encrypted data between server and client.
- Ensuring compliance with security standards (TLS/SSL).
- Base for secure frameworks and applications.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Requires **certificate and private key** for creating HTTPS servers.
2. Can use **self-signed certificates** for development, but production needs trusted certificates.
3. All methods are similar to the `http` module but operate over **TLS/SSL**.
4. Always handle **errors** to avoid unhandled exceptions.
5. Supports **HTTP/2** via `http2` module for modern secure protocols.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of the `https` module as a **secure postal system**:
  - All messages (data) sent are encrypted, preventing eavesdropping and ensuring authenticity.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How is HTTPS different from HTTP in Node.js?  
A1: HTTPS encrypts communication using TLS/SSL, while HTTP is unencrypted.

Q2: How do you create an HTTPS server in Node.js?  
A2: Using `https.createServer({ key, cert }, callback)`.

Q3: Can you use the same request/response objects as HTTP?  
A3: Yes, the interface is similar to the HTTP module.

Q4: Do you need certificates to run HTTPS?  
A4: Yes, a private key and certificate are required; self-signed for development or CA-signed for production.

Q5: How do you make a secure HTTPS request to an external API?  
A5: Using `https.get(url, callback)` or `https.request(options, callback)`.
*/
