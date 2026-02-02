/* 
4. Justify Content in Flexbox

Definition:
- The `justify-content` property in Flexbox is used to align flex items **along the main axis**.
- It controls how the remaining space is distributed between items.

Common Values:
- flex-start: items packed at the start of the main axis
- flex-end: items packed at the end of the main axis
- center: items centered along the main axis
- space-between: items evenly distributed; first item at start, last at end
- space-around: items evenly distributed with equal space around them
- space-evenly: items distributed with equal space between and around them

// Example: horizontal alignment using justify-content
<style>
  .container {
    display: flex;
    flex-direction: row;       /* main axis horizontal 
    justify-content: space-between; /* distribute items along main axis 
    height: 100px;
    background: #eee;
    padding: 20px;
  }

  .item {
    width: 50px;
    height: 50px;
    background: lightblue;
  }
</style>

<div class="container">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>

Key Points:
- `justify-content` only affects the **main axis**.
- For cross-axis alignment, use `align-items` or `align-self`.
*/
