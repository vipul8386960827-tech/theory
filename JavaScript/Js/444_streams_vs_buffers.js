/* 444_streams_vs_buffers.js

=====================================================
Streams vs Buffers in Node.js
=====================================================

Definition (What I should say in the interview):
- "In Node.js, **Buffers** are temporary storage areas in memory used to hold **binary data**. 
   They allow handling raw data in memory before processing. 
- **Streams** are abstractions for handling **continuous flow of data**, allowing you to process data piece by piece instead of loading it all at once. 
- Using streams with buffers efficiently manages large files or network data without consuming excessive memory."

-----------------------------------------------------
Key Features of Buffers
-----------------------------------------------------
1. Temporary storage for raw binary data.
2. Fixed-size chunks allocated in memory.
3. Can be created using `Buffer.from()`, `Buffer.alloc()`, or `Buffer.allocUnsafe()`.
4. Provides methods for reading/writing various data types (`readInt8`, `writeInt16BE`, etc.).
5. Useful for network packets, file I/O, and encoding/decoding data.

Example (Buffer)
-----------------------------------------------------
const buf = Buffer.from('Hello');
console.log(buf);           // <Buffer 48 65 6c 6c 6f>
console.log(buf.toString()); // Hello

-----------------------------------------------------
Key Features of Streams
-----------------------------------------------------
1. Abstraction for **continuous data flow**.
2. Types of streams:
   - **Readable**: for reading data (`fs.createReadStream`)
   - **Writable**: for writing data (`fs.createWriteStream`)
   - **Duplex**: can read and write (`net.Socket`)
   - **Transform**: can modify data while passing through (`zlib.createGzip`)
3. Can handle **large data efficiently** by processing in chunks.
4. Event-driven: `'data'`, `'end'`, `'error'`, `'finish'` events.
5. Often uses buffers internally for chunk management.

Example (Stream)
-----------------------------------------------------
const fs = require('fs');
const readable = fs.createReadStream('file.txt');

readable.on('data', (chunk) => {
  console.log('Received chunk:', chunk.toString());
});

readable.on('end', () => console.log('Finished reading file'));

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- **Buffers**: Network packet processing, temporary binary storage, encoding/decoding data.
- **Streams**: Large file processing, live video/audio data, HTTP request/response handling.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Buffers store **static data**, while streams handle **dynamic, continuous data**.
2. Streams reduce memory usage by processing data in chunks.
3. Buffers can be used inside streams to hold each chunk.
4. Node.js I/O operations often return streams for performance reasons.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Buffers are like **buckets of water** holding a fixed amount.
- Streams are like **rivers**, continuously flowing and processed along the way.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can you convert a buffer to a stream?  
A1: Yes, using `Readable.from(buffer)` or custom readable streams.

Q2: Why use streams over buffers for large files?  
A2: Streams process data chunk by chunk, preventing high memory consumption.

Q3: What are the main types of streams?  
A3: Readable, Writable, Duplex, Transform.

Q4: Do streams always use buffers internally?  
A4: Yes, streams manage data in chunks using buffers internally.

Q5: Can streams be piped?  
A5: Yes, using `stream.pipe()` to connect readable and writable streams efficiently.
*/
