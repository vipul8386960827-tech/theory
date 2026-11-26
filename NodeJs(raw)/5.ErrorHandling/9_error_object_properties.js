/* 9_error_object_properties.js

=====================================================
Error Object Properties
=====================================================

Definition (What I should say in the interview):
- "Every Error object in JavaScript has **name, message and stack**. Node adds more on system
   errors - like **code** (ENOENT, ECONNREFUSED), **errno**, **syscall**, **path**, address and port.
   Since ES2022 there is also **cause** to chain errors. In practice I branch on err.code rather
   than on err.message, because messages can change between versions but codes are stable."

-----------------------------------------------------
Properties
-----------------------------------------------------
| Property | Where                 | Example                                   |
|----------|-----------------------|-------------------------------------------|
| name     | All errors            | 'TypeError'                               |
| message  | All errors            | 'Cannot read properties of undefined'     |
| stack    | All errors (V8)       | 'TypeError: ... at fn (app.js:10:5)'      |
| cause    | ES2022 / Node 16.9+   | original error passed via { cause }       |
| code     | Node system/core errs | 'ENOENT', 'ERR_INVALID_ARG_TYPE'          |
| errno    | System errors         | -2                                        |
| syscall  | System errors         | 'open', 'connect'                         |
| path     | fs errors             | '/app/config.json'                        |

-----------------------------------------------------
Example
-----------------------------------------------------
const fs = require('fs/promises');

async function readConfig() {
  try {
    return await fs.readFile('./missing.json', 'utf8');
  } catch (err) {
    console.log(err.name);    // Error
    console.log(err.code);    // ENOENT
    console.log(err.syscall); // open
    console.log(err.path);    // ./missing.json
    throw new Error('Config load failed', { cause: err }); // keep original
  }
}

readConfig().catch((err) => {
  console.log(err.message);      // Config load failed
  console.log(err.cause.code);   // ENOENT
});

// Stack trace depth (default 10 frames)
Error.stackTraceLimit = 20;

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- JSON.stringify(err) returns "{}" because message and stack are non-enumerable.
  Log with console.error(err) or a logger (pino/winston serialize errors properly).
- Matching on err.message strings -> breaks when wording changes.
- Sending err.stack to API clients -> leaks file paths and internals.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why does JSON.stringify(new Error('x')) give {}?
A1: message and stack are own but non-enumerable properties, and stringify only copies enumerable ones.

Q2: What is the cause property used for?
A2: Wrapping a low-level error with a higher-level message without losing the original details.

Q3: Difference between code ENOENT and ERR_xxx codes?
A3: E-codes (ENOENT, EACCES) come from the OS/libuv; ERR_xxx codes are Node's own internal errors
    like ERR_INVALID_ARG_TYPE.
*/
