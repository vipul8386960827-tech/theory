/* 
6. Centering an Element Vertically in CSS:

There are several methods depending on layout type (absolute, flex, grid).

1. **Using Flexbox (recommended for modern layouts)**

Example:

<style>
  .container {
    display: flex;
    align-items: center;      // vertical centering
    justify-content: center;  // optional: horizontal centering
    height: 300px;
    border: 2px solid black;
  }
</style>

<div class="container">
  <div>Vertically Centered</div>
</div>

2. **Using Positioning and Transform**

Example:

<style>
  .parent {
    position: relative;
    height: 300px;
    border: 2px solid black;
  }
  .child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); // shift back by 50% of element's size
  }
</style>

<div class="parent">
  <div class="child">Centered Vertically & Horizontally</div>
</div>

3. **Using Grid Layout**

Example:

<style>
  .grid-container {
    display: grid;
    place-items: center; // centers both vertically and horizontally
    height: 300px;
    border: 2px solid black;
  }
</style>

<div class="grid-container">
  <div>Centered with Grid</div>
</div>

// Key Points:
// - Flexbox `align-items: center` → vertical centering of children.
// - Grid `place-items: center` → easy vertical & horizontal centering.
// - Absolute positioning + transform → precise centering for any element size.
*/
