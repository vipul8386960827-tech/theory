/* 
5. Align Items in Flexbox

Definition:
- The `align-items` property aligns all flex items along the cross axis (perpendicular to the main axis).

Common Values:
- flex-start: items aligned at the start of cross axis
- flex-end: items aligned at the end of cross axis
- center: items centered along cross axis
- stretch: items stretch to fill the container
- baseline: items aligned along their text baseline

// Example: vertical alignment using align-items
<style>
  .container {
    display: flex;
    flex-direction: row;   // main axis horizontal
    align-items: center;   // center items vertically (cross axis)
    height: 150px;
    gap: 10px;
    background: #eee;
    padding: 20px;
  }

  .item {
    width: 50px;
    height: 50px;
    background: salmon;
  }
</style>

<div class="container">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>

// Key Points:
// - align-items affects all flex items in the container
// - For individual items, use align-self
*/
