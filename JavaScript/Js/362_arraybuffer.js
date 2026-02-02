/* 362_arraybuffer.js

=====================================================
ArrayBuffer in JavaScript
=====================================================

Definition (What I should say in the interview):
- "ArrayBuffer is a **low-level, fixed-length binary data buffer** in JavaScript. 
   It is used to represent raw memory that can be read and written using **typed arrays** 
   or **DataView**. ArrayBuffer is essential for working with binary data, such as 
   network protocols, file streams, multimedia processing, and WebGL/WebGPU buffers."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Represents **raw binary data** in a fixed-length memory block.
2. Cannot be read or written directly; must use **typed arrays** (e.g., Int8Array, Float32Array) or **DataView**.
3. Supports **slicing** to create views on a portion of the buffer.
4. Useful in performance-critical operations and binary data manipulation.
5. Can be **shared** among multiple typed arrays or views.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const buffer = new ArrayBuffer(16); // 16 bytes

// Create a typed array view
const int32View = new Int32Array(buffer);
int32View[0] = 42;
int32View[1] = 100;

console.log(int32View[0]); // 42
console.log(int32View[1]); // 100

// Using DataView for finer control
const dataView = new DataView(buffer);
dataView.setInt8(8, 127);
console.log(dataView.getInt8(8)); // 127

-----------------------------------------------------
Slicing ArrayBuffer
-----------------------------------------------------
const sliceBuffer = buffer.slice(0, 8); // creates a new ArrayBuffer of 8 bytes
console.log(sliceBuffer.byteLength);    // 8

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Storing binary data from network responses or files.
- Handling multimedia data (images, audio, video).
- WebGL and WebGPU buffers for graphics rendering.
- Interfacing with WebAssembly memory.
- Implementing custom binary protocols or serialization formats.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. ArrayBuffers have **fixed length**; you cannot resize them.
2. Use **typed arrays** or **DataView** to access or manipulate data.
3. Multiple views can share the same buffer for different interpretations of data.
4. ArrayBuffers are essential for **efficient memory usage** in performance-sensitive applications.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of ArrayBuffer as a **blank spreadsheet with fixed rows**:
  - Each row can hold data (via typed arrays or DataView).
  - You can view or edit the data in multiple ways, but the size of the spreadsheet is fixed.
  - Multiple views can interpret the same memory differently (e.g., numbers, bytes).

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between ArrayBuffer and TypedArray?  
A1: ArrayBuffer is raw memory, while TypedArray is a **view** that allows reading/writing with a specific type.

Q2: Can you resize an ArrayBuffer?  
A2: No, ArrayBuffers have a fixed length. To change size, create a new buffer and copy data.

Q3: What is DataView used for?  
A3: DataView provides **fine-grained control** to read/write multiple data types at arbitrary offsets.

Q4: How do ArrayBuffers relate to WebAssembly memory?  
A4: WebAssembly memory is represented as an ArrayBuffer, which JS can access using typed arrays or DataView.
*/
