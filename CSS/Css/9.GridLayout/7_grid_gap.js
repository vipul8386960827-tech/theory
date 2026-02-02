/* 
7. Grid Gap

Definition:
- The `gap` property in CSS Grid sets the **spacing between rows and columns**.
- It is a shorthand for `row-gap` and `column-gap`.

Syntax:
- gap: <row-gap> <column-gap>;
- You can also use: row-gap and column-gap separately

// Example: using grid gap
<style>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr); // 3 equal columns
    grid-template-rows: 100px 100px 100px; // 3 rows
    gap: 15px 20px;                        // 15px row gap, 20px column gap
    padding: 10px;
    background: #eee;
  }

  .grid-item {
    background: #673ab7;
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
  <div class="grid-item">8</div>
  <div class="grid-item">9</div>
</div>

// Key Points:
// - gap is cleaner than using margins for spacing
// - works for both rows and columns in grid
// - can use different values for row-gap and column-gap
*/
