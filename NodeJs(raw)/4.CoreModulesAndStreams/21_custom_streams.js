/* 21_custom_streams.js

=====================================================
Creating Custom Streams
=====================================================

Definition (What I should say in the interview):
- "To create a custom stream I extend (or construct) one of the classes from the stream module and
   implement the underscore method: **_read** for a Readable, where I call this.push(data) and
   push(null) to end; **_write(chunk, encoding, callback)** for a Writable; both for a Duplex;
   and **_transform(chunk, encoding, callback)** for a Transform, optionally with _flush at the end.
   I always call the callback - with an error if something fails."

-----------------------------------------------------
What to implement
-----------------------------------------------------
| Class     | Implement                          | Signal end / errors                 |
|-----------|------------------------------------|-------------------------------------|
| Readable  | _read(size)                        | push(null) to end; destroy(err)     |
| Writable  | _write(chunk, enc, cb) (+ _final)  | cb(err) on failure                  |
| Duplex    | _read + _write                     | both of the above                   |
| Transform | _transform(chunk, enc, cb) (+_flush)| cb(err) or cb(null, output)        |

-----------------------------------------------------
Example
-----------------------------------------------------
const { Readable, Writable, Transform } = require('stream');
const { pipeline } = require('stream/promises');

// Readable: counts 1..5
class Counter extends Readable {
  constructor() { super(); this.n = 0; }
  _read() {
    this.n++;
    if (this.n > 5) this.push(null);          // end of stream
    else this.push(`${this.n}\n`);
  }
}

// Transform: multiply by 10
const times10 = new Transform({
  transform(chunk, enc, cb) {
    const n = Number(chunk.toString().trim());
    if (Number.isNaN(n)) return cb(new Error('Not a number'));
    cb(null, `${n * 10}\n`);
  },
  flush(cb) { this.push('done\n'); cb(); },   // runs once at the end
});

// Writable: log to console
const logger = new Writable({
  write(chunk, enc, cb) {
    process.stdout.write(`> ${chunk}`);
    cb();                                      // must call, or stream stalls
  },
});

pipeline(new Counter(), times10, logger).catch(console.error);

// Shortcut for simple readables:
// Readable.from(['a', 'b', 'c'])   or   Readable.from(asyncGenerator())

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Forgetting to call the callback in _write/_transform -> the stream hangs forever.
- Throwing inside _transform instead of cb(err) -> error is not routed properly.
- Calling the callback twice -> ERR_MULTIPLE_CALLBACK.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Real example of a custom Transform you would write?
A1: A CSV line parser, a JSON-lines parser, masking sensitive fields in logs, or a progress meter.

Q2: Class syntax vs options object?
A2: Same result. Options ({ transform() {...} }) are shorter; classes are good when you need state.
*/
