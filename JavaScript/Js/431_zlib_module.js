/* 431_zlib_module.js

=====================================================
Zlib Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `zlib` module in Node.js provides compression and decompression 
   functionalities using the Gzip, Deflate, and Brotli algorithms. 
   It is commonly used to reduce the size of data for storage or transmission."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Provides **synchronous and asynchronous** compression/decompression.
2. Supports common formats: **Gzip, Deflate, Brotli**.
3. Can be used directly with streams (e.g., files, HTTP responses).
4. Improves **network efficiency** by reducing payload size.
5. Works well with **streams** for large data (non-blocking).

-----------------------------------------------------
Basic Example (Compress & Decompress a String)
-----------------------------------------------------
const zlib = require('zlib');

const input = 'Hello World! Hello World! Hello World!';

// Compress
zlib.gzip(input, (err, buffer) => {
  if (err) throw err;
  console.log('Compressed:', buffer.toString('base64'));

  // Decompress
  zlib.gunzip(buffer, (err, result) => {
    if (err) throw err;
    console.log('Decompressed:', result.toString());
  });
});

-----------------------------------------------------
Example (Using Streams to Compress a File)
-----------------------------------------------------
const fs = require('fs');
const zlib = require('zlib');

// Compress file.txt into file.txt.gz
const gzip = zlib.createGzip();
const readStream = fs.createReadStream('file.txt');
const writeStream = fs.createWriteStream('file.txt.gz');

readStream.pipe(gzip).pipe(writeStream);

-----------------------------------------------------
Example (Decompress File with Streams)
-----------------------------------------------------
const gunzip = zlib.createGunzip();
const compressed = fs.createReadStream('file.txt.gz');
const decompressed = fs.createWriteStream('file_uncompressed.txt');

compressed.pipe(gunzip).pipe(decompressed);

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- HTTP response compression (e.g., `res.pipe(zlib.createGzip())`).
- File compression/decompression.
- Reducing payload size for APIs or logs.
- Storing large datasets more efficiently.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Works seamlessly with Node.js **streams**, making it efficient for large files.
2. Gzip and Deflate are widely supported by browsers for HTTP compression.
3. Brotli is newer and provides better compression in some cases.
4. For small payloads, compression may not always be beneficial due to overhead.
5. Always handle errors when compressing/decompressing streams.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of `zlib` like **vacuum sealing clothes**:
  - Compression squeezes them smaller for storage or transport.
  - Decompression lets you restore them back to normal size.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between Gzip, Deflate, and Brotli?  
A1: All are compression algorithms. Gzip is widely supported, Deflate is simpler, Brotli is newer and more efficient for text/web content.

Q2: How does `zlib` improve HTTP performance?  
A2: By compressing HTTP responses before sending them to the client, reducing transfer size and improving speed.

Q3: Can zlib be used synchronously?  
A3: Yes, functions like `zlib.gzipSync()` exist, but they block the event loop and should be avoided for large data.

Q4: Why are streams preferred with zlib?  
A4: Streams process data in chunks, making compression efficient and non-blocking for large files.

Q5: What is the trade-off when using compression?  
A5: Compression reduces size but increases CPU usage; balance depends on use case (e.g., real-time systems may prefer less compression).
*/
