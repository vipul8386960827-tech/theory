/* 17_buffer_alloc_vs_allocunsafe.js

=====================================================
Buffer.alloc vs Buffer.allocUnsafe
=====================================================

Definition (What I should say in the interview):
- "Buffer.alloc(size) creates a buffer and **fills it with zeros**, so it is safe but slightly
   slower. Buffer.allocUnsafe(size) skips the zero-fill, so it is faster but the memory may still
   contain **old data** from earlier use - like passwords or tokens. So I use alloc by default,
   and allocUnsafe only when I am going to overwrite every byte immediately."

-----------------------------------------------------
Comparison
-----------------------------------------------------
| Point            | Buffer.alloc(n)         | Buffer.allocUnsafe(n)                 |
|------------------|-------------------------|---------------------------------------|
| Initialized      | Yes, zero-filled        | No, random old memory                 |
| Speed            | Slower (fill cost)      | Faster                                |
| Security         | Safe                    | May leak sensitive data if sent out   |
| Memory pool      | Not pooled              | Uses shared 8 KB pool for small sizes |
| Custom fill      | alloc(n, 'a')           | must fill/overwrite yourself          |

-----------------------------------------------------
Example
-----------------------------------------------------
const safe = Buffer.alloc(10);
console.log(safe);            // <Buffer 00 00 00 00 00 00 00 00 00 00>

const unsafe = Buffer.allocUnsafe(10);
console.log(unsafe);          // could be anything, e.g. <Buffer 68 1f 00 ...>

// Correct use of allocUnsafe: overwrite all bytes right away
const out = Buffer.allocUnsafe(4);
out.writeUInt32BE(0xdeadbeef, 0);
console.log(out);             // <Buffer de ad be ef>

// Or clean it explicitly
const cleaned = Buffer.allocUnsafe(1024).fill(0);

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- Buffer.allocUnsafe for sizes under ~4 KB (half of Buffer.poolSize, 8 KB) is carved out of a
  pre-allocated pool - another reason it is fast.
- Buffer.allocUnsafeSlow -> unsafe but not from the pool (for long-lived buffers so they do not
  keep a whole pool slice alive).
- Buffer.from(...) also may use the pool but the content is always your data, so it is safe.
- Old new Buffer(n) behaved like allocUnsafe in early versions -> that is why it was deprecated.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Real risk of allocUnsafe?
A1: If you send an unsafe buffer to a client without filling it, you may leak memory from
    other requests (keys, session data).

Q2: When is allocUnsafe justified?
A2: Hot paths (parsers, binary protocols) where you immediately write the whole buffer.
*/
