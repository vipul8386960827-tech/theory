/* 7_request_response_objects.js

=====================================================
Request (req) and Response (res) Objects
=====================================================

Definition (What I should say in the interview):
- "req and res are Node's IncomingMessage and ServerResponse objects that **Express extends
   with extra properties and helper methods**. On req we get things like req.params, req.query,
   req.body, req.headers and req.get(). On res we get chainable helpers like res.status(),
   res.json(), res.redirect() and res.cookie(). Since they are still Node streams underneath,
   we can also pipe data into res for large files."

-----------------------------------------------------
Commonly used req properties / methods
-----------------------------------------------------
req.params       -> route params  (/users/:id)
req.query        -> query string  (?page=2)
req.body         -> parsed body (needs express.json / urlencoded)
req.headers      -> all headers (lowercase keys); req.get('Content-Type') for one header
req.method, req.path, req.originalUrl, req.ip, req.cookies (with cookie-parser)

-----------------------------------------------------
Commonly used res methods
-----------------------------------------------------
res.status(code)      -> sets status, chainable
res.json(obj)         -> sends JSON
res.send(data)        -> sends string / buffer / object
res.sendStatus(204)   -> sets status and sends its text
res.redirect(url), res.set(header, value), res.cookie(name, val), res.download(path)
res.locals            -> per-request data shared between middleware and views

-----------------------------------------------------
Example
-----------------------------------------------------
const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

app.post('/orders/:orderId', (req, res) => {
  const info = {
    id: req.params.orderId,
    coupon: req.query.coupon,
    items: req.body.items,
    agent: req.get('User-Agent'),
  };
  res.status(201).set('X-Request-Id', '123').json(info);
});

app.get('/big-file', (req, res) => {
  res.type('text/plain');
  fs.createReadStream('./large.log').pipe(res);   // res is a writable stream
});

app.listen(3000);

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you check if a response was already sent?
A1: res.headersSent is true once headers are sent.

Q2: Why is req.body undefined sometimes?
A2: No body-parser middleware for that Content-Type, or the client didn't send the right header.

Q3: What is res.locals used for?
A3: Storing per-request data (e.g. current user) accessible in later middleware and templates.
*/
