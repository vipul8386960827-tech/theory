/* 
2. Create Grid Container

Definition:
- A **grid container** is the parent element with `display: grid`.
- It defines the grid context for its child elements (grid items).

Key Properties for Grid Container:
- display: grid;                // enables grid layout
- grid-template-columns          // define columns
- grid-template-rows             // define rows
- gap                            // spacing between rows and columns
- justify-items                  // align items horizontally within their cells
- align-items                    // align items vertically within their cells
- grid-auto-flow                 // controls item placement in empty cells

// Example: simple 3x3 grid container
<style>
  .grid-container {
    display: grid; 
    grid-template-columns: repeat(3, 1fr); // 3 equal columns
    grid-template-rows: repeat(3, 100px);  // 3 rows with 100px height
    gap: 10px;
    background: #eee;
    padding: 10px;
  }

  .grid-item {
    background: #2196F3;
    color: white;
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
// - The container defines the grid structure
// - Grid items automatically occupy cells unless explicitly placed
// - Use gap for spacing instead of margin for cleaner layouts
*/
