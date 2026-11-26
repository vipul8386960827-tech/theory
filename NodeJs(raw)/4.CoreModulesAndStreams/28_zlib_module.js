/* 28_zlib_module.js

=====================================================
zlib Module
=====================================================

Definition (What I should say in the interview):
- "zlib provides compression and decompression using **gzip, deflate and Brotli**. Every algorithm
   is available as a **Transform stream** (createGzip, createGunzip, createBrotliCompress) for
   large data, and as one-shot functions (gzip, gunzip, and their Sync versions) for small buffers.
   I use it to compress files or log archives and to gzip HTTP responses, although in production
   compression is often done by Nginx or a CDN."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. Streams: createGzip / createGunzip, createDeflate / createInflate,
   createBrotliCompress / createBrotliDecompress.
2. One-shot: zlib.gzip(buf, cb), zlib.gunzipSync(buf) - promisify for async/await.
3. Compression work runs on the libuv thread pool (async APIs), so it does not block the loop.
4. Options: level (0-9 for gzip), Brotli params (quality).
5. Brotli -> better ratio, slower to compress; gzip -> widely supported, faster.

-----------------------------------------------------
Example
-----------------------------------------------------
const fs = require('fs');
const zlib = require('zlib');
const http = require('http');
const { pipeline } = require('stream/promises');
const { promisify } = require('util');

// 1. Compress a file with streams
async function gzipFile(src) {
  await pipeline(fs.createReadStream(src), zlib.createGzip({ level: 6 }),
                 fs.createWriteStream(src + '.gz'));
}

// 2. One-shot for small data
const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);
async function roundTrip() {
  const packed = await gzip(JSON.stringify({ msg: 'hello'.repeat(100) }));
  console.log('compressed bytes:', packed.length);
  console.log((await gunzip(packed)).toString().slice(0, 20));
}

// 3. Gzip HTTP response if client supports it
http.createServer((req, res) => {
  const src = fs.createReadStream('data.json');
  if (/\bgzip\b/.test(req.headers['accept-encoding'] || '')) {
    res.writeHead(200, { 'Content-Encoding': 'gzip', 'Content-Type': 'application/json' });
    pipeline(src, zlib.createGzip(), res).catch(() => {});
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    pipeline(src, res).catch(() => {});
  }
}).listen(3000);

roundTrip().catch(console.error);

-----------------------------------------------------
Common Mistake / Important Notes
-----------------------------------------------------
- Compressing already compressed files (jpg, mp4, zip) -> wastes CPU, little or no gain.
- Using gzipSync in a request handler -> blocks the event loop.
- Forgetting the Content-Encoding header -> client receives binary garbage.
- In Express, the "compression" middleware uses zlib under the hood.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why stream instead of zlib.gzip for big files?
A1: One-shot holds the full input and output in memory; the stream version uses constant memory.

Q2: gzip vs deflate?
A2: Same algorithm (DEFLATE); gzip adds a header and CRC checksum. gzip is the safer choice for HTTP.
*/
