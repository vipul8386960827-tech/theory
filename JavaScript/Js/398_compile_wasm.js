/* 398_compile_wasm.js

=====================================================
Compile WebAssembly (Wasm) in JavaScript
=====================================================

Definition (What I should say in the interview):
- "Compiling WebAssembly in JavaScript involves taking a `.wasm` binary module and 
   converting it into an executable WebAssembly module in the browser. This allows 
   JavaScript to interact with the module’s exported functions and memory. Compilation 
   can be done **synchronously** using `WebAssembly.Module` or **asynchronously** using 
   `WebAssembly.compile` or `WebAssembly.instantiateStreaming` for better performance, 
   especially with large `.wasm` files."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Converts `.wasm` binary code into an executable WebAssembly module.
2. Can be done **synchronously** or **asynchronously**.
3. Supports streaming compilation from a fetched `.wasm` file using `instantiateStreaming`.
4. Allows importing JavaScript functions or memory into the WebAssembly module.
5. Provides a handle to exported functions for interaction with JavaScript.

-----------------------------------------------------
Basic Example (Async Compilation)
-----------------------------------------------------
// Fetch and compile a WebAssembly module asynchronously
async function loadWasm() {
  const response = await fetch("module.wasm");
  const bytes = await response.arrayBuffer();
  const wasmModule = await WebAssembly.compile(bytes);
  const instance = await WebAssembly.instantiate(wasmModule, {
    env: { log: console.log }
  });
  console.log(instance.exports); // Access exported functions
}

loadWasm();

-----------------------------------------------------
Optimized Example (Streaming Compilation)
-----------------------------------------------------
const wasmModulePromise = WebAssembly.instantiateStreaming(
  fetch("module.wasm"),
  { env: { log: console.log } }
);

wasmModulePromise.then(result => {
  console.log(result.instance.exports);
});

-----------------------------------------------------
How Compilation Works
-----------------------------------------------------
1. **Fetch** – Load the `.wasm` binary code from server or local file.
2. **Compile** – Convert binary code into a WebAssembly.Module object.
3. **Instantiate** – Create an instance with memory, tables, and imported functions.
4. **Execute** – Call exported WebAssembly functions from JavaScript.
5. **Memory & Imports** – Use imports for passing data or logging results back to JS.

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Loading performance-critical code in web applications.
- Games, graphics, and physics engines in the browser.
- Cryptography, compression, or other CPU-intensive tasks.
- Interoperability with existing C/C++/Rust libraries.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. `instantiateStreaming` is preferred for large modules because it compiles while downloading.
2. Imports are required if the Wasm module expects external functions or memory.
3. Compilation can be CPU-intensive; asynchronous methods prevent blocking the main thread.
4. Exported functions provide the interface to JavaScript code.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of compiling Wasm like **assembling a machine from a blueprint**:
  - Fetching the `.wasm` file is like getting the blueprint.
  - Compilation is assembling parts so it can run.
  - Instantiation is turning it on and connecting it to JavaScript controls.
  - You can now use the machine (module) efficiently.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between WebAssembly.compile and WebAssembly.instantiate?  
A1: `compile` only compiles the module into a WebAssembly.Module object, while `instantiate` both compiles and creates an executable instance with memory and exports.

Q2: Why use instantiateStreaming?  
A2: It compiles the module **while downloading**, which reduces load time and improves performance for large `.wasm` files.

Q3: Can WebAssembly functions call JavaScript functions?  
A3: Yes, via imports passed during instantiation.

Q4: Is WebAssembly compilation synchronous or asynchronous?  
A4: Both options exist; synchronous with `new WebAssembly.Module(bytes)` and asynchronous with `WebAssembly.compile` or `WebAssembly.instantiateStreaming`.
*/
