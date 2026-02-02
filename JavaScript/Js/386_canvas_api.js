/* 386_canvas_api.js

=====================================================
Canvas API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "The Canvas API provides a way to **draw graphics, shapes, text, and images** directly 
   within the browser using the `<canvas>` element. It is widely used for creating dynamic 
   visual content such as games, data visualizations, animations, and interactive graphics."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Uses the `<canvas>` HTML element for rendering.
2. Supports **2D rendering context** (`CanvasRenderingContext2D`) for shapes, text, and images.
3. Supports **WebGL context** (`WebGLRenderingContext`) for 3D graphics.
4. Provides methods for **drawing lines, rectangles, arcs, text, images**, and more.
5. Allows **pixel-level manipulation** with `ImageData`.
6. Supports **animations** using `requestAnimationFrame`.
7. Can handle **event-driven interactivity** on the canvas element.

-----------------------------------------------------
Basic Example (2D Drawing)
-----------------------------------------------------
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Draw a rectangle
ctx.fillStyle = 'blue';
ctx.fillRect(50, 50, 150, 100);

// Draw a line
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(200, 150);
ctx.strokeStyle = 'red';
ctx.stroke();

// Draw text
ctx.font = '20px Arial';
ctx.fillStyle = 'green';
ctx.fillText('Hello Canvas', 60, 80);

-----------------------------------------------------
Using Images
-----------------------------------------------------
const image = new Image();
image.src = 'logo.png';
image.onload = () => {
  ctx.drawImage(image, 10, 10, 100, 100);
};

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Games and interactive applications.
- Data visualization (charts, graphs).
- Animations and visual effects.
- Image editing and manipulation.
- Custom UI components and dynamic graphics.
- WebGL-based 3D rendering.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Canvas is **pixel-based**, so scaling can affect quality.
2. WebGL context allows **GPU-accelerated 3D graphics**.
3. All drawing operations are **immediate**, so you may need to redraw on updates.
4. Can be combined with **event listeners** for interactive graphics.
5. Supports exporting drawings using `canvas.toDataURL()`.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of Canvas API as a **digital drawing board**:
  - You can draw shapes, paint images, and animate objects programmatically.
  - It gives full control over pixels, allowing both 2D and 3D graphics creation.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: What is the difference between 2D and WebGL contexts?  
A1: 2D is for flat graphics (shapes, text, images), WebGL allows GPU-accelerated 3D rendering.

Q2: How do you animate drawings on the canvas?  
A2: Using `requestAnimationFrame` and redrawing the scene each frame.

Q3: How do you manipulate individual pixels?  
A3: Using `getImageData` and `putImageData` methods.

Q4: Can you handle user interactions on the canvas?  
A4: Yes, by adding event listeners to the canvas element for mouse or touch events.
*/
