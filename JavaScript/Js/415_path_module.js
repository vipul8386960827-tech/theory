/* 415_path_module.js

=====================================================
Path Module in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `path` module in Node.js provides **utilities to work with file and directory paths**. 
   It helps in **resolving, joining, normalizing, and extracting parts of file paths** 
   in a platform-independent way, making your file system operations reliable across Windows, macOS, and Linux."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Provides methods to **manipulate file paths**:
   - `path.join()` – Joins path segments.
   - `path.resolve()` – Resolves absolute path.
   - `path.basename()` – Returns file name.
   - `path.dirname()` – Returns directory name.
   - `path.extname()` – Returns file extension.
   - `path.parse()` – Returns an object with root, dir, base, name, ext.
2. Handles **platform-specific separators** automatically (`/` vs `\`).
3. Helps in **normalizing paths** using `path.normalize()`.
4. Supports **relative and absolute path calculations**.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const path = require('path');

// Joining paths
const fullPath = path.join('/users', 'kaizer', 'documents', 'file.txt');
console.log(fullPath); // /users/kaizer/documents/file.txt (Linux/macOS) or \users\kaizer\documents\file.txt (Windows)

// Resolving absolute path
const absPath = path.resolve('file.txt');
console.log(absPath); // Absolute path to file.txt in current directory

// Extracting parts
console.log(path.basename(fullPath)); // file.txt
console.log(path.dirname(fullPath));  // /users/kaizer/documents
console.log(path.extname(fullPath));  // .txt

// Parsing path
const parsed = path.parse(fullPath);
console.log(parsed);
/* {
  root: '/',
  dir: '/users/kaizer/documents',
  base: 'file.txt',
  ext: '.txt',
  name: 'file'
} 

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Constructing paths dynamically in Node.js applications.
- Extracting file names or extensions.
- Resolving relative paths to absolute paths.
- Ensuring cross-platform compatibility for file system operations.
- Working with configuration files, logs, and file storage.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Always use `path` instead of manually concatenating paths to avoid **platform issues**.
2. `path.join()` automatically handles **extra or missing slashes**.
3. `path.resolve()` converts relative paths to **absolute paths**.
4. `path` module is **synchronous** and lightweight.
5. Useful in combination with `fs` module for file operations.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of the `path` module as a **GPS system for files**:
  - It tells you exactly where the file is, how to get there, and lets you navigate directories safely.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you join multiple path segments in Node.js?  
A1: Using `path.join(segment1, segment2, ...)`.

Q2: How do you get the file extension from a path?  
A2: Using `path.extname(filePath)`.

Q3: Difference between `path.join()` and `path.resolve()`?  
A3: `join()` concatenates paths; `resolve()` computes absolute path based on current working directory.

Q4: How do you ensure cross-platform path compatibility?  
A4: By using the `path` module instead of manual string concatenation.

Q5: Can you parse a path into root, dir, base, name, and extension?  
A5: Yes, using `path.parse(filePath)`.
*/
