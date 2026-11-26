/* 19_readable_stream_modes.js

=====================================================
Readable Stream Modes - Flowing vs Paused
=====================================================

Definition (What I should say in the interview):
- "A Readable stream works in one of two modes. In **paused mode** (the default) data is not
   emitted automatically; you have to call stream.read() to pull chunks, usually inside the
   'readable' event. In **flowing mode** data is pushed to you as fast as possible through 'data'
   events. A stream switches to flowing when you attach a 'data' listener, call resume(), or
   pipe() it, and goes back to paused with pause() or unpipe()."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Every Readable starts in paused mode.
2. To flowing: on('data'), resume(), pipe().
3. To paused: pause() (if no pipe destinations), or unpipe() all destinations.
4. In flowing mode with no 'data' listener and no consumer, data is LOST.
5. If you use 'readable', it takes priority over 'data' and you must call read().
6. readableFlowing property: null (no consumer yet), true (flowing), false (paused explicitly).
7. Avoid mixing styles (data + readable + pipe + for await) on the same stream.

-----------------------------------------------------
Example
-----------------------------------------------------
const fs = require('fs');

// Flowing mode (push)
const s1 = fs.createReadStream('big.txt');
s1.on('data', (chunk) => {
  console.log('got', chunk.length, 'bytes');
  s1.pause();                         // manual flow control
  setTimeout(() => s1.resume(), 100); // e.g. after slow DB insert
});
s1.on('end', () => console.log('flowing done'));

// Paused mode (pull)
const s2 = fs.createReadStream('big.txt');
s2.on('readable', () => {
  let chunk;
  while ((chunk = s2.read()) !== null) {
    console.log('read', chunk.length, 'bytes');
  }
});
s2.on('end', () => console.log('paused done'));

// Modern: async iteration (handles pausing for you)
// for await (const chunk of fs.createReadStream('big.txt')) { ... }

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Mode    | Who controls  | API                     | Typical use                    |
|---------|---------------|-------------------------|--------------------------------|
| Flowing | stream pushes | 'data', pipe, resume    | piping, simple consumption     |
| Paused  | you pull      | 'readable' + read()     | parsers needing exact amounts  |

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Does removing the 'data' listener pause the stream?
A1: No. Removing listeners does not pause it automatically; call pause() explicitly.

Q2: Which approach do you use in practice?
A2: pipeline for stream-to-stream, and for await...of when I need to process each chunk with
    async code, because it respects backpressure automatically.
*/
