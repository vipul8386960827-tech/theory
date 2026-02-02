/* 399_instantiate_wasm.js

=====================================================
Instantiate WebAssembly (Wasm) in JavaScript
=====================================================

Definition (What I should say in the interview):
- "Instantiating WebAssembly means creating an **executable instance** of a compiled 
   WebAssembly module. The instance includes the module's **memory, tables, and exported functions**, 
   and can be used to interact with JavaScript. Instantiation can be done **synchronously** 
   with a compiled module or **asynchronously** while streaming a `.wasm` file. 
   This step connects the module to its environment and makes it ready for execution."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Creates an executable instance from a WebAssembly module.
2. Supports passing **imports** (JavaScript functions, memory, tables) to the module.
3. Provides access to **exported functions and memory** for interaction with JavaScript.
4. Can be done **synchronously** using `new WebAssembly.Instance(module, imports)`.
5. Can be done **asynchronously** using `WebAssembly.instantiate` or `WebAssembly.instantiateStreaming`.

-----------------------------------------------------
Basic Example (Async Instantiation)
-----------------------------------------------------
async function instantiateWasm() {
  const response = await fetch("module.wasm");
  const bytes = await response.arrayBuffer();
  const module = await WebAssembly.compile(bytes);

  const imports = {
    env: {
      log: console.log
    }
  };

  const instance = await WebAssembly.instantiate(module, imports);

  console.log(instance.exports); // Access exported functions
  instance.exports.add(2, 3); // Call exported function from Wasm
}

instantiateWasm();

-----------------------------------------------------
Optimized Example (Streaming Instantiation)
-----------------------------------------------------
WebAssembly.instantiateStreaming(fetch("module.wasm"), {
  env: { log: console.log }
}).then(result => {
  console.log(result.instance.exports);
  result.instance.exports.multiply(5, 4); // Example function call
});

-----------------------------------------------------
How Instantiation Works
-----------------------------------------------------
1. **Provide Module** – Use a compiled module or stream a `.wasm` file.
2. **Pass Imports** – Supply necessary JS functions, memory, or tables.
3. **Create Instance** – The module is instantiated into a runnable object.
4. **Access Exports** – Interact with exported functions and memory from JS.
5. **Execute Functions** – Call WebAssembly functions directly from JavaScript.

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Running compiled code from C/C++/Rust inside the browser.
- Offloading CPU-intensive tasks to WebAssembly.
- Games, graphics, and physics engines.
- Cryptography, compression, and other computational tasks.
- Using pre-existing libraries compiled to Wasm without rewriting in JS.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Synchronous instantiation can block the main thread for large modules.
2. `instantiateStreaming` is efficient because it compiles while downloading.
3. Imports are optional but necessary if the module expects external functions or memory.
4. Exported functions provide the interface for JavaScript to call Wasm code.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of instantiation like **turning a machine on after assembly**:
  - Compilation is building the machine.
  - Instantiation is connecting it to power (imports) and controls (JavaScript).
  - After this, the machine is fully operational and can be used.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between WebAssembly.compile and WebAssembly.instantiate?  
A1: `compile` converts `.wasm` binary to a module object but doesn't create an instance.  
   `instantiate` creates an executable instance with memory, tables, and exported functions.

Q2: Why use instantiateStreaming instead of instantiate?  
A2: It compiles and instantiates **while downloading**, which is faster and more efficient for large `.wasm` files.

Q3: Can WebAssembly instance access JavaScript objects?  
A3: Yes, through imports passed during instantiation.

Q4: Can multiple instances share memory?  
A4: Yes, by passing the same `WebAssembly.Memory` object in imports to multiple instances.
*/
