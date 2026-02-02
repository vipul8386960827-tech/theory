/* 416_fs_module.js

=====================================================
FS (File System) Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `fs` module in Node.js provides **methods to interact with the file system**. 
   It allows reading, writing, updating, deleting, and watching files and directories 
   both synchronously and asynchronously. This module is essential for server-side file operations."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Supports both **synchronous and asynchronous operations**.
2. Can **read, write, append, delete, and rename files**.
3. Can **create, read, and remove directories**.
4. Provides **streams** for handling large files efficiently:
   - `fs.createReadStream()`, `fs.createWriteStream()`
5. Can **watch files and directories** for changes.
6. Works seamlessly with **Buffer** for binary data manipulation.
7. Part of Node.js **core modules**, no installation required.

-----------------------------------------------------
Basic Example (Reading and Writing Files)
-----------------------------------------------------
const fs = require('fs');

// Asynchronous read
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('File content:', data);
});

// Synchronous read
const dataSync = fs.readFileSync('example.txt', 'utf8');
console.log('Sync content:', dataSync);

// Writing to a file
fs.writeFile('output.txt', 'Hello Node.js!', (err) => {
  if (err) throw err;
  console.log('File written successfully');
});

-----------------------------------------------------
Using Streams
-----------------------------------------------------
const readStream = fs.createReadStream('largeFile.txt', { encoding: 'utf8' });
readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk);
});
readStream.on('end', () => {
  console.log('File reading completed');
});

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Reading and writing server-side configuration files.
- Handling file uploads and downloads.
- Logging and storing application data.
- Streaming large files like videos or logs.
- Watching files or directories for changes in real-time.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. **Prefer async methods** to avoid blocking the event loop.
2. Streams are more memory-efficient for large files than `readFile`.
3. Always handle errors to prevent crashes (`try/catch` or callback `err`).
4. `fs` works with both **strings and buffers**.
5. Supports **promises** via `fs.promises` API in modern Node.js versions.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of the `fs` module as a **file manager for your Node.js application**:
  - It allows your code to create, read, update, and manage files just like you would on your computer.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between synchronous and asynchronous fs methods?  
A1: Synchronous methods block the event loop until completion; asynchronous methods allow other code to run concurrently.

Q2: How can you read large files efficiently?  
A2: Using streams (`fs.createReadStream`).

Q3: How do you handle errors in fs operations?  
A3: Using callback error handling or `try/catch` with `fs.promises`.

Q4: What is `fs.promises`?  
A4: A Promise-based API of the fs module for using async/await syntax.

Q5: Can you watch a file or directory for changes?  
A5: Yes, using `fs.watch()` or `fs.watchFile()`.
*/
