/* 364_blob_file.js

=====================================================
Blob and File in JavaScript
=====================================================

Definition (What I should say in the interview):
- "A Blob (Binary Large Object) is an object representing **immutable raw data**, such as 
   text, images, or binary files. The File object is a **specialized Blob** that contains 
   metadata like name and last modified date. Blobs and Files are commonly used for **file 
   uploads, downloads, and in-memory data handling** in browsers."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **Blob**:
   - Can store binary data or text.
   - Immutable; content cannot be changed after creation.
   - Can be sliced into smaller parts using `slice()`.
   - Useful for creating object URLs or uploading data.
2. **File**:
   - Extends Blob.
   - Contains additional metadata: `name`, `lastModified`.
   - Represents files selected by users via `<input type="file">` or drag-and-drop.

-----------------------------------------------------
Basic Example (Blob)
-----------------------------------------------------
const blob = new Blob(["Hello World"], { type: "text/plain" });
console.log(blob.size); // 11
console.log(blob.type); // text/plain

// Create URL for download
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "hello.txt";
document.body.appendChild(a);
a.click();
URL.revokeObjectURL(url); // cleanup

-----------------------------------------------------
Basic Example (File)
-----------------------------------------------------
// Assuming <input type="file" id="fileInput">
const input = document.getElementById("fileInput");
input.addEventListener("change", (e) => {
  const file = e.target.files[0];
  console.log(file.name);         // example.txt
  console.log(file.size);         // file size in bytes
  console.log(file.type);         // MIME type
  console.log(file.lastModified); // timestamp
});

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Uploading files to servers via FormData or Fetch API.
- Reading file contents in the browser using FileReader.
- Creating downloadable files dynamically.
- Handling large data chunks efficiently.
- Integrating with Canvas, WebGL, or WebGPU for images or binary textures.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Blobs are immutable; to modify content, create a new Blob.
2. Files are read-only; you cannot change `name` or `lastModified`.
3. Use `URL.createObjectURL` to generate temporary URLs for blobs/files.
4. Clean up object URLs with `URL.revokeObjectURL` to avoid memory leaks.
5. Blobs can be sliced into smaller parts for streaming or partial uploads.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of a Blob as a **sealed envelope containing data**:
  - You can pass it around or use it, but you cannot change its contents.
  - A File is a **labeled envelope**, with metadata like the sender's name and date.
  - Both are useful for transporting or processing data without exposing the internal content directly.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between Blob and File?  
A1: File extends Blob and includes metadata like `name` and `lastModified`. Blob is just raw data.

Q2: How do you create a downloadable file from a Blob?  
A2: Use `URL.createObjectURL(blob)` to generate a temporary URL, then set it as an anchor `href` and call `click()`.

Q3: Can you modify the contents of a Blob?  
A3: No, Blobs are immutable; to modify, you must create a new Blob.

Q4: How can you read a File or Blob in the browser?  
A4: Use the FileReader API (`readAsText`, `readAsArrayBuffer`, `readAsDataURL`) to access the data.
*/
