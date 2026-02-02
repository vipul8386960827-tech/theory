/* 387_canvas_drawing.js

=====================================================
Canvas Drawing in JavaScript
=====================================================

Definition (What I should say in the interview):
- "Canvas drawing refers to the process of **rendering shapes, text, images, and paths** 
   on an HTML `<canvas>` element using the Canvas API. It allows developers to create 
   dynamic, interactive, and visually rich content directly in the browser."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Uses **CanvasRenderingContext2D** for 2D drawing operations.
2. Provides methods for **lines, rectangles, arcs, curves, and paths**.
3. Supports **text rendering** with `fillText` and `strokeText`.
4. Allows **image drawing** using `drawImage`.
5. Can perform **transformations** like translate, rotate, and scale.
6. Supports **color, gradients, and patterns** for fills and strokes.
7. Enables **animations** using `requestAnimationFrame`.

-----------------------------------------------------
Basic Example (Draw Shapes)
-----------------------------------------------------
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Draw a filled rectangle
ctx.fillStyle = 'blue';
ctx.fillRect(50, 50, 150, 100);

// Draw a stroked rectangle
ctx.strokeStyle = 'red';
ctx.lineWidth = 5;
ctx.strokeRect(60, 60, 130, 80);

// Draw a line
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(200, 150);
ctx.strokeStyle = 'green';
ctx.stroke();

// Draw a circle
ctx.beginPath();
ctx.arc(150, 150, 50, 0, Math.PI * 2);
ctx.fillStyle = 'yellow';
ctx.fill();
ctx.stroke();

-----------------------------------------------------
Drawing Text
-----------------------------------------------------
ctx.font = '24px Arial';
ctx.fillStyle = 'black';
ctx.fillText('Canvas Drawing', 50, 250);
ctx.strokeText('Canvas Drawing', 50, 280);

-----------------------------------------------------
Using Images
-----------------------------------------------------
const image = new Image();
image.src = 'logo.png';
image.onload = () => {
  ctx.drawImage(image, 10, 300, 100, 100);
};

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Creating 2D games and interactive graphics.
- Building charts, graphs, and data visualizations.
- Animations and dynamic UI effects.
- Custom drawing applications and editors.
- Image manipulation and pixel-level operations.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Canvas is **pixel-based**, so scaling can affect quality.
2. All drawing operations are **immediate**; you may need to redraw during updates.
3. Supports **path drawing** for complex shapes.
4. Can combine with **event listeners** for interactive experiences.
5. Canvas drawings can be exported using `toDataURL()` or `toBlob()`.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of Canvas drawing as a **digital artboard**:
  - You have brushes (methods), colors (fillStyle/strokeStyle), and tools (shapes, paths, images).
  - Everything you draw appears immediately on the canvas, allowing for dynamic graphics.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you draw basic shapes like rectangles and circles?  
A1: Using `fillRect`, `strokeRect`, and `arc` methods on the 2D context.

Q2: How can you render text on the canvas?  
A2: Using `fillText` or `strokeText` methods.

Q3: How do you draw images onto the canvas?  
A3: By creating an `Image` object and using `drawImage` after it loads.

Q4: How do you perform transformations like rotation or scaling?  
A4: Using `ctx.rotate()`, `ctx.scale()`, and `ctx.translate()` methods on the context.
*/
