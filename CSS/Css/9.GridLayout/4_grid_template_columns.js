/* 
4. Grid Template Columns

Definition:
- `grid-template-columns` defines the **number and width of columns** in a grid container.
- Controls the horizontal layout of grid items.

Syntax:
- grid-template-columns: <size1> <size2> ...;
- Sizes can be: px, %, fr (fractional unit), auto, minmax()

// Example: defining columns
<style>
  .grid-container {
    display: grid;
    grid-template-columns: 100px 2fr 1fr;  // 3 columns: fixed, flexible, flexible
    grid-template-rows: 100px 100px;       // 2 rows for demonstration
    gap: 10px;
    padding: 10px;
    background: #eee;
  }

  .grid-item {
    background: #ff9800;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
  }
</style>

<div class="grid-container">
  <div class="grid-item">A</div>
  <div class="grid-item">B</div>
  <div class="grid-item">C</div>
  <div class="grid-item">D</div>
  <div class="grid-item">E</div>
  <div class="grid-item">F</div>
</div>

// Key Points:
// - fr unit allows proportional width distribution
// - auto adjusts to content size
// - minmax(min, max) allows responsive column sizing
*/
