/* 
9. Grid Auto Flow

Definition:
- The `grid-auto-flow` property controls **how grid items are automatically placed** in a grid.
- Determines whether items fill rows first or columns first when not explicitly positioned.

Values:
- row (default): items are placed in rows first
- column: items are placed in columns first
- dense: fills empty spaces when items are smaller than available cells

// Example: automatic item placement
<style>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: 100px 100px;
    gap: 10px;
    grid-auto-flow: row;  // default, fills rows first
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
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
  <div class="grid-item">4</div>
  <div class="grid-item">5</div>
  <div class="grid-item">6</div>
  <div class="grid-item">7</div>
</div>

// Key Points:
// - row → fills rows first (left → right, then top → bottom)
// - column → fills columns first (top → bottom, then left → right)
// - dense → fills gaps efficiently
*/
