/* 394_webgl_render.js

=====================================================
WebGL Rendering in JavaScript
=====================================================

Definition (What I should say in the interview):
- "Rendering in WebGL is the process of drawing graphics on the screen using the GPU. 
   It involves taking data from buffers, applying shaders, textures, and other attributes, 
   and executing drawing commands to produce pixels on the canvas. Rendering can be 
   done using `gl.drawArrays` for direct vertex drawing or `gl.drawElements` for indexed 
   drawing. The GPU handles these operations in parallel, making rendering efficient 
   for complex 2D and 3D scenes."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Converts vertex and fragment data into pixels on the canvas.
2. Uses GPU for parallel processing, allowing high-performance graphics.
3. Supports multiple drawing modes: `TRIANGLES`, `LINES`, `POINTS`, etc.
4. Works with shaders, buffers, and textures for complex effects.
5. Can be done continuously for animations or updated on-demand.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const canvas = document.querySelector("canvas");
const gl = canvas.getContext("webgl");

// Clear the canvas
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// Setup shaders, buffers, and attributes (assume program is already linked)
gl.useProgram(program);

// Draw using drawArrays
gl.drawArrays(gl.TRIANGLES, 0, 3); // Draws a single triangle

// Draw using drawElements (with index buffer)
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0); // Draws indexed geometry

-----------------------------------------------------
How Rendering Works
-----------------------------------------------------
1. **Clear** – Reset the canvas with `gl.clear()`.
2. **Use program** – Set active shader program with `gl.useProgram()`.
3. **Bind buffers** – Attach vertex and index buffers.
4. **Set attributes/uniforms** – Connect buffer data to shader attributes.
5. **Draw** – Issue drawing commands like `drawArrays` or `drawElements`.
6. **Output** – GPU computes and displays final pixels on the canvas.

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Rendering 2D and 3D shapes in the browser.
- Animations, games, and simulations.
- Applying textures, lighting, and post-processing effects.
- Real-time data visualizations with GPU acceleration.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Rendering modes (`TRIANGLES`, `LINES`, `POINTS`) affect how vertices are connected.
2. GPU executes in parallel – shaders determine final pixel colors.
3. Double buffering and clearing the canvas is important for smooth animations.
4. Properly manage resources: buffers, textures, and shaders for performance.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of rendering like **assembling a painting**:
  - Buffers provide the shapes and colors.
  - Shaders are the artist’s instructions for coloring and effects.
  - The GPU paints the canvas quickly and efficiently, producing the final image.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between drawArrays and drawElements?  
A1: `drawArrays` draws vertices in sequence directly, while `drawElements` uses an 
    index buffer to reuse vertices efficiently, reducing memory and increasing performance.

Q2: How does the GPU handle rendering?  
A2: The GPU processes vertices and fragments in parallel, applying shaders, textures, 
    and transformations to produce pixels on the canvas.

Q3: Why do we need to clear the canvas before rendering?  
A3: To remove previous frame data and avoid visual artifacts when rendering new frames.

Q4: Can WebGL rendering be hardware accelerated?  
A4: Yes, WebGL uses the GPU, which provides high-performance rendering compared to CPU-based drawing.
*/
