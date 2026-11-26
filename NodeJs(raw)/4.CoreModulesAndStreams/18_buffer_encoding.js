/* 18_buffer_encoding.js

=====================================================
Buffer Encodings
=====================================================

Definition (What I should say in the interview):
- "An encoding defines how bytes are converted to and from text. Buffers store raw bytes, and when
   I call buf.toString(encoding) or Buffer.from(str, encoding) Node uses that encoding. The default
   is **utf8**. The ones I use most are utf8 for text, **base64** for sending binary data in JSON
   or headers (like Basic Auth or images), base64url for JWTs, and **hex** for hashes and IDs."

-----------------------------------------------------
Supported Encodings
-----------------------------------------------------
| Encoding   | Use                                                     |
|------------|---------------------------------------------------------|
| utf8       | default; normal text, 1-4 bytes per character           |
| utf16le    | Windows APIs, 2 or 4 bytes per char (alias ucs2)        |
| latin1     | 1 byte per char, old systems (alias binary)             |
| ascii      | 7-bit only                                              |
| base64     | binary -> text (Basic Auth, email, data URIs)           |
| base64url  | URL-safe base64 (JWT parts), no + / = characters        |
| hex        | 2 hex chars per byte (hashes, tokens)                   |

-----------------------------------------------------
Example
-----------------------------------------------------
// Basic Auth header
const token = Buffer.from('admin:secret').toString('base64');
console.log(`Basic ${token}`);                  // Basic YWRtaW46c2VjcmV0
console.log(Buffer.from(token, 'base64').toString('utf8')); // admin:secret

// Hex
console.log(Buffer.from('Node').toString('hex'));  // 4e6f6465

// Decoding a JWT payload (not verifying!)
const jwt = 'xxx.eyJ1c2VySWQiOjF9.yyy';
const payload = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64url').toString());
console.log(payload);                           // { userId: 1 }

// Streams: set encoding to get strings instead of Buffers
// fs.createReadStream('a.txt', { encoding: 'utf8' })  or  stream.setEncoding('utf8')

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Base64 is ENCODING, not encryption - anyone can decode it.
- Base64 makes data about 33% larger.
- Converting each stream chunk with chunk.toString() can break a multi-byte UTF-8 character that
  is split between two chunks. setEncoding('utf8') or string_decoder handles that correctly.
- Invalid bytes in utf8 decode become the replacement character (U+FFFD), silently.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why do we need base64 at all?
A1: Some channels (JSON, HTTP headers, email) are text-only; base64 safely represents binary as text.

Q2: Difference between base64 and base64url?
A2: base64url replaces + with -, / with _ and drops = padding, so it is safe inside URLs.
*/
