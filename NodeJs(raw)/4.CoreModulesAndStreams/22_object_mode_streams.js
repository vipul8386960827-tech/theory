/* 22_object_mode_streams.js

=====================================================
Object Mode Streams
=====================================================

Definition (What I should say in the interview):
- "By default streams only accept strings, Buffers or Uint8Arrays. With **objectMode: true** a
   stream can carry **any JavaScript value** (except null) as a chunk - objects, numbers, arrays.
   This is useful for data pipelines such as parsing CSV rows into objects, transforming them
   and inserting them into a database. In object mode highWaterMark counts **objects** (default 16)
   instead of bytes."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Set { objectMode: true }, or readableObjectMode / writableObjectMode for one side of a
   Duplex/Transform (e.g. bytes in -> objects out).
2. null is not allowed as a chunk, because push(null) means end of stream.
3. highWaterMark = number of objects (default 16), not bytes.
4. Readable.from(iterable) is in objectMode by default.
5. Each chunk is one logical record -> no splitting issues like with raw bytes.

-----------------------------------------------------
Example (CSV text -> objects -> filter -> output)
-----------------------------------------------------
const { Readable, Transform } = require('stream');
const { pipeline } = require('stream/promises');

const lines = Readable.from(['id,name,age', '1,Asha,28', '2,Ravi,17', '3,John,35']);

let headers;
const toObject = new Transform({
  objectMode: true,
  transform(line, enc, cb) {
    const cols = line.split(',');
    if (!headers) { headers = cols; return cb(); }       // skip header row
    cb(null, Object.fromEntries(headers.map((h, i) => [h, cols[i]])));
  },
});

const adultsOnly = new Transform({
  objectMode: true,
  transform(user, enc, cb) {
    if (Number(user.age) >= 18) this.push(user);          // filter
    cb();
  },
});

const toJson = new Transform({
  writableObjectMode: true,        // objects in
  readableObjectMode: false,       // text out
  transform(obj, enc, cb) { cb(null, JSON.stringify(obj) + '\n'); },
});

pipeline(lines, toObject, adultsOnly, toJson, process.stdout).catch(console.error);
// {"id":"1","name":"Asha","age":"28"}
// {"id":"3","name":"John","age":"35"}

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Piping an objectMode stream directly into fs/HTTP writable -> TypeError (needs string/Buffer).
  Add a serializing transform (JSON.stringify) first.
- Forgetting objectMode and pushing an object -> ERR_INVALID_ARG_TYPE.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How would you insert 1 million rows into a DB using streams?
A1: Object-mode pipeline: read -> parse -> batch transform (group 500 rows) -> writable that does a
    bulk insert and calls cb after the insert resolves, so backpressure limits DB load.

Q2: Can a stream switch modes later?
A2: No, objectMode is fixed at construction.
*/
