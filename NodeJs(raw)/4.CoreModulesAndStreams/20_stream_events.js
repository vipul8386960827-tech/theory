/* 20_stream_events.js

=====================================================
Stream Events
=====================================================

Definition (What I should say in the interview):
- "Since streams are EventEmitters, we work with them through events. On a **Readable** the
   important ones are 'data', 'end' (no more data), 'readable', 'error' and 'close'. On a
   **Writable** they are 'drain' (buffer emptied, write more), 'finish' (after end() and all data
   is flushed), 'error' and 'close', plus 'pipe'/'unpipe'. The one I never skip is 'error' -
   or I use pipeline, which handles it for me."

-----------------------------------------------------
Events Table
-----------------------------------------------------
| Stream   | Event      | When                                                  |
|----------|------------|-------------------------------------------------------|
| Readable | data       | a chunk is available (flowing mode)                   |
| Readable | readable   | data can be read with read(), or end reached          |
| Readable | end        | all data consumed - no more data                      |
| Writable | drain      | write() returned false earlier and buffer is empty now|
| Writable | finish     | end() called and all data flushed to the destination  |
| Both     | error      | something failed (stream usually destroyed after)     |
| Both     | close      | underlying resource (fd, socket) closed               |
| Writable | pipe/unpipe| a readable starts / stops piping into it              |

-----------------------------------------------------
Example
-----------------------------------------------------
const fs = require('fs');

const reader = fs.createReadStream('input.txt');
const writer = fs.createWriteStream('copy.txt');

reader.on('open', (fd) => console.log('file opened, fd', fd)); // fs-specific
reader.on('data', (chunk) => {
  if (!writer.write(chunk)) reader.pause();
});
writer.on('drain', () => reader.resume());
reader.on('end', () => writer.end());   // tell writer no more data
reader.on('error', (err) => { console.error('read error', err.message); writer.destroy(); });

writer.on('finish', () => console.log('all data written'));
writer.on('error', (err) => { console.error('write error', err.message); reader.destroy(); });
writer.on('close', () => console.log('file closed'));

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Confusing 'end' and 'finish': 'end' is Readable (no more to read), 'finish' is Writable
  (everything written).
- 'end' is NOT emitted if the data is never fully consumed (e.g. nobody reads the stream).
- 'close' can happen without 'end' if the stream was destroyed or errored.
- The manual code above is basically what pipe() does; in real code use pipeline.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you know an HTTP response was fully sent?
A1: Listen to res.on('finish'); res.on('close') without finish means the client disconnected early.

Q2: Is 'close' always emitted?
A2: By default for core streams (emitClose: true), after destroy or after the resource closes.
*/
