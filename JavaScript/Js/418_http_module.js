/* 418_http_module.js

=====================================================
HTTP Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `http` module in Node.js is a core module that allows developers to **create HTTP servers and clients**. 
   It provides methods to handle incoming requests, send responses, and make HTTP requests, enabling server-side 
   communication over the web."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Can create **HTTP server** to handle requests and responses.
2. Can make **HTTP client requests** to other servers.
3. Supports **request and response objects**:
   - `req` – Incoming request with headers, URL, and method.
   - `res` – Response object used to send data back.
4. Supports **custom headers, status codes, and streaming responses**.
5. Works with **streams**, allowing efficient handling of large data.
6. Often combined with **Express.js** for advanced routing and middleware.

-----------------------------------------------------
Basic Example (HTTP Server)
-----------------------------------------------------
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, Node.js HTTP!');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

-----------------------------------------------------
Making HTTP Requests (Client)
-----------------------------------------------------
const options = {
  hostname: 'jsonplaceholder.typicode.com',
  path: '/todos/1',
  method: 'GET',
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (err) => {
  console.error('Error:', err);
});

req.end();

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Building lightweight HTTP servers for APIs or web apps.
- Making HTTP requests to external APIs.
- Serving static files or dynamic content.
- Streaming data to clients efficiently.
- Base module for frameworks like Express.js.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. `http` is **core Node.js module**, no installation needed.
2. Always handle **errors** to avoid server crashes.
3. Use **streams** for large payloads to prevent memory issues.
4. `http.createServer()` is low-level; higher-level frameworks like Express.js are often preferred for routing.
5. Can be combined with `https` module to enable secure connections.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of the `http` module as the **foundation of a web server**:
  - It provides the building blocks for handling requests, sending responses, and communicating over HTTP.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you create an HTTP server in Node.js?  
A1: Using `http.createServer(callback)` and `server.listen(port)`.

Q2: How do you send a response to the client?  
A2: Using `res.write()` or `res.end()` methods.

Q3: How can you make an HTTP GET request in Node.js?  
A3: Using `http.request()` or `http.get()` methods.

Q4: How do you handle errors in HTTP requests?  
A4: Attach an `error` event listener using `req.on('error', callback)`.

Q5: Difference between `http` and `https` modules?  
A5: `https` adds support for TLS/SSL encryption, while `http` is unencrypted.
*/
