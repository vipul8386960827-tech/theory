/* 365_file_reader_api.js

=====================================================
FileReader API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "The FileReader API is a built-in browser API that allows JavaScript to **read the contents 
   of Blob or File objects asynchronously**. It provides methods to read data as text, 
   binary strings, ArrayBuffer, or Data URLs, enabling client-side file processing without 
   uploading to a server."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Asynchronous reading of **Blob** or **File** objects.
2. Supports multiple read methods:
   - `readAsText(blob)`: Reads data as text.
   - `readAsArrayBuffer(blob)`: Reads data as ArrayBuffer for binary processing.
   - `readAsDataURL(blob)`: Reads data as base64-encoded URL for images or media.
   - `readAsBinaryString(blob)`: Reads data as binary string (deprecated in modern browsers).
3. Provides **events** for progress, load, error, and abort.
4. Does not block the main thread during file reading.
5. Can handle large files efficiently with progress tracking.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
// HTML: <input type="file" id="fileInput">
const input = document.getElementById("fileInput");

input.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (event) => {
    console.log("File contents:", event.target.result);
  };

  reader.onerror = (error) => {
    console.error("Error reading file:", error);
  };

  reader.readAsText(file); // Read file as text
});

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Previewing uploaded images or documents before sending to server.
- Reading CSV, JSON, or text files client-side.
- Converting files to ArrayBuffer for WebAssembly or WebGL processing.
- Upload progress tracking by combining with slicing or streams.
- Client-side encryption, compression, or validation of files before upload.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. FileReader reads files **asynchronously**, so avoid blocking the UI.
2. Always handle errors using `onerror` to prevent silent failures.
3. Use `readAsArrayBuffer` for binary operations and `readAsDataURL` for image previews.
4. Avoid `readAsBinaryString` in modern applications; prefer ArrayBuffer or DataView.
5. FileReader events include `loadstart`, `progress`, `load`, `loadend`, `error`, `abort`.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of FileReader as a **scanner**:
  - The file is placed on the scanner (File/Blob).
  - The scanner reads it asynchronously.
  - You get the scanned content in the format you want (text, binary, image URL).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can FileReader read files synchronously?  
A1: No, FileReader is asynchronous to avoid blocking the main thread.

Q2: How do you read binary files with FileReader?  
A2: Use `readAsArrayBuffer(blob)` and process with typed arrays or DataView.

Q3: Can FileReader track file reading progress?  
A3: Yes, by listening to the `progress` event.

Q4: How is FileReader used with images?  
A4: Use `readAsDataURL(blob)` to get a base64-encoded string suitable for `img.src`.
*/
