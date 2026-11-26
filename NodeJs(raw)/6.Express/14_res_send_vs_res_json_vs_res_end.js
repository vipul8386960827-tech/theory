/* 14_res_send_vs_res_json_vs_res_end.js

=====================================================
res.send() vs res.json() vs res.end()
=====================================================

Definition (What I should say in the interview):
- "**res.json()** always sends JSON - it stringifies the value, sets Content-Type to
   application/json, and even handles null or undefined correctly. **res.send()** is generic:
   it looks at the type - a string becomes text/html, a Buffer becomes octet-stream, and an
   object or array is sent as JSON. **res.end()** comes from Node's http module and just ends
   the response with no Express formatting or Content-Type. For APIs I always use res.json()
   because it's explicit and consistent."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Feature              | res.json()          | res.send()                  | res.end()         |
|----------------------|---------------------|-----------------------------|-------------------|
| Source               | Express             | Express                     | Node http         |
| Content-Type         | application/json    | Based on argument type      | None set          |
| Object / array       | JSON                | JSON (calls res.json)       | Not allowed (err) |
| null / undefined     | Sends "null" JSON   | Empty body                  | Empty body        |
| res.send(number)     | -                   | Status shortcut in 4 (deprecated), removed in 5 | - |
| ETag / Content-Length| Yes                 | Yes                         | No                |

-----------------------------------------------------
Example
-----------------------------------------------------
const express = require('express');
const app = express();

app.get('/json', (req, res) => res.json({ ok: true }));       // application/json
app.get('/null', (req, res) => res.json(null));                // body: null, JSON type
app.get('/html', (req, res) => res.send('<h1>Hi</h1>'));       // text/html
app.get('/obj', (req, res) => res.send({ a: 1 }));             // JSON too
app.get('/buf', (req, res) => res.send(Buffer.from('raw')));   // application/octet-stream
app.get('/empty', (req, res) => res.status(204).end());        // no body needed
app.get('/sse', (req, res) => {                                // streaming -> write + end
  res.write('chunk 1\n');
  res.end('done\n');
});

app.listen(3000);

-----------------------------------------------------
Common Mistakes
-----------------------------------------------------
- Calling res.json() twice or res.json() after res.send() -> "headers already sent".
- res.send(200) in Express 4 sent status 200 (deprecated); Express 5 removed it ->
  use res.sendStatus(200) or res.status(200).send(...).
- Using res.end(JSON.stringify(obj)) and forgetting Content-Type -> client can't parse it as JSON.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Does res.json() end the response?
A1: Yes, all three end it. Code after it still runs, so use return when needed.

Q2: When is res.end() appropriate?
A2: For empty responses like 204, or after streaming with res.write().
*/
