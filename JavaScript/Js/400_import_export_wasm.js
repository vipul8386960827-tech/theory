/* 400_import_export_wasm.js

=====================================================
Importing and Exporting WebAssembly (Wasm) Functions in JavaScript
=====================================================

Definition (What I should say in the interview):
- "WebAssembly modules can **import functions, memory, or tables from JavaScript**, 
   and **export functions or memory** to JavaScript. This allows seamless integration 
   between WebAssembly and JavaScript so that computationally intensive code in Wasm 
   can interact with the browser environment, manipulate data, and return results 
   efficiently."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **Imports**: Provide JavaScript functions, objects, or memory to Wasm modules.
2. **Exports**: Expose WebAssembly functions or memory so JavaScript can call or access them.
3. Enables communication between JS and Wasm.
4. Allows passing data like numbers, arrays (via memory), or function callbacks.
5. Supports modular design: Wasm handles computation while JS handles UI and events.

-----------------------------------------------------
Basic Example (Imports)
-----------------------------------------------------
// JavaScript functions to import
const imports = {
  env: {
    log: (arg) => console.log("Wasm says:", arg)
  }
};

// Instantiate Wasm with imports
WebAssembly.instantiateStreaming(fetch("module.wasm"), imports)
  .then(result => {
    result.instance.exports.run(); // Wasm calls JS log function
  });

-----------------------------------------------------
Basic Example (Exports)
-----------------------------------------------------
// Wasm module exports a function `add`
// JavaScript calls the exported function
async function callWasmAdd() {
  const response = await fetch("module.wasm");
  const bytes = await response.arrayBuffer();
  const { instance } = await WebAssembly.instantiate(bytes);
  
  console.log(instance.exports.add(2, 3)); // Calls Wasm function
}

callWasmAdd();

-----------------------------------------------------
Passing Data Between JS and Wasm
-----------------------------------------------------
1. **Primitive Types** – Numbers and booleans can be passed directly via function calls.
2. **Arrays/Objects** – Stored in linear memory and accessed using memory offsets.
3. **Callbacks** – JS functions can be passed as imports to be called inside Wasm.
4. **Memory Sharing** – Multiple instances can share the same memory via `WebAssembly.Memory`.

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Performance-critical operations (math, physics, image processing) handled in Wasm.
- JS handles UI, DOM, and event logic.
- Games and simulations: JS for input/UI, Wasm for physics/rendering.
- Libraries written in C/C++/Rust exposed to JavaScript for reuse.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. WebAssembly can only import and export **numbers, memory, tables, and function references**.
2. Objects/strings need conversion via linear memory or helper functions.
3. Import/export design is crucial for efficient JS-Wasm communication.
4. Imports can also include environment variables or logging utilities.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of WebAssembly as a **worker in a factory**:
  - Imports are the tools and instructions JS gives the worker.
  - Exports are the finished products or results the worker gives back.
  - Together, JS and Wasm coordinate efficiently for complex tasks.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you pass a JavaScript function to WebAssembly?  
A1: Via the module's imports object during instantiation.

Q2: How do you access WebAssembly memory from JavaScript?  
A2: Use `instance.exports.memory` and create typed arrays like `new Uint8Array(memory.buffer)`.

Q3: Can you export multiple functions from Wasm?  
A3: Yes, any function declared as `export` in the Wasm module is accessible from JS.

Q4: How do you handle strings between JS and Wasm?  
A4: Convert strings to bytes in Wasm memory and use offsets/pointers to read/write them.
*/
