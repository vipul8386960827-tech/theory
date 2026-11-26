/* 29_http_module.js

=====================================================
http Module
=====================================================

Definition (What I should say in the interview):
- "The http module lets Node create HTTP **servers** and make HTTP **client requests** without any
   framework. http.createServer takes a handler (req, res) where req is an IncomingMessage - a
   Readable stream - and res is a ServerResponse - a Writable stream. Express is built on top of
   it. Understanding it helps me know what Express does under the hood, like reading the body
   from the stream, setting status and headers, and ending the response."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. req: method, url, headers (lower-cased keys); body arrives as stream chunks.
2. res: statusCode, setHeader / writeHead, write(), end() - must always end the response.
3. No built-in routing or body parsing -> you do it yourself (that is what Express adds).
4. server.listen(port), server.close() for graceful shutdown.
5. Client: http.request / http.get, or the global fetch (Node 18+).
6. Keep-alive and timeouts: server.keepAliveTimeout, server.requestTimeout, headersTimeout.

-----------------------------------------------------
Example (tiny JSON API without Express)
-----------------------------------------------------
const http = require('http');
const users = [{ id: 1, name: 'Asha' }];

const server = http.createServer(async (req, res) => {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);
  const send = (code, data) => {
    res.writeHead(code, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  if (req.method === 'GET' && pathname === '/users') return send(200, users);

  if (req.method === 'POST' && pathname === '/users') {
    let body = '';
    for await (const chunk of req) {
      body += chunk;
      if (body.length > 1e6) return send(413, { error: 'Payload too large' });
    }
    try {
      const user = { id: users.length + 1, ...JSON.parse(body) };
      users.push(user);
      return send(201, user);
    } catch {
      return send(400, { error: 'Invalid JSON' });
    }
  }
  send(404, { error: 'Not found' });
});

server.listen(3000, () => console.log('Listening on 3000'));

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Forgetting res.end() -> the request hangs until timeout.
- Setting headers after the body started -> ERR_HTTP_HEADERS_SENT ("Cannot set headers after
  they are sent").
- Not limiting body size -> attacker can send huge payloads and exhaust memory.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is the request body not directly available as req.body?
A1: The body is a stream that arrives in chunks; middleware like express.json() reads and parses it.

Q2: http vs https module?
A2: Same API; https needs a TLS key and certificate. In production TLS is often terminated at a
    load balancer or Nginx, and Node runs plain http behind it.
*/
