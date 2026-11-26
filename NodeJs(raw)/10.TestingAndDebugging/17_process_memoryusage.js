/* 17_process_memoryusage.js

=====================================================
process.memoryUsage()
=====================================================

Definition (What I should say in the interview):
- "process.memoryUsage() returns an object describing the memory of the current Node process
   in bytes. The important fields are **rss**, the total memory the OS has given the process;
   **heapTotal** and **heapUsed**, which are the V8 heap allocated and actually used by JS
   objects; **external**, memory used by C++ objects bound to JS like Buffers; and
   **arrayBuffers**, the part of external used by ArrayBuffers and Buffers. I mostly watch
   heapUsed over time to spot leaks."

-----------------------------------------------------
Fields
-----------------------------------------------------
| Field        | Meaning                                                        |
|--------------|----------------------------------------------------------------|
| rss          | Resident Set Size - all memory of the process in RAM           |
|              | (heap + code + stacks + native + buffers)                      |
| heapTotal    | memory V8 has reserved for the JS heap                         |
| heapUsed     | memory actually used by live JS objects in that heap           |
| external     | memory of C++ objects tied to JS objects (Buffers, etc.)       |
| arrayBuffers | memory for ArrayBuffer/SharedArrayBuffer incl. Node Buffers    |
|              | (included in external)                                         |

-----------------------------------------------------
Example
-----------------------------------------------------
const toMB = (b) => (b / 1024 / 1024).toFixed(1) + ' MB';

function logMemory() {
  const m = process.memoryUsage();
  console.log({
    rss: toMB(m.rss),
    heapTotal: toMB(m.heapTotal),
    heapUsed: toMB(m.heapUsed),
    external: toMB(m.external),
    arrayBuffers: toMB(m.arrayBuffers),
  });
}

setInterval(logMemory, 10000).unref();     // unref -> doesn't keep process alive

// Faster when you only need RSS (Node 15.6+)
console.log(process.memoryUsage.rss());

// Related: V8 heap limits
const v8 = require('v8');
console.log(toMB(v8.getHeapStatistics().heap_size_limit));

-----------------------------------------------------
How to read it
-----------------------------------------------------
- heapUsed keeps rising and never drops after GC -> JS memory leak.
- rss grows but heapUsed is flat -> look at Buffers/external or native addons.
- heapTotal > heapUsed is normal; V8 reserves space ahead of time.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you increase the heap limit?
A1: node --max-old-space-size=4096 app.js (MB). Useful for big workloads, but not a leak fix.

Q2: Why can rss be much larger than heapUsed?
A2: rss includes everything: V8 code, thread stacks, libuv, Buffers stored off-heap and memory
    the allocator hasn't returned to the OS yet.
*/
