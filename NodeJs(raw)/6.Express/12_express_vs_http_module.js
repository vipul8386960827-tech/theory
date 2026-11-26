/* 12_express_vs_http_module.js

=====================================================
Express vs Node's http Module
=====================================================

Definition (What I should say in the interview):
- "The http module is Node's **low-level core module** for creating servers - you get one
   callback for every request and you handle URL parsing, method checks, body parsing and
   headers yourself. Express is **built on top of http** and adds routing, middleware and
   helper methods. Under the hood, the Express app is just a function passed to
   http.createServer, so performance is very close; we choose Express for productivity."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Feature          | http module                       | Express                          |
|------------------|-----------------------------------|----------------------------------|
| Routing          | Manual if/else on req.url/method  | app.get('/users/:id', ...)       |
| Route params     | Parse URL yourself                | req.params                       |
| Body parsing     | Collect chunks from stream        | express.json()                   |
| JSON response    | setHeader + JSON.stringify + end  | res.json(obj)                    |
| Middleware       | Not available                     | app.use()                        |
| Static files     | Manual fs + mime types            | express.static()                 |
| Dependencies     | None                              | One npm package                  |

-----------------------------------------------------
Example (same endpoint both ways)
-----------------------------------------------------
// Plain http
const http = require('http');
http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/users') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      const data = JSON.parse(body);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ created: data.name }));
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
}).listen(3000);

// Express
const express = require('express');
const app = express();
app.use(express.json());
app.post('/users', (req, res) => res.status(201).json({ created: req.body.name }));
app.listen(3001);

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: When would you use plain http?
A1: Very small services, learning, or when every dependency matters; otherwise Express or Fastify.

Q2: Can you use Express with https or an existing http server?
A2: Yes - https.createServer(options, app) or http.createServer(app), since app is a request handler.
*/
