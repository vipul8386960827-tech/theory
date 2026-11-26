/* 7_pipe_and_pipeline.js

=====================================================
pipe() vs stream.pipeline()
=====================================================

Definition (What I should say in the interview):
- "readable.pipe(writable) connects a Readable to a Writable and handles backpressure for me.
   The problem is that pipe **does not forward errors** and does not clean up: if the source or a
   middle stream fails, the other streams are not destroyed, which can leak file descriptors and
   memory. stream.pipeline fixes this - it forwards errors, destroys all streams on failure and
   gives one final callback. With async/await I use pipeline from 'stream/promises'."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Feature                  | pipe()                 | pipeline()                 |
|--------------------------|------------------------|----------------------------|
| Backpressure             | Yes                    | Yes                        |
| Error propagation        | No (each stream alone) | Yes, single callback/await |
| Destroys streams on err  | No                     | Yes                        |
| Chaining                 | a.pipe(b).pipe(c)      | pipeline(a, b, c, cb)      |
| Async generators allowed | No                     | Yes                        |

-----------------------------------------------------
Example
-----------------------------------------------------
const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream/promises');

// BAD: error on read stream is not handled by the write stream
// fs.createReadStream('big.csv').pipe(zlib.createGzip()).pipe(fs.createWriteStream('big.gz'));

// GOOD
async function compress() {
  try {
    await pipeline(
      fs.createReadStream('big.csv'),
      zlib.createGzip(),
      fs.createWriteStream('big.csv.gz')
    );
    console.log('Done');
  } catch (err) {
    console.error('Pipeline failed:', err.message); // any stage's error lands here
  }
}
compress();

// Async generator as a transform step
// await pipeline(src, async function* (source) {
//   for await (const chunk of source) yield chunk.toString().toUpperCase();
// }, dest);

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Chaining .pipe() and adding .on('error') only on the last stream - errors from earlier streams
  are NOT caught there.
- In Express: pipeline(fileStream, res, cb) is safer than fileStream.pipe(res), because if the
  client disconnects the file stream is destroyed.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: When would you still use pipe?
A1: Quick scripts, or piping to process.stdout. In production code I prefer pipeline.

Q2: Callback vs promise pipeline?
A2: require('stream').pipeline takes a final callback; require('stream/promises').pipeline returns
    a Promise for async/await. Same behavior.

Q3: What is stream.finished?
A3: A helper that tells you when a stream has ended, errored or closed - useful for cleanup.
*/
