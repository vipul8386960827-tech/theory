/* 8_backpressure.js

=====================================================
Backpressure
=====================================================

Definition (What I should say in the interview):
- "Backpressure happens when the data source produces data **faster than the destination can
   consume** it - for example reading a file from a fast SSD and writing to a slow network. If we
   ignore it, data piles up in memory. In Node, writable.write() returns **false** when its
   internal buffer has reached the highWaterMark; then we should stop writing and wait for the
   **'drain'** event before continuing. pipe and pipeline handle this automatically."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. write(chunk) returns true -> keep writing; false -> buffer full, pause.
2. 'drain' event -> buffer emptied, safe to write again.
3. Returning false does NOT reject the chunk; it is still buffered. It is a signal to slow down.
4. pipe()/pipeline() pause the readable and resume it on 'drain' for you.
5. Ignoring it -> memory grows, GC pressure, possible out-of-memory crash.

-----------------------------------------------------
Example (manual handling)
-----------------------------------------------------
const fs = require('fs');
const out = fs.createWriteStream('numbers.txt');

let i = 0;
const MAX = 1_000_000;

function writeMore() {
  let ok = true;
  while (i < MAX && ok) {
    ok = out.write(`line ${i++}\n`);   // false -> buffer is full
  }
  if (i < MAX) {
    out.once('drain', writeMore);     // resume when drained
  } else {
    out.end(() => console.log('Finished'));
  }
}
writeMore();

// With async/await:
// const { once } = require('events');
// if (!out.write(chunk)) await once(out, 'drain');

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- for (...) stream.write(x) in a tight loop with no check -> millions of chunks buffered in RAM.
- Using readable.on('data', c => res.write(c)) without pausing the readable -> no backpressure.
  Use pipeline instead.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What decides when write() returns false?
A1: When the buffered data size reaches the writable's highWaterMark.

Q2: How does a Readable handle backpressure on its side?
A2: In _read the implementation calls push(); when push() returns false the source should stop
    until _read is called again.

Q3: Does pipe handle backpressure?
A3: Yes. pipe pauses the source on false and resumes on 'drain'. Its weakness is errors, not
    backpressure.
*/
