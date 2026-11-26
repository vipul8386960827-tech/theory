/* 8_serve_large_file_downloads.js

=====================================================
Scenario: Large File Downloads Cause Memory Spikes
=====================================================

The Question (how the interviewer asks it):
- "Users download large files (videos, 500MB exports) from our Node server. When many users
   download at the same time, memory spikes and the server slows down or crashes. How do you
   fix it?"

What the interviewer is checking:
- Streams vs loading the whole file into memory.
- stream.pipeline for backpressure and error handling / cleanup.
- Architecture: should Node even serve these bytes? CDN, S3 pre-signed URLs.
- HTTP details: Content-Length, Content-Disposition, Range requests.

-----------------------------------------------------
How I would answer (step by step)
-----------------------------------------------------
1. Find the cause: the code probably uses fs.readFile or res.send(buffer). 20 users x 500MB =
   10GB in memory. That is the spike.
2. Stream the file: fs.createReadStream(file) piped to res. Memory per download is only a
   small buffer (64KB chunks), no matter how big the file is.
3. Use stream.pipeline (promise version) instead of .pipe(): it handles backpressure for slow
   clients AND destroys the file stream if the client disconnects or an error happens.
4. Set the correct headers: Content-Type, Content-Length, Content-Disposition (attachment).
   Support Range requests for video/resume (express res.sendFile / res.download do this).
5. Better architecture: store files in S3 (or similar) and return a short-lived pre-signed URL,
   or put a CDN in front. Then the bytes do not go through Node at all.
6. If files are generated (exports), generate them in a background job, upload to S3, and
   send the user a link.
7. Protect: auth check before download, rate limit, and limit concurrent downloads per user.

-----------------------------------------------------
Code Example
-----------------------------------------------------
const fs = require('node:fs');
const path = require('node:path');
const { pipeline } = require('node:stream/promises');

// BAD: whole file in memory for every request
// app.get('/files/:name', async (req, res) => res.send(await fs.promises.readFile(p)));

// GOOD: stream with pipeline (backpressure + cleanup on disconnect)
const FILES_DIR = path.resolve('./files');
app.get('/files/:name', async (req, res, next) => {
  const filePath = path.join(FILES_DIR, path.basename(req.params.name)); // block ../ tricks
  try {
    const { size } = await fs.promises.stat(filePath);
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Length': size,
      'Content-Disposition': `attachment; filename="${path.basename(filePath)}"`,
    });
    await pipeline(fs.createReadStream(filePath), res);
  } catch (err) {
    if (!res.headersSent) return next(err);  // e.g. file not found
    res.destroy();                           // client gone or stream error mid-way
  }
});

// BEST for big files: let S3 serve it with a pre-signed URL
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const s3 = new S3Client({ region: 'us-east-1' });

app.get('/downloads/:key', async (req, res) => {
  const cmd = new GetObjectCommand({ Bucket: 'my-bucket', Key: req.params.key });
  const url = await getSignedUrl(s3, cmd, { expiresIn: 300 }); // valid for 5 minutes
  res.redirect(url);
});

-----------------------------------------------------
Answer in 30 seconds (what I should say in the interview)
-----------------------------------------------------
- "The memory spike comes from loading whole files into memory for each request. I would
   stream them with fs.createReadStream and stream.pipeline, which keeps memory small,
   handles backpressure for slow clients, and cleans up when a client disconnects. I set
   Content-Length and Content-Disposition headers and support range requests. For really
   large files, the best solution is to keep them in S3 behind a CDN and give users a
   short-lived pre-signed URL, so Node does not serve the bytes at all."

-----------------------------------------------------
Common Mistakes / Red Flags
-----------------------------------------------------
- Using readFile / res.send(buffer) for big files.
- Using .pipe() without error handling - on client disconnect the file stream can stay open
  (file descriptor leak).
- Building the path from user input without sanitizing it (path traversal: ../../etc/passwd).
- Not considering a CDN or object storage, and serving everything through the app server.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is backpressure here?
A1: The disk is faster than a slow user's network. Without backpressure, data read from disk
    would pile up in memory. pipeline pauses reading when res.write() returns false and
    resumes on the 'drain' event.

Q2: How do you support resuming a download or seeking in a video?
A2: Handle the Range header and reply 206 Partial Content with Content-Range, using
    createReadStream(file, { start, end }). res.sendFile in Express already supports this.

Q3: Why is a pre-signed URL secure?
A3: The URL contains a signature and an expiry time. Only users who got it from our API (after
    auth) can download, and it stops working after a few minutes. The bucket stays private.
*/
