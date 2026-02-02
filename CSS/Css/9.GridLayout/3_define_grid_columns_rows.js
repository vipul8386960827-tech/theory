/* 
3. Define Grid Columns & Rows

Definition:
- `grid-template-columns` and `grid-template-rows` define the **number and size of columns and rows** in a grid container.
- They control the overall **structure of the grid**.

Syntax:
- grid-template-columns: <size1> <size2> ...;
- grid-template-rows: <size1> <size2> ...;
- Sizes can be: px, %, fr (fractional unit), auto, minmax()

// Example: defining a grid with columns and rows
<style>
  .grid-container {
    display: grid;
    grid-template-columns: 100px 200px 1fr;  // 3 columns: fixed, fixed, flexible
    grid-template-rows: 80px auto 100px;     // 3 rows: fixed, auto, fixed
    gap: 10px;
    padding: 10px;
    background: #eee;
  }

  .grid-item {
    background: #ff5722;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
  }
</style>

<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
  <div class="grid-item">4</div>
  <div class="grid-item">5</div>
  <div class="grid-item">6</div>
</div>

// Key Points:
// - fr unit allows flexible allocation of remaining space
// - auto adjusts size according to content
// - minmax(min, max) provides responsive control
*/
