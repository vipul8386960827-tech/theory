/* 5_buffer_object.js

=====================================================
Buffer Object
=====================================================

Definition (What I should say in the interview):
- "A Buffer is Node's way to handle **raw binary data** - a fixed-size chunk of memory allocated
   outside the V8 heap. JavaScript strings are for text, but files, TCP packets, images and
   crypto output are bytes, so Node uses Buffers. Buffer is a subclass of Uint8Array, it is
   available globally, and its size cannot change after creation."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Each element is a byte (0-255).
2. Creating: Buffer.from(string|array|buffer), Buffer.alloc(size), Buffer.allocUnsafe(size).
3. Converting: buf.toString('utf8' | 'hex' | 'base64').
4. buf.length -> number of BYTES, not characters.
5. buf.slice / buf.subarray -> share the same memory (no copy!).
6. Buffer.concat([b1, b2]), buf.equals(other), buf.copy(target).
7. fs.readFile without encoding and stream chunks (by default) are Buffers.

-----------------------------------------------------
Example
-----------------------------------------------------
const buf = Buffer.from('Hello');
console.log(buf);                    // <Buffer 48 65 6c 6c 6f>
console.log(buf.length);             // 5
console.log(buf[0]);                 // 72 ('H')
console.log(buf.toString('hex'));    // 48656c6c6f

console.log('h\u00e9'.length, Buffer.byteLength('h\u00e9')); // 2 chars, 3 bytes

const part = buf.subarray(0, 2);
part[0] = 74;                        // 'J'
console.log(buf.toString());         // Jello -> shared memory!

const all = Buffer.concat([Buffer.from('a'), Buffer.from('b')]);
console.log(all.toString());         // ab

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Using str.length for Content-Length -> wrong for non-ASCII. Use Buffer.byteLength(str).
- Concatenating chunks with += on strings can break multi-byte characters split across chunks.
  Collect Buffers and Buffer.concat at the end, or use setEncoding / string_decoder.
- new Buffer() is deprecated (security issues). Use Buffer.from / Buffer.alloc.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Where is Buffer memory stored?
A1: Outside the V8 heap (external memory), which is why large binary data does not bloat the heap.

Q2: Does slice copy the data?
A2: No, buf.slice/subarray return a view on the same memory. Use Buffer.from(buf) to copy.
*/
