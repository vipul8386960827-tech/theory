/* 391_webgl_shaders.js

=====================================================
WebGL Shaders in JavaScript
=====================================================

Definition (What I should say in the interview):
- "Shaders in WebGL are small programs that run on the GPU to control how graphics 
   are rendered. There are two main types: vertex shaders, which handle the position 
   of vertices, and fragment (or pixel) shaders, which handle the color of pixels. 
   Shaders are written in GLSL, the OpenGL Shading Language, and they give us 
   fine-grained control over the graphics pipeline, enabling advanced effects 
   like lighting, textures, and animations."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **Vertex Shader** – processes each vertex’s position and attributes, 
   transforming them into clip space.
2. **Fragment Shader** – calculates the color and other attributes for each pixel.
3. Written in **GLSL**, not JavaScript, but compiled and executed by the GPU.
4. Provides high-performance rendering because it runs on the GPU.
5. Allows custom effects like lighting, shadows, textures, and animations.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
// Vertex Shader
const vertexShaderSource = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
  }
`;

// Fragment Shader
const fragmentShaderSource = `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red color
  }
`;

// Compile shaders and attach to program
// (WebGL setup code is required to initialize WebGL context and program)

-----------------------------------------------------
How Shaders Work
-----------------------------------------------------
1. **Compile** – Vertex and fragment shaders are compiled from GLSL source code.
2. **Link** – Shaders are linked into a WebGL program.
3. **Use** – Program is set as active for drawing.
4. **Draw** – GPU executes the shaders for each vertex and pixel.
5. **Output** – Vertex shader outputs positions, fragment shader outputs colors.

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Coloring shapes and textures.
- Applying lighting and shadow effects.
- Creating animations and transitions.
- Rendering complex 3D scenes efficiently.
- Post-processing effects like blur, bloom, or edge detection.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Shaders must be compiled and linked correctly; otherwise, WebGL rendering fails.
2. Precision qualifiers (`highp`, `mediump`, `lowp`) are important for fragment shaders.
3. GPU execution is parallel, making shaders highly efficient for graphics tasks.
4. Errors are usually visible in console logs via `gl.getShaderInfoLog`.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of shaders as **workers in a factory**:
  - Vertex shader workers position each piece of material (vertex).
  - Fragment shader workers paint each pixel of the product.
  - Together they produce the final visual output efficiently in parallel.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between a vertex shader and a fragment shader?  
A1: Vertex shader handles the position and geometry of vertices, while fragment shader 
    handles the color and other per-pixel attributes.

Q2: Why are shaders written in GLSL and not JavaScript?  
A2: GLSL is compiled to run on the GPU, which is much faster for graphics computations 
    than CPU-side JavaScript.

Q3: Can shaders run independently of WebGL?  
A3: No, shaders need a WebGL context to compile, link, and execute on the GPU.

Q4: How can you debug shader errors?  
A4: Use `gl.getShaderInfoLog(shader)` and `gl.getProgramInfoLog(program)` 
    to check compilation and linking errors.
*/
