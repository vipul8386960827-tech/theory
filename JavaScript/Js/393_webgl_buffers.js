/* 393_webgl_buffers.js

=====================================================
WebGL Buffers in JavaScript
=====================================================

Definition (What I should say in the interview):
- "Buffers in WebGL are memory storage objects on the GPU used to hold data 
   like vertex positions, colors, normals, and texture coordinates. 
   They allow the GPU to efficiently access and process geometry data 
   during rendering. Buffers are essential because WebGL is low-level and 
   the GPU needs data in a structured format to draw shapes and 3D scenes."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Store vertex data, indices, colors, normals, texture coordinates, or custom attributes.
2. Stored in GPU memory for high-performance rendering.
3. Requires creation, binding, and uploading data (`createBuffer`, `bindBuffer`, `bufferData`).
4. Supports different buffer types:
   - `ARRAY_BUFFER` – for vertex attributes.
   - `ELEMENT_ARRAY_BUFFER` – for indices of vertices.
5. Can be used with shaders by linking buffer data to shader attributes.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const vertices = new Float32Array([
  -0.5, -0.5,
   0.5, -0.5,
   0.0,  0.5
]);

// Create buffer
const vertexBuffer = gl.createBuffer();

// Bind buffer to ARRAY_BUFFER
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

// Upload data to GPU
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// Link buffer to shader attribute
const a_Position = gl.getAttribLocation(program, "a_Position");
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(a_Position);

// Draw triangle
gl.drawArrays(gl.TRIANGLES, 0, 3);

-----------------------------------------------------
How Buffers Work
-----------------------------------------------------
1. **Create** – Allocate a buffer object with `gl.createBuffer()`.
2. **Bind** – Bind it to a target using `gl.bindBuffer()`.
3. **Upload data** – Send data from CPU to GPU with `gl.bufferData()`.
4. **Link to shader** – Use `gl.vertexAttribPointer()` to connect buffer to shader attribute.
5. **Draw** – GPU uses buffer data to render shapes with `drawArrays` or `drawElements`.

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Storing geometry for 2D and 3D models.
- Passing per-vertex colors, normals, or texture coordinates to shaders.
- Indexing vertices for efficient rendering of complex meshes.
- Dynamic buffers for animations or simulations.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Always bind the correct buffer type (`ARRAY_BUFFER` or `ELEMENT_ARRAY_BUFFER`) before operations.
2. `bufferData` can have usage hints: `STATIC_DRAW`, `DYNAMIC_DRAW`, `STREAM_DRAW`.
3. Buffers are GPU resources – free them when no longer needed using `deleteBuffer`.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of buffers like **ingredients prepped for a chef**:
  - You chop and store vegetables in bowls (GPU memory).
  - When cooking (drawing), the chef (GPU) takes the ingredients efficiently 
    from the bowls without going back to the fridge (CPU) each time.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between ARRAY_BUFFER and ELEMENT_ARRAY_BUFFER?  
A1: `ARRAY_BUFFER` holds vertex attribute data, while `ELEMENT_ARRAY_BUFFER` holds 
    indices pointing to vertices for indexed drawing.

Q2: Why do we use Float32Array for vertex data?  
A2: WebGL expects typed arrays like Float32Array for performance and memory alignment 
    on the GPU.

Q3: What is the purpose of `vertexAttribPointer`?  
A3: It defines how data in a buffer maps to a shader attribute, including size, type, 
    normalization, stride, and offset.

Q4: What are the usage hints in `bufferData` (STATIC_DRAW, DYNAMIC_DRAW, STREAM_DRAW)?  
A4: They inform WebGL about expected buffer usage to optimize memory and performance:
    - STATIC_DRAW: data rarely changes
    - DYNAMIC_DRAW: data changes frequently
    - STREAM_DRAW: data changes every frame
*/
