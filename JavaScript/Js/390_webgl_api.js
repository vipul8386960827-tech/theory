/* 390_webgl_api.js

=====================================================
WebGL API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "WebGL is a JavaScript API that lets us render 2D and 3D graphics directly 
   inside the browser by using the computer’s GPU. It is based on OpenGL ES, 
   and it works within the HTML5 <canvas> element. 
   Because WebGL is a low-level API, we need to manage shaders, buffers, and 
   the rendering pipeline ourselves, which gives us very fine control. 
   In practice, developers often use higher-level libraries like Three.js 
   or Babylon.js on top of WebGL, since they make working with 3D graphics 
   much easier."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Cross-platform – Runs in all modern browsers without extra installations.
2. Hardware accelerated – Uses the GPU for high-performance rendering.
3. Low-level API – Developers must work with shaders, buffers, and GPU programs.
4. Integrated with HTML5 canvas – Rendering happens inside a <canvas> element.
5. Works with JavaScript – Easily connects with events, DOM, and browser APIs.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

// Check if WebGL is supported
if (!gl) {
  console.error("WebGL not supported!");
}

// Set the background color
gl.clearColor(0.0, 0.0, 0.0, 1.0); // Black background
gl.clear(gl.COLOR_BUFFER_BIT);

-----------------------------------------------------
How WebGL Works
-----------------------------------------------------
1. Initialize context – Get the "webgl" rendering context from a canvas.
2. Create shaders – Write vertex and fragment shaders using GLSL.
3. Create program – Compile shaders and link them into a GPU program.
4. Set up buffers – Send geometry (vertices, textures, colors) to the GPU.
5. Draw – Use gl.drawArrays() or gl.drawElements() to render shapes.

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- 3D browser-based games.
- Data visualization and scientific rendering.
- Virtual Reality (WebVR / WebXR).
- Simulations for physics, medical, or engineering.
- Interactive creative web experiences.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. WebGL is stateful – once something is set, it persists until changed.
2. Debugging is challenging – most errors happen in shader compilation.
3. High-level libraries simplify usage:
   - Three.js (most popular for 3D rendering).
   - Babylon.js.
   - PixiJS.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of WebGL as LEGO blocks:
  - You get very small pieces (shaders, buffers, attributes).
  - You need to assemble them carefully to build something big like a 3D world.
  - Libraries like Three.js are like LEGO kits with ready-made instructions.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between WebGL and Canvas 2D?  
A1: Canvas 2D is immediate-mode and good for simple 2D drawings. 
    WebGL is low-level, uses the GPU, and supports both 2D and 3D 
    with much better performance.

Q2: Why do we need GLSL in WebGL?  
A2: GLSL is the shader language that lets us run programs on the GPU. 
    With GLSL we can control how vertices and pixels are drawn, 
    which is essential for advanced graphics.

Q3: What libraries are commonly used with WebGL?  
A3: Three.js, Babylon.js, and PlayCanvas are popular high-level abstractions 
    built on WebGL.

Q4: Does WebGL work on all devices?  
A4: Yes, most modern browsers support WebGL, but performance depends 
    heavily on the GPU capabilities of the device.
*/
