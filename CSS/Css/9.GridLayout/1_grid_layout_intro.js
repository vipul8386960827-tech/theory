/* 
1. Grid Layout Introduction

Definition:
- CSS Grid is a **2-dimensional layout system** that allows you to arrange elements in **rows and columns**.
- It provides precise control over both horizontal and vertical placement of items.

Key Concepts:
- Grid Container: The parent element with `display: grid`.
- Grid Items: Direct children of the grid container.

Basic Properties:
- display: grid;                  // activates grid layout
- grid-template-columns           // defines number and width of columns
- grid-template-rows              // defines number and height of rows
- gap                             // spacing between grid items
- grid-column / grid-row          // position individual items
- justify-items / align-items     // align items within their grid cell
- grid-template-areas             // for naming areas in complex layouts

// Example: simple 3x3 grid
<style>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); // 3 equal columns
    gap: 10px;
    padding: 20px;
    background: #eee;
  }

  .grid-item {
    background: lightgreen;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }
</style>

<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
  <div class="grid-item">4</div>
  <div class="grid-item">5</div>
  <div class="grid-item">6</div>
  <div class="grid-item">7</div>
  <div class="grid-item">8</div>
  <div class="grid-item">9</div>
</div>

// Key Points:
// - Grid is 2D: rows + columns
// - Perfect for dashboards, galleries, and complex layouts
// - Provides more control than flexbox for multi-dimensional layouts
*/
