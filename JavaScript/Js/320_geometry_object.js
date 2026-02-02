/* 320_geometry_object.js

=====================================================
Geometry Object in JavaScript (DOMRect/ClientRect) – Interview-Ready Answer
=====================================================

Definition:
- "Geometry objects represent the size and position of elements 
  on the page. They are returned by methods like getBoundingClientRect() 
  and provide properties like width, height, top, bottom, left, right."

Key Points to Highlight:
- Purpose: Retrieve element dimensions and position relative to the viewport.
- Common Methods that return Geometry Objects:
  - element.getBoundingClientRect()
- Properties of Geometry Object:
  - top → distance from viewport top
  - left → distance from viewport left
  - right → distance from viewport right
  - bottom → distance from viewport bottom
  - width → element width
  - height → element height

Examples:

const box = document.getElementById('box');
const rect = box.getBoundingClientRect();

console.log(rect.top);    // distance from top of viewport
console.log(rect.left);   // distance from left of viewport
console.log(rect.right);  // distance from left + width
console.log(rect.bottom); // distance from top + height
console.log(rect.width);  // width of element
console.log(rect.height); // height of element

Code Explanation:
- getBoundingClientRect() returns a DOMRect object.
- Properties give exact pixel values for positioning and sizing.
- Useful for collision detection, sticky elements, scrolling, and responsive layouts.

Real-Life Analogy:
- Like measuring a physical box: you get its width, height, and distance from walls.

Example / Usage:

// Detect if element is visible in viewport
function isVisible(el) {
  const rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

const boxEl = document.getElementById('box');
console.log(isVisible(boxEl)); // true or false

Follow-Up Interview Questions:
- Q1: Difference between offsetWidth/offsetHeight and getBoundingClientRect()?
  A1: offsetWidth/Height → layout size, integers only; getBoundingClientRect() → size and position relative to viewport, fractional pixels included.
- Q2: Can geometry object values be negative?
  A2: Yes, if element is partially off-screen.
- Q3: Does scrolling affect getBoundingClientRect()?
  A3: Yes, values are relative to current viewport.
- Q4: Can you modify the geometry object directly?
  A4: No, read-only. Use CSS to change element size/position.
- Q5: Is DOMRect compatible with all modern browsers?
  A5: Yes, widely supported. Older browsers may return ClientRect, similar but read-only integers.
*/
