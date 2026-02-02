/* 414_buffer_object.js

=====================================================
Buffer Object in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `Buffer` object in Node.js is a **global class** used to handle **binary data** directly in memory. 
   It allows you to work with raw streams of data, such as files, network protocols, or streams, 
   and provides methods for reading, writing, and manipulating bytes efficiently."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Can **store raw binary data** in memory.
2. Provides **methods to read and write** data in multiple encodings (utf8, ascii, base64, hex).
3. Useful for **file I/O**, network communication, and handling streams.
4. Supports creating buffers from:
   - Arrays: `Buffer.from([1,2,3])`
   - Strings: `Buffer.from('Hello')`
   - Allocating fixed size: `Buffer.alloc(size)`
5. Supports **slicing and concatenation** without copying data unnecessarily.
6. Can convert buffers back to strings using `toString()`.

-----------------------------------------------------
Basic Example (Creating and Using Buffers)
-----------------------------------------------------
const buf1 = Buffer.from('Hello World', 'utf8');
console.log(buf1);           // <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64>
console.log(buf1.toString()); // Hello World

// Allocating empty buffer
const buf2 = Buffer.alloc(10);
console.log(buf2); // <Buffer 00 00 00 00 00 00 00 00 00 00>

// Writing to buffer
buf2.write('Node');
console.log(buf2.toString()); // Node

// Concatenating buffers
const buf3 = Buffer.from('JS');
const bufConcat = Buffer.concat([buf1, buf3]);
console.log(bufConcat.toString()); // Hello WorldJS

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Reading and writing **files in binary mode**.
- Handling **network data** in TCP/UDP protocols.
- Manipulating **streams of data** for efficiency.
- Encoding and decoding **text or binary data**.
- Working with **buffers in crypto operations**.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. `Buffer` is a **global object**, no need to require it.
2. Allocating large buffers without initializing can lead to **security risks**.
3. `Buffer.from` creates a buffer from data, while `Buffer.alloc` creates a zero-filled buffer.
4. Buffers are **fixed in size**; cannot dynamically resize.
5. Use buffer methods like `slice`, `copy`, `concat`, and `toString` for efficient operations.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of a `Buffer` as a **block of memory or an array of bytes**:
  - You can read from it, write to it, and manipulate raw data without converting it to a string unnecessarily.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is a Buffer in Node.js?  
A1: A Buffer is a global object that stores raw binary data for efficient I/O and data manipulation.

Q2: How do you create a Buffer from a string?  
A2: Using `Buffer.from('string', 'encoding')`.

Q3: What is the difference between `Buffer.alloc` and `Buffer.from`?  
A3: `Buffer.alloc` creates a zero-filled buffer of fixed size; `Buffer.from` creates a buffer from existing data.

Q4: How can you convert a Buffer to a string?  
A4: Using `buffer.toString('encoding')`.

Q5: Why are Buffers important in Node.js?  
A5: They allow efficient handling of raw binary data for files, network streams, and crypto operations.
*/
