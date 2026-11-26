/* 24_stream_error_handling.js

=====================================================
Error Handling in Streams
=====================================================

Definition (What I should say in the interview):
- "Streams report failures through the **'error' event**, and an 'error' with no listener crashes
   the process. The tricky part is that errors do **not propagate** through pipe() - each stream
   needs its own handler and you must destroy the others yourself. So my approach is to use
   **stream.pipeline** or the promise version from 'stream/promises' with try/catch: one place to
   handle errors, and all streams are destroyed and cleaned up automatically."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Always handle 'error' on every stream you create manually.
2. After an error, a stream is usually destroyed: no more 'data'/'end'; 'close' is emitted.
3. stream.destroy(err) -> manually fail/abort a stream (emits 'error' then 'close').
4. Inside custom streams: report errors via callback(err) or this.destroy(err), not throw.
5. for await...of on a Readable throws the stream error -> catch it with try/catch.
6. AbortSignal: pipeline(a, b, { signal }) to cancel (e.g. request timeout).

-----------------------------------------------------
Example
-----------------------------------------------------
const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream/promises');
const http = require('http');

http.createServer(async (req, res) => {
  // if the client disconnects, res is destroyed and pipeline rejects on its own

  try {
    res.setHeader('Content-Encoding', 'gzip');
    await pipeline(
      fs.createReadStream('report.csv'),        // may fail: ENOENT
      zlib.createGzip(),
      res,
      { signal: AbortSignal.timeout(30000) }  // give up after 30s
    );
  } catch (err) {
    console.error('Download failed:', err.code || err.name);
    if (!res.headersSent) res.statusCode = 500;
    res.destroy();                              // pipeline already destroyed it; safe to repeat
  }
}).listen(3000);

// Async iteration errors
async function readSafe(file) {
  try {
    for await (const chunk of fs.createReadStream(file)) { console.log(chunk.length); }
  } catch (err) {
    console.error('read failed', err.message);
  }
}

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- a.pipe(b).pipe(c).on('error', ...) only catches errors from c.
- Leaving file descriptors open after a failed pipe -> EMFILE "too many open files" over time.
- Throwing inside a 'data' handler -> becomes an uncaught exception, not a stream error.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What happens to a pipeline if the client disconnects mid-download?
A1: res is destroyed (ERR_STREAM_PREMATURE_CLOSE), pipeline rejects and destroys the file stream.

Q2: How do you add a timeout to a stream operation?
A2: Pass { signal: AbortSignal.timeout(ms) } to pipeline; on timeout it aborts with an AbortError.
*/
