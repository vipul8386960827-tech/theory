/* 397_webassembly_api.js

=====================================================
WebAssembly (Wasm) API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "WebAssembly, often called Wasm, is a low-level, binary instruction format that runs 
   in modern browsers. It allows running code written in languages like C, C++, Rust, 
   and Go at near-native speed inside the browser. WebAssembly is designed for performance, 
   portability, and security, and can be used alongside JavaScript to offload 
   computationally intensive tasks."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **High performance** – Runs code at near-native speed using a compact binary format.
2. **Safe and sandboxed** – Executes in a secure environment inside the browser.
3. **Language interoperability** – Can be generated from multiple languages (C, C++, Rust, etc.).
4. **Integration with JavaScript** – WebAssembly modules can import/export functions and memory.
5. **Portable** – Runs on any browser or platform that supports Wasm.
6. **Deterministic memory model** – Uses linear memory that can be accessed and shared.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
// JavaScript: Load and run a WebAssembly module
const wasmCode = new Uint8Array([
  0x00,0x61,0x73,0x6D, /* ... binary WebAssembly code ...
]);
const wasmModule = await WebAssembly.compile(wasmCode);
const wasmInstance = await WebAssembly.instantiate(wasmModule, {});

console.log(wasmInstance.exports); // Access exported functions

-----------------------------------------------------
How WebAssembly Works
-----------------------------------------------------
1. **Compile** – Convert source code (C/C++/Rust) to WebAssembly binary (.wasm).
2. **Load** – Fetch and compile `.wasm` in the browser using `WebAssembly.compile` or `WebAssembly.instantiate`.
3. **Instantiate** – Create a WebAssembly instance with optional imports (JavaScript functions, memory).
4. **Execute** – Call exported WebAssembly functions from JavaScript.
5. **Memory Management** – Use linear memory for passing data between JS and Wasm efficiently.

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Performance-critical tasks: physics simulations, 3D graphics, video/image processing.
- Games and game engines in the browser.
- Cryptography and compression algorithms.
- Porting existing C/C++/Rust libraries to the web.
- Web-based scientific computations and machine learning.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. WebAssembly is **not a replacement for JavaScript**, but complements it.
2. Interaction between JS and Wasm may involve overhead for passing complex data.
3. Wasm modules are sandboxed, cannot directly access DOM; need JS bridge.
4. WebAssembly supports **multi-value returns** and **shared memory** (with threads in future specs).

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of WebAssembly like **a high-performance engine in a car**:
  - JavaScript is like the driver controlling UI and logic.
  - WebAssembly is the engine that executes heavy computations efficiently.
  - Together, they make the web application fast and responsive.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can WebAssembly interact with the DOM?  
A1: Not directly. You need to call JavaScript functions to interact with the DOM.

Q2: How does WebAssembly achieve near-native performance?  
A2: It uses a compact binary format optimized for execution by the browser’s virtual machine and runs in a sandboxed, low-level environment.

Q3: Which languages can compile to WebAssembly?  
A3: C, C++, Rust, Go, AssemblyScript, and others.

Q4: What is the difference between WebAssembly.compile and WebAssembly.instantiate?  
A4: `compile` compiles the module into WebAssembly bytecode but does not instantiate it, whereas `instantiate` both compiles and creates an executable instance with memory and exports.
*/
