/* 388_canvas_transform.js

=====================================================
Canvas Transformations in JavaScript
=====================================================

Definition (What I should say in the interview):
- "Canvas transformations allow you to **modify the coordinate system** of the canvas 
   for drawing operations. This includes translating, rotating, scaling, and transforming 
   shapes and images dynamically to create complex visual effects and animations."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **translate(x, y)** – Moves the origin to a new location.
2. **rotate(angle)** – Rotates the canvas coordinate system by a given angle (in radians).
3. **scale(x, y)** – Scales the coordinate system horizontally and vertically.
4. **transform(a, b, c, d, e, f)** – Applies a custom 2D transformation matrix.
5. **setTransform(a, b, c, d, e, f)** – Resets the current transform and applies a new one.
6. Transformations **affect all subsequent drawing operations** until reset.
7. Use **save() and restore()** to temporarily apply transformations.

-----------------------------------------------------
Basic Example (Translation, Rotation, Scaling)
-----------------------------------------------------
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Save current state
ctx.save();

// Translate the origin
ctx.translate(100, 100);
ctx.fillStyle = 'blue';
ctx.fillRect(0, 0, 100, 50); // Draw rectangle at new origin

// Rotate 45 degrees
ctx.rotate((45 * Math.PI) / 180);
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, 100, 50); // Draw rotated rectangle

// Scale
ctx.scale(1.5, 0.5);
ctx.fillStyle = 'green';
ctx.fillRect(0, 0, 100, 50); // Draw scaled rectangle

// Restore original state
ctx.restore();

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Animating objects with rotation, scaling, or translation.
- Creating dynamic charts or visualizations.
- Implementing games with moving or rotating sprites.
- Simulating camera movements in 2D graphics.
- Applying transformations to images or text for effects.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Transformations **affect all subsequent drawings** until the context is restored.
2. `save()` and `restore()` help prevent permanent changes to the canvas state.
3. Rotation angles are in **radians**, not degrees.
4. Scaling and translation can be combined for complex visual effects.
5. Transformation matrices can be used for precise control over object placement.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of canvas transformations like **moving, rotating, or resizing a piece of paper**:
  - You can rotate the paper, stretch it, or shift its position, and then draw on it with the new orientation.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: How do you rotate an object on the canvas?  
A1: Use `ctx.rotate(angleInRadians)` before drawing the object.

Q2: How can you temporarily apply transformations?  
A2: Use `ctx.save()` before and `ctx.restore()` after the transformations.

Q3: How do you move the drawing origin?  
A3: Use `ctx.translate(x, y)` to shift the origin.

Q4: How do you scale drawings on the canvas?  
A4: Use `ctx.scale(scaleX, scaleY)` to stretch or shrink subsequent drawings.
*/
