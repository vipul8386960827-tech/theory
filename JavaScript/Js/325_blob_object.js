/* 325_blob_object.js

=====================================================
Blob Object in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "A Blob (Binary Large Object) represents immutable raw data, 
  such as files, images, or binary content, which can be read as text, 
  ArrayBuffer, or URL. It is commonly used in file handling and uploads."

Key Points to Highlight:
- Purpose: Store and manipulate raw binary data in the browser.
- Blob can hold text, binary data, or mixed content.
- Often used with File API, URL.createObjectURL, and fetch API.
- Immutable: Once created, its data cannot be changed.
- Can specify MIME type with `{ type: 'mime/type' }`.

Examples:

// Create a simple text Blob
const textBlob = new Blob(['Hello World'], { type: 'text/plain' });
console.log(textBlob.size); // 11
console.log(textBlob.type); // text/plain

// Convert Blob to Object URL
const url = URL.createObjectURL(textBlob);
console.log(url); // blob:http://example.com/xxxx-xxxx

// Download Blob as file
const link = document.createElement('a');
link.href = url;
link.download = 'hello.txt';
link.click();

Code Explanation:
- Blob constructor takes array of data and optional options.
- `size` → bytes in blob
- `type` → MIME type
- Object URLs allow temporary access to Blob data.

Real-Life Analogy:
- Like a sealed package containing data, which can be sent, read, or downloaded.

Example / Usage:

// Fetch binary data as Blob
fetch('https://example.com/image.png')
  .then(res => res.blob())
  .then(imageBlob => {
    const imgURL = URL.createObjectURL(imageBlob);
    const img = document.createElement('img');
    img.src = imgURL;
    document.body.appendChild(img);
  });

Follow-Up Interview Questions:
- Q1: Difference between Blob and File?
  A1: File is a Blob with additional metadata (name, lastModified).
- Q2: How to read Blob as text?
  A2: Use FileReader.readAsText(blob) or blob.text().
- Q3: Can Blob be modified after creation?
  A3: No, it is immutable.
- Q4: How to convert Blob to ArrayBuffer?
  A4: Use blob.arrayBuffer() method.
- Q5: Why use Blob over plain strings for large data?
  A5: Efficient storage and handling of binary data, especially large files.
*/
