/* 10_types_of_errors_in_js.js

=====================================================
Types of Errors in JavaScript / Node.js
=====================================================

Definition (What I should say in the interview):
- "JavaScript has built-in error types that all extend Error - **SyntaxError, ReferenceError,
   TypeError, RangeError, URIError, EvalError and AggregateError**. On top of that Node.js has
   **system errors** coming from the OS (like ENOENT or ECONNREFUSED) and its own internal errors
   with ERR_ codes. Most bugs I have seen in production are TypeErrors, like reading a property
   of undefined, while system errors are usually operational and need proper handling."

-----------------------------------------------------
Built-in Error Types
-----------------------------------------------------
| Type           | When it happens                         | Example                          |
|----------------|-----------------------------------------|----------------------------------|
| SyntaxError    | Invalid code or invalid JSON            | JSON.parse('{bad}')              |
| ReferenceError | Using a variable that does not exist    | console.log(notDefined)          |
| TypeError      | Wrong type / calling non-function       | undefined.name, null()           |
| RangeError     | Value outside allowed range             | new Array(-1), toFixed(200)      |
| URIError       | Bad URI encoding                        | decodeURIComponent('%')          |
| EvalError      | Legacy, related to eval()               | rarely seen                      |
| AggregateError | Multiple errors at once                 | Promise.any() all rejected       |

Node.js specific:
- System errors -> ENOENT (no file), EACCES (permission), EADDRINUSE (port taken),
  ECONNREFUSED, ETIMEDOUT, ECONNRESET.
- Internal errors -> err.code like ERR_INVALID_ARG_TYPE, ERR_HTTP_HEADERS_SENT.

-----------------------------------------------------
Example
-----------------------------------------------------
function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch (err) {
    if (err instanceof SyntaxError) return null; // bad JSON from client
    throw err;
  }
}
console.log(safeParse('{"a":1}')); // { a: 1 }
console.log(safeParse('{bad}'));   // null

Promise.any([Promise.reject(new Error('a')), Promise.reject(new Error('b'))])
  .catch((err) => {
    console.log(err instanceof AggregateError); // true
    console.log(err.errors.map((e) => e.message)); // ['a', 'b']
  });

require('http').createServer().listen(3000).on('error', (err) => {
  if (err.code === 'EADDRINUSE') console.error('Port 3000 already in use');
});

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- A SyntaxError in your own source code happens at parse time -> try/catch in the same file cannot catch it.
- Use instanceof for JS types and err.code for Node system errors.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Most common error in Node apps?
A1: TypeError - "Cannot read properties of undefined (reading 'x')". Optional chaining (?.) and
    input validation help avoid it.

Q2: What is EADDRINUSE?
A2: A system error when the port is already used by another process - e.g. an old server still running.

Q3: When do you get AggregateError?
A3: From Promise.any() when all promises reject, or when you create one manually to group errors.
*/
