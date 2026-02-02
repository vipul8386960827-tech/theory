/* 392_webgl_textures.js

=====================================================
WebGL Textures in JavaScript
=====================================================

Definition (What I should say in the interview):
- "Textures in WebGL are images or data that we can map onto 2D or 3D objects 
   to give them color, patterns, or more detail. They allow graphics to look 
   realistic or visually rich without increasing geometry complexity. Textures 
   are applied using fragment shaders, and WebGL provides methods to upload, 
   configure, and bind textures for rendering."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Textures can be images, videos, or generated data.
2. Applied in fragment shaders to define pixel color.
3. Support multiple texture units – can use several textures at once.
4. Configurable options include wrapping, filtering, and mipmapping.
5. Improves visual richness without adding more vertices.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
// Create a texture
const texture = gl.createTexture();

// Bind texture to target
gl.bindTexture(gl.TEXTURE_2D, texture);

// Upload image data
const image = new Image();
image.src = "texture.png";
image.onload = function() {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  // Set texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  // Use the texture in shaders
  gl.drawArrays(gl.TRIANGLES, 0, 6);
};

-----------------------------------------------------
How Textures Work
-----------------------------------------------------
1. **Create** – Use `gl.createTexture()` to initialize a texture object.
2. **Bind** – Bind the texture to a target using `gl.bindTexture()`.
3. **Upload data** – Load image/video data into GPU memory via `gl.texImage2D()`.
4. **Configure** – Set wrapping, filtering, and mipmapping options.
5. **Use in shader** – Pass texture to fragment shader as a sampler uniform.

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Applying surface detail in 3D models.
- Creating realistic lighting and material effects.
- Video textures or dynamic content on objects.
- Image-based effects like reflection, shadows, and bump mapping.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Textures must be power-of-two (POT) for certain features like mipmaps; otherwise, 
   limitations apply.
2. Always configure wrapping (`CLAMP_TO_EDGE`, `REPEAT`) and filtering (`LINEAR`, `NEAREST`).
3. WebGL has limited texture memory – managing multiple large textures requires care.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of a texture as a **sticker on a toy model**:
  - The toy’s shape is simple, but the sticker adds color and patterns.
  - You can change the sticker anytime without changing the shape of the toy.
  - Multiple stickers (textures) can be layered for richer effects.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How are textures applied in WebGL?  
A1: Textures are applied in fragment shaders using sampler uniforms, which map image data 
    to pixels on geometry.

Q2: What is the difference between power-of-two and non-power-of-two textures?  
A2: Power-of-two textures support mipmapping and certain wrapping modes, while 
    non-power-of-two textures have limitations on these features.

Q3: Can we use video as a texture in WebGL?  
A3: Yes, video frames can be uploaded to a texture and updated per frame to create 
    dynamic content.

Q4: What is mipmapping and why is it used?  
A4: Mipmapping is a technique where multiple pre-scaled versions of a texture are 
    stored to improve rendering performance and reduce artifacts when textures 
    appear smaller on screen.
*/
