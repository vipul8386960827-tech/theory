/* 389_canvas_animation.js

=====================================================
Canvas Animation in JavaScript
=====================================================

Definition (What I should say in the interview):
- "Canvas animation in JavaScript refers to the process of **creating dynamic, moving graphics** 
   on an HTML `<canvas>` element using the Canvas API. Animations can be frame-based, time-based, 
   or event-driven, often using `requestAnimationFrame` for smooth and efficient rendering."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. Uses `<canvas>` element with **2D or WebGL contexts**.
2. Animations are typically done using **`requestAnimationFrame`** for smooth updates.
3. Supports **frame-by-frame drawing, transformations, and clearing** the canvas.
4. Can animate **shapes, images, text, and paths**.
5. Integrates with **user input events** for interactive animations.
6. Can combine **timing functions, velocities, and physics** for complex movements.
7. Supports **looping, easing, and chaining** animations.

-----------------------------------------------------
Basic Example (Simple 2D Animation)
-----------------------------------------------------
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let x = 0;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame
  ctx.fillStyle = 'blue';
  ctx.fillRect(x, 50, 50, 50); // Draw moving square
  x += 2; // Update position

  if (x < canvas.width) {
    requestAnimationFrame(animate); // Continue animation
  }
}

animate(); // Start animation

-----------------------------------------------------
Animating with Transformations
-----------------------------------------------------
let angle = 0;

function rotateAnimate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(angle);
  ctx.fillStyle = 'red';
  ctx.fillRect(-25, -25, 50, 50);
  ctx.restore();
  angle += 0.05;
  requestAnimationFrame(rotateAnimate);
}

rotateAnimate();

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Game development with moving sprites.
- Interactive charts and visualizations.
- Dynamic UI effects and transitions.
- Animating text, images, and custom graphics.
- Simulating physics, motion, or visual storytelling.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. `requestAnimationFrame` is preferred over `setInterval` for **smooth and efficient animations**.
2. Always **clear the canvas** before drawing the next frame to avoid trails.
3. Transformations like `rotate` or `scale` affect subsequent drawings.
4. Performance can be optimized by **limiting redraw regions**.
5. Canvas animations can be combined with **audio, user input, and WebGL** for rich experiences.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of canvas animation like a **flipbook**:
  - Each frame is drawn in sequence, and when updated rapidly, it creates the illusion of motion.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you create smooth animations on canvas?  
A1: Use `requestAnimationFrame` to update drawings at optimal frame rates.

Q2: How do you animate rotation or movement?  
A2: Update positions or angles each frame and redraw using transformations like `rotate` and `translate`.

Q3: Why clear the canvas before each frame?  
A3: To remove previous drawings and prevent trails or overlapping visuals.

Q4: Can you combine animations with user interactions?  
A4: Yes, by adding event listeners and updating animation variables based on user input.
*/
