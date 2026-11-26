/* 8_body_parsing.js

=====================================================
Body Parsing in Express
=====================================================

Definition (What I should say in the interview):
- "By default Express does **not** parse the request body - req.body is undefined. We add
   body-parsing middleware based on the Content-Type. Since Express 4.16, **express.json()**
   and **express.urlencoded()** are built in, so we don't need the separate body-parser package
   anymore. For multipart/form-data, which is used for file uploads, we need something like
   multer, because the built-in parsers don't handle it."

-----------------------------------------------------
Which parser for which Content-Type
-----------------------------------------------------
| Content-Type                       | Middleware                         |
|------------------------------------|------------------------------------|
| application/json                   | express.json()                     |
| application/x-www-form-urlencoded  | express.urlencoded({extended:true})|
| text/plain                         | express.text()                     |
| binary (e.g. webhooks)             | express.raw({ type: '...' })       |
| multipart/form-data                | multer / busboy (third-party)      |

-----------------------------------------------------
Example
-----------------------------------------------------
const express = require('express');
const app = express();

// Stripe-style webhook needs the RAW body for signature verification -> register before json()
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  console.log(Buffer.isBuffer(req.body)); // true
  res.sendStatus(200);
});

app.use(express.json({ limit: '1mb' }));            // reject bigger bodies with 413
app.use(express.urlencoded({ extended: true }));     // HTML form submissions

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
  res.json({ message: `Welcome ${email}` });
});

app.listen(3000);

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- extended: true uses the qs library (nested objects); false uses querystring (flat).
- Invalid JSON -> express.json() calls next(err) with status 400 -> handle it in error middleware.
- Always set a size limit (default is 100kb) to protect against huge payloads.
- In Express 5, req.body is undefined (not {}) when no parser ran.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is body-parser still needed?
A1: Not for json/urlencoded/raw/text since 4.16 - Express re-exports body-parser internally.

Q2: Why isn't req.body populated even with express.json()?
A2: The client didn't send Content-Type: application/json, or the parser was registered after the route.
*/
