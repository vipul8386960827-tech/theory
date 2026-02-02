/* 445_buffer_methods.js

=====================================================
Buffer Methods in Node.js
=====================================================

Definition (What I should say in the interview):
- "Buffers in Node.js are used to handle **raw binary data** directly in memory. 
   They provide a variety of methods to read, write, manipulate, and convert binary data efficiently. 
   Buffers are essential for network communication, file I/O, and encoding/decoding data."

-----------------------------------------------------
Key Methods of Buffer
-----------------------------------------------------
1. **Creation**
   - `Buffer.from(array|string[, encoding])` → Creates buffer from array or string.
   - `Buffer.alloc(size[, fill[, encoding]])` → Creates buffer of specified size, filled with default or specified value.
   - `Buffer.allocUnsafe(size)` → Faster buffer creation without initializing memory (unsafe, may contain old data).

2. **Writing Data**
   - `buf.write(string[, offset[, length]][, encoding])` → Writes string into buffer.
   - `buf.writeUInt8(value, offset)` → Writes an unsigned 8-bit integer.
   - `buf.writeInt16BE(value, offset)` → Writes signed 16-bit integer in Big Endian.

3. **Reading Data**
   - `buf.toString([encoding[, start[, end]]])` → Converts buffer to string.
   - `buf.readUInt8(offset)` → Reads unsigned 8-bit integer.
   - `buf.readInt16LE(offset)` → Reads signed 16-bit integer in Little Endian.

4. **Copy and Slice**
   - `buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])` → Copies data to another buffer.
   - `buf.slice([start[, end]])` → Returns a new buffer referencing a portion of original buffer.

5. **Concatenation and Comparison**
   - `Buffer.concat([buf1, buf2, ...][, totalLength])` → Concatenates multiple buffers.
   - `buf.equals(otherBuffer)` → Compares two buffers.
   - `buf.compare(otherBuffer)` → Returns number indicating sort order.

6. **Utility**
   - `buf.fill(value[, offset[, end]][, encoding])` → Fills buffer with value.
   - `buf.includes(value[, byteOffset[, encoding]])` → Checks if buffer contains value.
   - `buf.indexOf(value[, byteOffset[, encoding]])` → Finds first occurrence of value.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const buf1 = Buffer.from('Hello');
const buf2 = Buffer.from('World');

console.log(buf1.toString()); // Hello
console.log(buf2.toString()); // World

const buf3 = Buffer.concat([buf1, buf2]);
console.log(buf3.toString()); // HelloWorld

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Network communication (TCP/UDP data packets).
- File reading/writing in binary format.
- Encoding/decoding data (UTF-8, Base64, ASCII).
- Manipulating binary protocols or streams.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Buffers have fixed size and cannot be resized.
2. `Buffer.allocUnsafe()` is faster but may contain sensitive old data; always overwrite before use.
3. Use appropriate encoding (`utf8`, `ascii`, `base64`) when converting between strings and buffers.
4. Many Node.js APIs return buffers for raw data handling.
5. Buffers work well with streams to manage chunked data.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Buffers are like **memory boxes**:
  - You can store, read, and manipulate raw bytes directly, just like accessing items inside a box.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between Buffer.alloc and Buffer.allocUnsafe?  
A1: `alloc` initializes memory with zeros; `allocUnsafe` does not initialize memory (faster but may contain old data).

Q2: How do you convert a buffer to string?  
A2: Use `buf.toString([encoding])`.

Q3: How to combine multiple buffers?  
A3: Use `Buffer.concat([buf1, buf2, ...])`.

Q4: How to read/write integers in buffer?  
A4: Use methods like `readUInt8`, `writeInt16BE`, `readInt32LE`, etc.

Q5: Are buffer slices copies or references?  
A5: `buf.slice()` creates a **view/reference** of the original buffer, not a copy.
*/
