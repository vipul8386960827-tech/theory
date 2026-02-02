/* 
8. Align Content in Flexbox

Definition:
- The `align-content` property aligns **multiple rows of flex items** along the cross axis when there is extra space in the container.
- It only works if **flex-wrap: wrap** and there is more than one row.

Values:
- flex-start: rows packed at start of cross axis
- flex-end: rows packed at end of cross axis
- center: rows centered along cross axis
- space-between: rows evenly distributed; first at start, last at end
- space-around: rows evenly distributed with equal space around
- space-evenly: rows distributed with equal space between and around
- stretch: rows stretch to fill container

// Example: multiple rows with align-content
<style>
  .container {
    display: flex;
    flex-wrap: wrap;           // allow multiple rows
    align-content: space-between;  // distribute rows along cross axis
    height: 200px;
    gap: 10px;
    background: #eee;
    padding: 10px;
  }

  .item {
    width: 60px;
    height: 50px;
    background: lightgreen;
  }
</style>

<div class="container">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>

// Key Points:
// - align-content affects **multiple rows** along cross axis
// - For single row, use align-items instead
// - Only works with flex-wrap: wrap
*/
