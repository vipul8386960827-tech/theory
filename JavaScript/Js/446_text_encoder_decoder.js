/* 446_text_encoder_decoder.js

=====================================================
TextEncoder and TextDecoder in JavaScript
=====================================================

Definition (What I should say in the interview):
- "The `TextEncoder` and `TextDecoder` classes in JavaScript provide a way to **convert between strings and binary data**. 
   `TextEncoder` converts a string into a `Uint8Array` (UTF-8 bytes), and `TextDecoder` converts `Uint8Array` back into a string. 
   They are widely used in encoding/decoding text for network communication, file I/O, and working with binary streams."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **TextEncoder**
   - `new TextEncoder([encoding])` → Creates a text encoder; UTF-8 is default.
   - `encoder.encode(string)` → Returns `Uint8Array` representing encoded bytes.
   - Useful for sending strings over network or writing binary data to files.

2. **TextDecoder**
   - `new TextDecoder([encoding], [options])` → Creates a text decoder.
   - `decoder.decode(buffer)` → Converts `ArrayBuffer` or `Uint8Array` into string.
   - Can specify encoding like `'utf-8'`, `'utf-16'`, `'iso-8859-2'`, etc.
   - Supports `fatal` option to throw errors on invalid sequences and `ignoreBOM`.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const encoder = new TextEncoder();
const decoder = new TextDecoder();

const text = 'Hello World';

// Encode string to Uint8Array
const encoded = encoder.encode(text);
console.log(encoded); // Uint8Array(11) [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]

// Decode Uint8Array back to string
const decoded = decoder.decode(encoded);
console.log(decoded); // "Hello World"

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Converting strings to bytes for network transmission (WebSockets, HTTP requests).
- Writing text to binary files or ArrayBuffers.
- Working with Web APIs like `fetch` with ArrayBuffer responses.
- Encoding/decoding multi-language text safely (UTF-8).

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Default encoding for `TextEncoder` is always UTF-8.
2. `TextDecoder` can handle multiple encodings and BOMs (Byte Order Marks).
3. Useful in combination with `ArrayBuffer`, `Uint8Array`, and streams for binary operations.
4. Provides safe conversion avoiding manual encoding using `charCodeAt` or manual byte arrays.
5. Essential in modern web applications, Web Workers, WebAssembly, and Node.js binary operations.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of TextEncoder/TextDecoder as a **translator**:
  - `TextEncoder` converts readable text into machine-friendly bytes.
  - `TextDecoder` converts bytes back into human-readable text.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between TextEncoder and Buffer in Node.js?  
A1: `TextEncoder` is a browser and modern JS API for encoding strings to bytes, while `Buffer` is Node.js specific for handling binary data with more features.

Q2: Can TextDecoder handle partial buffers?  
A2: Yes, with `stream: true` option in TextDecoder for incremental decoding.

Q3: Default encoding used by TextEncoder?  
A3: UTF-8.

Q4: How do you handle multi-byte characters?  
A4: TextEncoder/TextDecoder correctly encode/decode multi-byte UTF-8 sequences automatically.

Q5: Where are TextEncoder/TextDecoder commonly used?  
A5: Web APIs, WebAssembly, Web Workers, binary file manipulation, and network communication.
*/
