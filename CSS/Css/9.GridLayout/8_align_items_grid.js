/* 
8. Align Items in Grid

Definition:
- `align-items` in CSS Grid aligns **all grid items along the block (vertical) axis** within their grid cells.
- Overrides the default stretching behavior if needed.

Values:
- start: align items to the top of the cell
- end: align items to the bottom of the cell
- center: align items vertically centered
- stretch (default): stretch items to fill the row

// Example: align items vertically in grid
<style>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 100px 100px;
    gap: 10px;
    align-items: center;  // center items vertically in each cell
    padding: 10px;
    background: #eee;
  }

  .grid-item {
    background: #e91e63;
    color: white;
    display: flex;
    justify-content: center;  // horizontal centering
    font-size: 18px;
    height: 60px;  // smaller than cell to see alignment
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
// - align-items affects all items vertically in their cells
// - individual items can override using align-self
*/
