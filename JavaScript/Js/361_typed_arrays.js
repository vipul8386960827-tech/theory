/* 361_typed_arrays.js

=====================================================
Typed Arrays in JavaScript
=====================================================

Definition (What I should say in the interview):
- "Typed Arrays are **array-like objects** in JavaScript that provide a way to handle **binary 
   data efficiently**. They represent an array of a specific type (e.g., Int8, Uint16, Float32) 
   and are backed by an `ArrayBuffer`. Typed Arrays are useful for handling raw binary 
   data, WebGL/WebGPU buffers, and performance-critical operations where regular 
   JavaScript arrays are inefficient."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Typed Arrays include: `Int8Array`, `Uint8Array`, `Uint8ClampedArray`, `Int16Array`, 
   `Uint16Array`, `Int32Array`, `Uint32Array`, `Float32Array`, `Float64Array`, `BigInt64Array`, 
   `BigUint64Array`.
2. Backed by **ArrayBuffer**, a contiguous memory block.
3. Provide **fast numeric access** and avoid type coercion overhead.
4. Useful in Web APIs like WebGL, WebGPU, AudioBuffer, File APIs, and networking.
5. Support **subarray**, `set`, `slice`, and iteration with `for..of`.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const buffer = new ArrayBuffer(16); // 16 bytes
const int32View = new Int32Array(buffer);

int32View[0] = 42;
int32View[1] = 100;

console.log(int32View[0]); // 42
console.log(int32View[1]); // 100

// Sharing memory with another typed array
const uint8View = new Uint8Array(buffer);
console.log(uint8View[0]); // 42 (first byte of Int32 42)
console.log(uint8View[1]); // depends on endianness

-----------------------------------------------------
Creating Typed Arrays Directly
-----------------------------------------------------
const floatArray = new Float32Array([0.5, 1.5, 2.5]);
console.log(floatArray.length); // 3
console.log(floatArray[2]);     // 2.5

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Manipulating image pixel data.
- Storing vertex data for WebGL/WebGPU.
- Handling audio samples efficiently.
- Network protocols or binary file parsing.
- High-performance numeric computations.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Regular arrays are flexible but slower for numeric computations; Typed Arrays are faster.
2. All elements are initialized to `0` by default.
3. Typed Arrays **cannot change length**; they have fixed size based on the underlying buffer.
4. Can create **views** on the same ArrayBuffer to interpret data differently.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of a Typed Array as a **row of lockers**:
  - Each locker (element) is of the **same size/type**.
  - You can store and retrieve values efficiently.
  - Multiple views (like Uint8Array, Float32Array) can look at the same lockers differently.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why use Typed Arrays instead of regular arrays?  
A1: Typed Arrays provide **fixed-size, fast, numeric storage** with predictable memory layout, 
   which is essential for performance-critical operations.

Q2: Can Typed Arrays be resized?  
A2: No, their size is fixed. You can create a new Typed Array if a different size is needed.

Q3: What is the relationship between Typed Arrays and ArrayBuffer?  
A3: ArrayBuffer is the raw memory block, and Typed Arrays are views to read/write that memory.

Q4: Can you use Typed Arrays with Web APIs?  
A4: Yes, they are widely used in WebGL, WebGPU, Web Audio, and networking APIs for binary data.
*/
