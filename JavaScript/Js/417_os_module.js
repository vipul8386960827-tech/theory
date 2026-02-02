/* 417_os_module.js

=====================================================
OS Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `os` module in Node.js provides **operating system-related utility methods and properties**. 
   It allows developers to retrieve information about the system’s CPU, memory, network interfaces, 
   platform, and more, which is useful for building system-aware and efficient applications."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Provides **system information**:
   - `os.arch()` – CPU architecture.
   - `os.platform()` – Operating system platform.
   - `os.type()` – OS name.
   - `os.release()` – OS version.
2. Access **memory information**:
   - `os.totalmem()` – Total system memory.
   - `os.freemem()` – Free system memory.
3. Access **CPU information**:
   - `os.cpus()` – Array of CPU core info.
4. Network interfaces:
   - `os.networkInterfaces()` – Details about NICs.
5. Time-related info:
   - `os.uptime()` – System uptime in seconds.
6. File system temp directory:
   - `os.tmpdir()` – Path to temporary directory.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const os = require('os');

console.log('Platform:', os.platform());           // e.g., linux
console.log('Architecture:', os.arch());           // e.g., x64
console.log('CPU Cores:', os.cpus().length);
console.log('Total Memory:', os.totalmem());
console.log('Free Memory:', os.freemem());
console.log('Uptime (seconds):', os.uptime());
console.log('Temp Directory:', os.tmpdir());

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Monitoring system resources (CPU, memory) for server optimization.
- Writing cross-platform applications.
- Logging system info for debugging.
- Allocating resources based on available memory.
- Retrieving network or CPU details for performance tuning.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. `os` is a **core Node.js module**, no installation required.
2. Most methods are **synchronous** and lightweight.
3. Values can vary across different platforms and OS versions.
4. Useful in combination with **fs, process, and cluster** modules for system-aware applications.
5. Can be used in **DevOps or monitoring tools** for Node.js applications.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of the `os` module as a **system diagnostics tool**:
  - It provides insight into the machine your Node.js application is running on, so you can make informed decisions.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you get total and free memory in Node.js?  
A1: Using `os.totalmem()` and `os.freemem()`.

Q2: How can you find CPU information?  
A2: Using `os.cpus()` which returns an array of CPU cores with details.

Q3: How do you get the platform your Node.js app is running on?  
A3: Using `os.platform()`.

Q4: How can you find the system uptime?  
A4: Using `os.uptime()` which returns uptime in seconds.

Q5: How do you get the temporary directory path?  
A5: Using `os.tmpdir()`.
*/
