/* 25_http_methods_and_status_codes.js

=====================================================
HTTP Methods and Status Codes
=====================================================

Definition (What I should say in the interview):
- "HTTP methods describe **what action** the client wants - GET reads, POST creates, PUT
   replaces, PATCH partially updates, DELETE removes, and OPTIONS is used by browsers for CORS
   preflight. Status codes tell the client **what happened**, grouped by the first digit: 2xx
   success, 3xx redirection, 4xx client errors and 5xx server errors. Returning the right code
   matters because frontends, retries and monitoring all depend on it."

-----------------------------------------------------
Status code groups
-----------------------------------------------------
1xx Informational | 2xx Success | 3xx Redirection | 4xx Client Error | 5xx Server Error

-----------------------------------------------------
Codes I use most
-----------------------------------------------------
200 OK                    -> successful GET / PUT / PATCH
201 Created               -> successful POST (with Location header)
204 No Content            -> successful DELETE, no body
301 / 302                 -> permanent / temporary redirect
304 Not Modified          -> cached copy still valid (ETag)
400 Bad Request           -> validation failed, malformed JSON
401 Unauthorized          -> not authenticated (missing / invalid token)
403 Forbidden             -> authenticated but not allowed
404 Not Found             -> resource / route doesn't exist
409 Conflict              -> duplicate email, version conflict
422 Unprocessable Entity  -> semantically invalid data
429 Too Many Requests     -> rate limit hit
500 Internal Server Error -> unexpected bug
502 / 503 / 504           -> bad gateway / service unavailable / gateway timeout

-----------------------------------------------------
Example
-----------------------------------------------------
const express = require('express');
const app = express();
app.use(express.json());
const emails = new Set(['taken@x.com']);

app.post('/register', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });
  if (emails.has(email)) return res.status(409).json({ message: 'Email already exists' });
  emails.add(email);
  res.status(201).json({ email });
});

app.get('/admin', (req, res) => {
  if (!req.headers.authorization) return res.sendStatus(401);
  return res.sendStatus(403);          // logged in but not an admin
});

app.listen(3000);

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Returning 200 with { success: false } for errors -> breaks client error handling.
- Mixing up 401 and 403.
- Sending a body with 204 - it's ignored/stripped.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: 401 vs 403?
A1: 401 = "who are you?" (not authenticated). 403 = "I know you, but you can't do this".

Q2: What is the OPTIONS method used for?
A2: CORS preflight - the browser asks which methods/headers are allowed before the real request.
*/
