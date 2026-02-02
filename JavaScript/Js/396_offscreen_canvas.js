/* 396_offscreen_canvas.js

=====================================================
OffscreenCanvas in JavaScript
=====================================================

Definition (What I should say in the interview):
- "OffscreenCanvas is a JavaScript API that allows canvas rendering to be performed 
   **off the main thread**, typically inside Web Workers. This helps improve performance 
   by preventing heavy rendering tasks from blocking the UI thread. You can draw graphics, 
   run WebGL/WebGPU rendering, or manipulate image data in the background and then 
   transfer the result back to the main canvas."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Can be used with **2D context** (`getContext('2d')`) or **WebGL/WebGPU** context.
2. Runs rendering off the main thread to avoid UI freezes.
3. Can transfer rendered results to an on-screen canvas using `transferToImageBitmap()`.
4. Useful for complex graphics, animations, or processing large images.
5. Integrates with **Web Workers** for background rendering tasks.

-----------------------------------------------------
Basic Example (2D Context)
-----------------------------------------------------
const offscreen = new OffscreenCanvas(500, 500);
const ctx = offscreen.getContext("2d");

ctx.fillStyle = "red";
ctx.fillRect(0, 0, 500, 500);

// Transfer result to main canvas
const bitmap = offscreen.transferToImageBitmap();
const mainCanvas = document.querySelector("canvas");
const mainCtx = mainCanvas.getContext("2d");
mainCtx.drawImage(bitmap, 0, 0);

-----------------------------------------------------
Using OffscreenCanvas in a Worker
-----------------------------------------------------
// main.js
const worker = new Worker("worker.js");
const canvas = document.querySelector("canvas");
const offscreen = canvas.transferControlToOffscreen();
worker.postMessage({ canvas: offscreen }, [offscreen]);

// worker.js
self.onmessage = function(e) {
  const canvas = e.data.canvas;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, 300, 300);
};

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Background rendering for games or interactive graphics.
- Image and video processing without blocking the UI.
- Running WebGL/WebGPU computations in a worker thread.
- Generating charts or animations off the main thread for smoother performance.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. OffscreenCanvas is **not supported in all browsers**, so feature detection is important.
2. Cannot directly interact with DOM; must transfer results back to a visible canvas.
3. Works best with **Web Workers** for off-main-thread execution.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of OffscreenCanvas like **a sketchpad in another room**:
  - Artists (workers) draw on it without disturbing the main room (UI thread).
  - When done, they send the finished sketch to the main room for display.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the main benefit of OffscreenCanvas?  
A1: It allows rendering to happen off the main thread, improving performance and preventing UI blocking.

Q2: Can OffscreenCanvas be used with WebGL?  
A2: Yes, you can create WebGL contexts on OffscreenCanvas for GPU-based rendering.

Q3: How do you transfer the rendered content to the main canvas?  
A3: Use `transferToImageBitmap()` or `postMessage` with `OffscreenCanvas` when using workers.

Q4: Is OffscreenCanvas supported in all browsers?  
A4: No, support is limited, so feature detection or fallbacks are recommended.
*/
