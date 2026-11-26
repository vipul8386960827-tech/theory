/* 16_built_in_middleware.js

=====================================================
Built-in Middleware
=====================================================

Definition (What I should say in the interview):
- "Express ships with a small set of built-in middleware. **express.static()** serves static
   files, and since version 4.16 we also have **express.json()** and **express.urlencoded()**,
   plus **express.raw()** and **express.text()** since 4.17. Before 4.x, Express bundled many
   middleware from Connect, but they were removed to keep the core minimal - so things like
   cookies, CORS, sessions and logging come from separate packages."

-----------------------------------------------------
List
-----------------------------------------------------
| Middleware              | Since  | Purpose                                  |
|-------------------------|--------|------------------------------------------|
| express.static(root)    | 4.x    | Serve files from a folder                |
| express.json()          | 4.16   | Parse application/json into req.body     |
| express.urlencoded()    | 4.16   | Parse HTML form data into req.body       |
| express.raw()           | 4.17   | Body as Buffer (webhooks, binary)        |
| express.text()          | 4.17   | Body as string                           |

-----------------------------------------------------
Example (with options)
-----------------------------------------------------
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json({
  limit: '200kb',                 // default 100kb, larger -> 413 Payload Too Large
  strict: true,                   // only accept objects and arrays at top level
  type: ['application/json', 'application/vnd.api+json'],
}));

app.use(express.urlencoded({ extended: true, limit: '50kb' }));

app.use('/assets', express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',                   // Cache-Control header
}));

app.post('/notes', express.text(), (req, res) => {
  res.json({ length: req.body.length }); // only if Content-Type was text/plain
});

app.listen(3000);

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Each parser only runs when Content-Type matches its "type" option; otherwise it calls next().
- Express 3 bundled bodyParser, cookieParser, session etc. Express 4 removed them.
- Router-level and error-handling middleware are "types", not built-in middleware.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What happens if the body exceeds the limit?
A1: The parser calls next(err) with status 413; your error handler should forward err.status.

Q2: Is cookie parsing built in?
A2: No - you need cookie-parser, or read req.headers.cookie manually.
*/
