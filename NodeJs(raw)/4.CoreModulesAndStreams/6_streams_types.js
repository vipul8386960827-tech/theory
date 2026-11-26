/* 6_streams_types.js

=====================================================
Types of Streams
=====================================================

Definition (What I should say in the interview):
- "A stream is a way to process data **piece by piece (chunks)** instead of loading it all into
   memory. Node has four stream types: **Readable** (source you read from), **Writable**
   (destination you write to), **Duplex** (both readable and writable, independently, like a TCP
   socket) and **Transform** (a duplex where the output is computed from the input, like gzip).
   All streams are EventEmitters."

-----------------------------------------------------
The 4 Types
-----------------------------------------------------
| Type      | Direction            | Examples                                   |
|-----------|----------------------|--------------------------------------------|
| Readable  | data comes out       | fs.createReadStream, http req (server),    |
|           |                      | process.stdin                              |
| Writable  | data goes in         | fs.createWriteStream, http res (server),   |
|           |                      | process.stdout                             |
| Duplex    | both, independent    | net.Socket, TLS socket                     |
| Transform | both, out = f(in)    | zlib.createGzip, crypto.createCipheriv     |

-----------------------------------------------------
Example
-----------------------------------------------------
const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream');

pipeline(
  fs.createReadStream('input.log'),    // Readable
  zlib.createGzip(),                   // Transform
  fs.createWriteStream('input.log.gz'),// Writable
  (err) => {
    if (err) console.error('Failed:', err);
    else console.log('Compressed');
  }
);

-----------------------------------------------------
Key Points
-----------------------------------------------------
- Duplex vs Transform: in a Duplex the read side and write side are unrelated (socket: what you
  send is not what you receive). In a Transform, what you read is derived from what you wrote.
- PassThrough is a Transform that does not change data (useful for testing / tapping).
- Streams work with Buffers/strings by default, or any JS value in objectMode.

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Large file upload/download, video streaming, CSV processing, log processing, compression,
  proxying HTTP requests.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is the http request a Readable or Writable?
A1: On the server, req is Readable and res is Writable. On the client it is the opposite
    (ClientRequest is Writable, the response IncomingMessage is Readable).

Q2: Why are streams memory-efficient?
A2: Only a small buffer (highWaterMark) is held in memory at a time, not the whole data.
*/
