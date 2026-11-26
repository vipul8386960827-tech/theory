/* 9_streams_vs_buffers.js

=====================================================
Streams vs Buffers (Buffering everything)
=====================================================

Definition (What I should say in the interview):
- "Buffering means loading the **whole data into memory first** and then processing it, like
   fs.readFile. Streaming means processing the data **chunk by chunk as it arrives**. Buffering is
   simpler and fine for small data, but for large files or many concurrent requests streaming
   keeps memory usage low and constant, and the user starts receiving data sooner (better time
   to first byte)."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Aspect              | Buffer whole data          | Stream                         |
|---------------------|----------------------------|--------------------------------|
| Memory              | Size of the whole data     | ~highWaterMark per stream      |
| Start of processing | After everything loaded    | Immediately, first chunk       |
| Code complexity     | Simple                     | Slightly more (events/pipeline)|
| Max size            | Limited (buffer max / RAM) | Practically unlimited          |
| Random access       | Easy                       | Sequential only                |
| Good for            | Small JSON/config files    | Videos, logs, CSV, uploads     |

-----------------------------------------------------
Example (serving a large video)
-----------------------------------------------------
const http = require('http');
const fs = require('fs');
const { pipeline } = require('stream');

http.createServer((req, res) => {
  if (req.url === '/buffered') {
    // 1 GB file -> 1 GB RAM per request
    fs.readFile('movie.mp4', (err, data) => {
      if (err) { res.statusCode = 500; return res.end(); }
      res.end(data);
    });
  } else {
    // Constant small memory per request
    res.setHeader('Content-Type', 'video/mp4');
    pipeline(fs.createReadStream('movie.mp4'), res, (err) => {
      if (err) console.error('stream error', err.message);
    });
  }
}).listen(3000);

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Note the naming: a "Buffer" is the binary data type; "buffering" is the strategy of loading
  everything at once. Streams themselves emit Buffer chunks.
- With 100 concurrent users downloading a 100 MB file, buffering needs ~10 GB; streaming needs a
  few MB.
- JSON.parse needs the whole text, so for huge JSON you need a streaming parser or NDJSON.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: When is readFile better than a stream?
A1: Small files you need completely anyway (config, templates) - simpler code, negligible memory.

Q2: How would you process a 5 GB CSV?
A2: createReadStream -> a line/CSV parser transform -> process rows -> write/DB in batches,
    all wired with pipeline so backpressure keeps memory flat.
*/
