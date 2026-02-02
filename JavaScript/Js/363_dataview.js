/* 363_dataview.js

=====================================================
DataView in JavaScript
=====================================================

Definition (What I should say in the interview):
- "DataView is a JavaScript object that provides a **low-level interface** to read and write 
   multiple types of data (integers, floats) from an **ArrayBuffer** at **arbitrary byte offsets**. 
   Unlike typed arrays, DataView allows control over **endianness** and works with mixed types 
   in the same buffer, making it ideal for binary file parsing, network protocols, and WebAssembly 
   memory manipulation."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Works on top of an **ArrayBuffer** to access binary data.
2. Supports reading and writing of multiple types:
   - `getInt8`, `getUint8`, `getInt16`, `getUint16`, `getInt32`, `getUint32`, `getFloat32`, `getFloat64`.
3. Allows specifying **byte offset** and **endianness**.
4. Useful when a buffer contains **mixed data types**.
5. Does not allocate memory; just a view on an existing ArrayBuffer.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const buffer = new ArrayBuffer(16);
const view = new DataView(buffer);

// Write values
view.setInt8(0, 127);
view.setInt16(1, 32000, true); // little-endian
view.setFloat32(4, 3.14, false); // big-endian

// Read values
console.log(view.getInt8(0));      // 127
console.log(view.getInt16(1, true));  // 32000
console.log(view.getFloat32(4, false)); // 3.14

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Parsing binary file formats like images, audio, or custom protocols.
- Working with network packets where data types and offsets vary.
- Accessing WebAssembly memory in a flexible way.
- Performing cross-platform data serialization/deserialization.
- Handling low-level system or IoT data in JavaScript.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. DataView allows **fine-grained control** over binary data in ArrayBuffer.
2. TypedArrays are simpler but assume **uniform type**; DataView handles mixed types.
3. Endianness (little vs big) is crucial when exchanging data between different systems.
4. DataView does **not allocate new memory**, it only provides a view on existing buffer.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of DataView as a **reading magnifier** on a raw memory sheet:
  - The ArrayBuffer is the memory sheet.
  - DataView lets you read/write numbers of different sizes at exact positions.
  - You can interpret the same memory in multiple ways without changing it.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between TypedArray and DataView?  
A1: TypedArray provides a view for **uniform data type**, while DataView allows **mixed types** and **endianness control**.

Q2: Can you read/write at arbitrary offsets with DataView?  
A2: Yes, you can specify the byte offset for each get/set operation.

Q3: Why is endianness important in DataView?  
A3: Different systems may represent multi-byte numbers differently (little-endian vs big-endian), so specifying ensures correct interpretation.

Q4: How does DataView relate to ArrayBuffer?  
A4: DataView is a **view** over an ArrayBuffer, giving flexible access to its raw binary data.
*/
