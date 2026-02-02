/* 
5. Grid Template Rows

Definition:
- `grid-template-rows` defines the **number and height of rows** in a grid container.
- Controls the vertical layout of grid items.

Syntax:
- grid-template-rows: <size1> <size2> ...;
- Sizes can be: px, %, fr (fractional unit), auto, minmax()

// Example: defining rows
<style>
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;      // 3 equal columns
    grid-template-rows: 50px 100px 150px;    // 3 rows with different heights
    gap: 10px;
    padding: 10px;
    background: #eee;
  }

  .grid-item {
    background: #009688;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
  }
</style>

<div class="grid-container">
  <div class="grid-item">Row 1</div>
  <div class="grid-item">Row 1</div>
  <div class="grid-item">Row 1</div>

  <div class="grid-item">Row 2</div>
  <div class="grid-item">Row 2</div>
  <div class="grid-item">Row 2</div>

  <div class="grid-item">Row 3</div>
  <div class="grid-item">Row 3</div>
  <div class="grid-item">Row 3</div>
</div>

// Key Points:
// - fr unit distributes space proportionally
// - auto adapts to content height
// - minmax(min, max) provides flexible row sizing
*/
