/* 423_stream_module.js

=====================================================
Stream Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `stream` module in Node.js provides an API for **handling streaming data**. 
   It allows reading and writing data in small chunks instead of loading the entire data into memory. 
   Streams are **EventEmitter-based** and power many Node.js features like file operations, HTTP requests, and data processing."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Streams are **instances of EventEmitter**.
2. Four main types of streams:
   - **Readable** → For reading data (e.g., fs.createReadStream).
   - **Writable** → For writing data (e.g., fs.createWriteStream).
   - **Duplex** → Both readable and writable (e.g., net.Socket).
   - **Transform** → Duplex streams that can modify data as it passes (e.g., zlib for compression).
3. Operates on **chunks** of data, not the whole file.
4. Event-driven with events like `data`, `end`, `error`, `finish`.
5. Supports **piping** (`.pipe()`) for chaining streams together.

-----------------------------------------------------
Basic Example (Readable Stream)
-----------------------------------------------------
const fs = require('fs');

const readStream = fs.createReadStream('example.txt', { encoding: 'utf8' });

readStream.on('data', (chunk) => {
  console.log('New chunk received:', chunk);
});

readStream.on('end', () => {
  console.log('No more data.');
});

-----------------------------------------------------
Writable Stream Example
-----------------------------------------------------
const writeStream = fs.createWriteStream('output.txt');

writeStream.write('Hello Stream!\n');
writeStream.end('Finished writing.');

writeStream.on('finish', () => {
  console.log('Data written successfully.');
});

-----------------------------------------------------
Pipe Example (Read → Write)
-----------------------------------------------------
const read = fs.createReadStream('input.txt');
const write = fs.createWriteStream('output.txt');

read.pipe(write);

-----------------------------------------------------
Transform Stream Example
-----------------------------------------------------
const { Transform } = require('stream');

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

process.stdin.pipe(upperCaseTransform).pipe(process.stdout);

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Reading and writing large files efficiently.
- Streaming audio/video files.
- Processing HTTP requests and responses.
- Real-time data processing (e.g., logs, chat).
- Piping data through transformations (compression, encryption).

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Streams help save **memory** by processing chunks instead of loading full data.
2. Streams are **asynchronous** and **non-blocking**.
3. Always handle `error` events to avoid crashes.
4. `.pipe()` automatically manages flow control.
5. `highWaterMark` option controls internal buffer size.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of a stream as a **water pipeline**:
  - Data flows like water, you can read from one end and write to the other, 
    and even put filters (transform streams) in between.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What are the types of streams in Node.js?  
A1: Readable, Writable, Duplex, and Transform.

Q2: Difference between `readStream.on('data')` and `.pipe()`?  
A2: `on('data')` manually handles chunks, while `.pipe()` automatically manages flow and backpressure.

Q3: Why are streams memory-efficient?  
A3: Because they process data in **chunks** rather than loading everything into memory at once.

Q4: How do you handle errors in streams?  
A4: By listening to the `error` event.

Q5: Give real-world examples of Node.js modules using streams.  
A5: `fs` (file reading/writing), `http` (request/response), `zlib` (compression), `crypto` (encryption).
*/
