/* 23_highwatermark.js

=====================================================
highWaterMark
=====================================================

Definition (What I should say in the interview):
- "highWaterMark is the **buffering threshold** of a stream. For a Readable it is how much data
   the stream tries to buffer ahead before it stops reading from the source; for a Writable it is
   the buffered amount at which write() starts returning false. It is a threshold, not a hard
   limit. The defaults: **fs.createReadStream uses 64 KB**; general byte streams used **16 KB**
   (Node 22 raised the general default to 64 KB); and object-mode streams use **16 objects**."

-----------------------------------------------------
Defaults (state carefully)
-----------------------------------------------------
| Stream                                   | Default highWaterMark            |
|------------------------------------------|----------------------------------|
| fs.createReadStream                      | 64 KB (65536 bytes)              |
| Generic Readable/Writable (byte mode)    | 16 KB in older versions;         |
|                                          | 64 KB from Node 22               |
| fs.createWriteStream                     | same as generic Writable default |
| Any stream with objectMode: true         | 16 objects                       |

- stream.getDefaultHighWaterMark(objectMode) / setDefaultHighWaterMark exist in newer Node versions.

-----------------------------------------------------
Example
-----------------------------------------------------
const fs = require('fs');

const r = fs.createReadStream('big.bin', { highWaterMark: 1024 * 1024 }); // 1 MB chunks
r.once('data', (chunk) => console.log('chunk size:', chunk.length));       // up to 1048576

const { Writable } = require('stream');
const slow = new Writable({
  highWaterMark: 10,                      // 10 bytes
  write(chunk, enc, cb) { setTimeout(cb, 50); },
});
console.log(slow.write('12345'));         // true  (5 < 10)
console.log(slow.write('67890'));         // false (10 reached -> wait for 'drain')
console.log(slow.writableLength);         // bytes currently buffered
console.log(slow.writableHighWaterMark);  // 10

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- write() returning false does not drop data; the chunk is still buffered. Ignoring the signal is
  what causes memory growth.
- Bigger highWaterMark -> fewer syscalls, more throughput, more memory per stream.
  Smaller -> less memory, more overhead. Multiply by concurrent connections when tuning.
- A single chunk larger than highWaterMark is still accepted.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Is highWaterMark the maximum memory a stream can use?
A1: No, it is a threshold for signaling backpressure. A producer that ignores write() returning
    false can make the buffer grow without limit.

Q2: When would you increase it?
A2: Copying large files on fast disks or high-throughput network transfers, where 64 KB chunks
    cause too many small reads. I would measure before and after.
*/
