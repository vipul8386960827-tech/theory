/* 401_asyncify_wasm.js

=====================================================
Asyncify in WebAssembly (Wasm)
=====================================================

Definition (What I should say in the interview):
- "Asyncify is a technique or tool used with WebAssembly to **enable asynchronous operations** 
   within a WebAssembly module. Since WebAssembly is inherently synchronous and cannot 
   natively wait for JavaScript Promises, Asyncify rewrites the Wasm code to allow it to 
   **pause execution, wait for async tasks**, and then resume. This is particularly useful 
   when integrating WebAssembly with async JavaScript APIs like fetch or timers."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Allows WebAssembly functions to **call async JavaScript functions** and wait for results.
2. Transforms Wasm code to support **pausing and resuming execution**.
3. Used with Emscripten or other Wasm toolchains that support Asyncify.
4. Enables integration with **network requests, timers, or other async APIs**.
5. Avoids blocking the main thread while waiting for async operations.

-----------------------------------------------------
Basic Example (Emscripten)
-----------------------------------------------------
// C/C++ code
#include <emscripten/emscripten.h>
#include <stdio.h>

EMSCRIPTEN_KEEPALIVE
void fetch_data() {
    printf("Fetching data asynchronously...\n");
    // Asyncify allows waiting for JS fetch
}

// JavaScript: instantiate Wasm with Asyncify support
const wasmModule = await fetch("module_async.wasm").then(r => r.arrayBuffer());
const { instance } = await WebAssembly.instantiate(wasmModule, {
  env: {
    // JS async function that can be awaited by Wasm
    fetchData: async () => {
      const data = await fetch("data.json").then(res => res.json());
      return data.value;
    }
  }
});

instance.exports.fetch_data();

-----------------------------------------------------
How Asyncify Works
-----------------------------------------------------
1. **Transform Wasm code** – Using Asyncify, the compiler rewrites code to support saving/restoring state.
2. **Call async JS functions** – Wasm can now "await" Promises via Asyncify hooks.
3. **Pause execution** – Wasm suspends at async calls instead of blocking.
4. **Resume execution** – Once async operation resolves, Wasm continues execution seamlessly.

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Fetching data from network inside Wasm code.
- Integrating timers, animations, or I/O operations.
- Using JavaScript APIs that are asynchronous inside a synchronous Wasm module.
- Web applications that need both high performance and async interaction.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Asyncify introduces **slight overhead** due to saving/restoring execution state.
2. Only certain Wasm toolchains like Emscripten support Asyncify.
3. Wasm itself remains synchronous; Asyncify simulates async behavior.
4. Not all functions need Asyncify; only those interacting with async JS code.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of Asyncify like **pausing a movie**:
  - Wasm execution is the movie playing.
  - When an async JS call is needed, the movie pauses.
  - Once the data is ready, the movie resumes from the exact frame.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Why is Asyncify needed in WebAssembly?  
A1: Because WebAssembly is synchronous by default, Asyncify allows it to wait for JavaScript async operations without blocking the main thread.

Q2: How does Asyncify affect performance?  
A2: There is a small overhead due to saving and restoring the execution stack, but it enables async integration.

Q3: Which toolchains support Asyncify?  
A3: Emscripten is the most common toolchain that provides Asyncify support.

Q4: Can all Wasm functions use Asyncify?  
A4: Only functions that interact with asynchronous JavaScript need Asyncify. Purely computational functions do not require it.
*/
