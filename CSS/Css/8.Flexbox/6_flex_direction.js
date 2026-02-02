/* 
6. Flex Direction in Flexbox

Definition:
- The `flex-direction` property specifies the **direction of the main axis** along which flex items are laid out.
- It determines how flex items are stacked inside the flex container.

Values:
- row (default)       // left → right
- row-reverse         // right → left
- column              // top → bottom
- column-reverse      // bottom → top

// Example: different flex directions
<style>
  .container-row {
    display: flex;
    flex-direction: row;       // items in a row (horizontal)
    gap: 10px;
    padding: 20px;
    background: #eee;
  }

  .container-column {
    display: flex;
    flex-direction: column;    // items in a column (vertical)
    gap: 10px;
    padding: 20px;
    background: #ddd;
    height: 200px;
  }

  .item {
    width: 50px;
    height: 50px;
    background: lightblue;
  }
</style>

<div class="container-row">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>

<div class="container-column">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>

// Key Points:
// - flex-direction sets the main axis orientation
// - row/row-reverse → horizontal layout
// - column/column-reverse → vertical layout
*/
