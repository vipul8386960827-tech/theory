/* 20_error_events_in_eventemitter_and_streams.js

=====================================================
'error' Events in EventEmitter and Streams
=====================================================

Definition (What I should say in the interview):
- "EventEmitters and streams report async errors by emitting an **'error' event** instead of
   throwing. 'error' is special: if it is emitted and **no listener is attached, Node throws the
   error**, which usually crashes the process. So for every emitter or stream - servers, sockets,
   file streams, DB clients - I attach an error listener. For stream chains I use
   **stream.pipeline()** instead of .pipe(), because pipe does not forward errors or destroy the
   other streams, while pipeline handles errors and cleanup for the whole chain."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. emitter.emit('error', err) with no listener -> throws -> uncaughtException.
2. Always: emitter.on('error', handler).
3. .pipe() does NOT propagate errors -> each stream needs its own listener, and leaks are possible.
4. pipeline() (from 'stream' or 'stream/promises') -> one place to catch, auto-destroys streams.
5. events.errorMonitor -> observe errors without counting as a handler.

-----------------------------------------------------
Example (EventEmitter)
-----------------------------------------------------
const EventEmitter = require('events');
class PaymentService extends EventEmitter {
  charge(amount) {
    if (amount <= 0) return this.emit('error', new Error('Invalid amount'));
    this.emit('charged', amount);
  }
}
const payments = new PaymentService();
payments.on('error', (err) => console.error('Payment error:', err.message));
payments.charge(-5); // handled, no crash

-----------------------------------------------------
Example (Streams with pipeline)
-----------------------------------------------------
const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream/promises');

async function compress(src, dest) {
  try {
    await pipeline(
      fs.createReadStream(src),
      zlib.createGzip(),
      fs.createWriteStream(dest)
    );
    console.log('Compressed');
  } catch (err) {
    console.error('Pipeline failed:', err.code); // e.g. ENOENT - all streams cleaned up
  }
}
compress('missing.txt', 'out.gz');

// Bad: fs.createReadStream('missing.txt').pipe(res);  -> unhandled 'error', crash

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is 'error' treated differently from other events?
A1: So errors are never silently ignored - if nobody listens, Node throws it.

Q2: Why prefer pipeline over pipe?
A2: pipe does not forward errors between streams and does not destroy the others on failure,
    which can leak file descriptors. pipeline does both and gives one callback/promise.

Q3: In Express, how do you stream a file safely?
A3: pipeline(fs.createReadStream(path), res, (err) => { if (err) next(err) }) - or check
    headersSent, since part of the file may already be sent.
*/
