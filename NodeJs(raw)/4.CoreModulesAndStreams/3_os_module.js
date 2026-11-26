/* 3_os_module.js

=====================================================
os Module
=====================================================

Definition (What I should say in the interview):
- "The os module gives information about the operating system and machine the Node process is
   running on - CPU cores, total and free memory, platform, hostname, uptime, network interfaces
   and the temp directory. In real projects I mostly use os.cpus().length (or
   os.availableParallelism()) to decide how many cluster workers to fork, and os.EOL or
   os.tmpdir() for cross-platform code."

-----------------------------------------------------
Key Points
-----------------------------------------------------
1. os.platform()   -> 'win32', 'linux', 'darwin'.
2. os.cpus()       -> array of CPU core info; os.availableParallelism() (Node 18.14+).
3. os.totalmem() / os.freemem() -> bytes.
4. os.hostname(), os.uptime() (seconds), os.homedir(), os.tmpdir().
5. os.networkInterfaces() -> IP addresses.
6. os.EOL -> '\r\n' on Windows, '\n' on POSIX.
7. os.loadavg() -> 1/5/15 min load average (always [0,0,0] on Windows).

-----------------------------------------------------
Example
-----------------------------------------------------
const os = require('os');

console.log('Platform:', os.platform(), os.arch());
console.log('CPU cores:', os.cpus().length);
console.log('Free mem MB:', Math.round(os.freemem() / 1024 / 1024));
console.log('Total mem MB:', Math.round(os.totalmem() / 1024 / 1024));
console.log('Uptime (h):', (os.uptime() / 3600).toFixed(1));
console.log('Temp dir:', os.tmpdir());

// Health endpoint data
const health = { host: os.hostname(), load: os.loadavg(), pid: process.pid };
console.log(health);

-----------------------------------------------------
Important Notes
-----------------------------------------------------
- os.freemem() is memory of the whole machine, not your process. For your process use
  process.memoryUsage() (rss, heapUsed, heapTotal).
- Inside Docker, os.cpus() may report host cores, not the container CPU limit;
  os.availableParallelism() is a better hint, but still check container limits.

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Cluster / worker pool sizing, health check endpoints, logging machine info,
  writing temp files, OS-specific behavior.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: os.freemem() vs process.memoryUsage()?
A1: freemem is free RAM of the whole system; memoryUsage is memory used by the current Node process.

Q2: How do you decide the number of cluster workers?
A2: Usually one per CPU core: os.availableParallelism() or os.cpus().length.
*/
