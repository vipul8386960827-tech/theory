/* 395_webgpu_api.js

=====================================================
WebGPU API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "WebGPU is a modern web graphics API that provides direct access to the GPU for high-performance 
   rendering and computation. Unlike WebGL, which is primarily for 3D graphics, WebGPU supports 
   general-purpose GPU programming, offering better performance, more flexibility, and modern 
   GPU features such as compute shaders, pipelines, and resource management. It is designed 
   to replace WebGL over time and is aligned with modern graphics APIs like Vulkan, Direct3D12, 
   and Metal."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Provides low-level, high-performance GPU access from the browser.
2. Supports **compute shaders**, **render pipelines**, and advanced graphics.
3. Works with modern GPU concepts like buffers, textures, samplers, and bind groups.
4. Designed for both **graphics rendering** and **general-purpose GPU computation (GPGPU)**.
5. More predictable performance and memory management compared to WebGL.
6. Aligns with modern graphics APIs (Vulkan, Metal, Direct3D12) for cross-platform consistency.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
async function initWebGPU() {
  if (!navigator.gpu) {
    console.log("WebGPU is not supported in this browser.");
    return;
  }

  // Request GPU adapter
  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter.requestDevice();

  // Create a GPU buffer
  const buffer = device.createBuffer({
    size: 4 * 4, // 4 floats
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });

  console.log("WebGPU initialized successfully", device, buffer);
}

initWebGPU();

-----------------------------------------------------
How WebGPU Works
-----------------------------------------------------
1. **Adapter & Device** – Request a GPU adapter and create a device to interact with the GPU.
2. **Buffers & Textures** – Allocate memory on the GPU for vertex data, indices, or images.
3. **Shaders** – Write GPU programs using WGSL (WebGPU Shading Language) for vertex/fragment/compute tasks.
4. **Pipeline** – Set up a render or compute pipeline connecting shaders, buffers, and textures.
5. **Commands & Queue** – Encode rendering or compute commands and submit them to the GPU queue.
6. **Rendering/Computation** – GPU executes commands in parallel for high efficiency.

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- High-performance 3D graphics in browsers.
- GPGPU tasks like physics simulations, AI computations, or image processing.
- Real-time data visualization and interactive applications.
- Next-gen games and VR/AR experiences in the browser.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. WebGPU is still experimental in some browsers; check support before use.
2. Uses WGSL (WebGPU Shading Language) for shaders instead of GLSL.
3. Requires explicit resource management (buffers, textures, pipelines).
4. Offers better performance, safety, and flexibility than WebGL for modern applications.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of WebGPU like **giving the chef direct access to all kitchen appliances**:
  - Unlike WebGL (where the chef has limited tools), WebGPU lets the chef control everything precisely.
  - The chef (GPU) can handle both cooking (rendering) and prep tasks (computation) efficiently.
  - You can schedule tasks, organize ingredients (buffers/textures), and get maximum performance.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How is WebGPU different from WebGL?  
A1: WebGPU provides modern GPU features, explicit memory management, compute shaders, 
    and better performance, while WebGL is primarily for graphics and uses older GPU paradigms.

Q2: What is WGSL?  
A2: WebGPU Shading Language (WGSL) is the shading language used in WebGPU for vertex, fragment, 
    and compute shaders.

Q3: Can WebGPU perform general-purpose computation?  
A3: Yes, WebGPU supports compute shaders, enabling GPU acceleration for non-graphics tasks.

Q4: Do all browsers support WebGPU?  
A4: No, WebGPU is currently experimental in many browsers, so feature detection is necessary.
*/
