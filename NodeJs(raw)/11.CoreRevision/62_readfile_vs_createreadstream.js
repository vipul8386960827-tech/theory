/* 11_readfile_vs_createreadstream.js

=====================================================
fs.readFile vs fs.createReadStream
=====================================================

Definition (What I should say in the interview):
- "fs.readFile reads the **entire file into memory** and gives it to me in one callback or
   promise. fs.createReadStream returns a Readable stream that reads the file in **chunks of 64 KB
   by default** (its highWaterMark). For small files readFile is simpler; for large files, or when
   I am sending a file to an HTTP response, I use createReadStream with pipeline so memory stays
   constant."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Point           | readFile                 | createReadStream                  |
|-----------------|--------------------------|-----------------------------------|
| Returns         | whole Buffer/string      | Readable stream                   |
| Memory          | = file size              | ~64 KB chunk buffer by default    |
| First data      | after full read          | as soon as first chunk is ready   |
| Partial reads   | No                       | Yes: { start, end } byte range    |
| Huge files      | can fail (buffer limit)  | fine                              |
| API style       | callback / promise       | events / pipeline / for await     |

-----------------------------------------------------
Example
-----------------------------------------------------
const fs = require('fs');
const fsp = require('fs/promises');

// readFile - small config
async function loadConfig() {
  const json = await fsp.readFile('config.json', 'utf8');
  return JSON.parse(json);
}

// createReadStream - count lines of a huge log
async function countLines(file) {
  let lines = 0;
  const stream = fs.createReadStream(file, { highWaterMark: 64 * 1024 });
  for await (const chunk of stream) {
    for (const byte of chunk) if (byte === 10) lines++;   // 10 = '\n'
  }
  return lines;
}

// Byte range (used for HTTP Range / video seeking)
const part = fs.createReadStream('movie.mp4', { start: 0, end: 1023 }); // first 1 KB

loadConfig().catch(console.error);
countLines('app.log').then((n) => console.log('lines:', n)).catch(console.error);

-----------------------------------------------------
Common Mistake
-----------------------------------------------------
- Using readFile to serve downloads -> memory spikes with concurrent users.
- Not handling the 'error' event on a read stream (e.g. ENOENT) -> crash. pipeline or
  for await with try/catch handles it.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can readFile read a 5 GB file?
A1: Usually no - it hits the max Buffer/string size and wastes RAM. Use a stream.

Q2: How do you change the chunk size?
A2: Pass highWaterMark in the options, e.g. { highWaterMark: 16 * 1024 }.
*/
