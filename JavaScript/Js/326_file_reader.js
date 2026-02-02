/* 326_file_reader.js

=====================================================
FileReader in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "FileReader is a Web API that allows reading the contents of 
  files (from <input type='file'> or Blob objects) asynchronously 
  in different formats like text, data URL, or ArrayBuffer."

Key Points to Highlight:
- Purpose: Read user-selected files in the browser without uploading them to a server.
- Supports reading as:
  - readAsText(file) → text content
  - readAsDataURL(file) → base64-encoded string
  - readAsArrayBuffer(file) → binary data
  - readAsBinaryString(file) → deprecated
- Event-driven: onload, onerror, onprogress

Examples:

// Select file input
const input = document.querySelector('#fileInput');
input.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  // Read as text
  reader.onload = function() {
    console.log('File content:', reader.result);
  };

  reader.onerror = function() {
    console.error('Error reading file:', reader.error);
  };

  reader.readAsText(file);
});

Code Explanation:
- Create FileReader instance.
- Use appropriate read method based on required format.
- Use event handlers to process file after reading.

Real-Life Analogy:
- Like opening an envelope to read its content without sending it anywhere.

Example / Usage:

// Read image as Data URL for preview
const imageInput = document.querySelector('#imageInput');
imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const img = document.createElement('img');
    img.src = reader.result;
    document.body.appendChild(img);
  };
  reader.readAsDataURL(file);
});

Follow-Up Interview Questions:
- Q1: Difference between FileReader and fetch API?
  A1: FileReader reads local files selected by user; fetch requests data from server.
- Q2: Is FileReader synchronous or asynchronous?
  A2: Asynchronous; uses event handlers or Promises with newer APIs.
- Q3: Can FileReader read large files?
  A3: Yes, but may block memory; consider chunking or streams for very large files.
- Q4: Can FileReader modify file content?
  A4: No, it only reads content; modification requires writing a new Blob/File.
- Q5: Alternative to FileReader in modern browsers?
  A5: Use `Blob.text()`, `Blob.arrayBuffer()`, or streams API for async reading.
*/
