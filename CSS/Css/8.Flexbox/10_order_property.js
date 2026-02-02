/* 
10. Order Property in Flexbox

Definition:
- The `order` property allows you to **change the visual order** of flex items **without changing the HTML structure**.
- Default order value is 0 for all items.

Syntax:
order: <integer>; // positive, negative, or zero

// Example: changing visual order
<style>
  .container {
    display: flex;
    gap: 10px;
    background: #eee;
    padding: 20px;
  }

  .item {
    width: 50px;
    height: 50px;
    background: lightblue;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item1 { order: 2; } // will appear last
  .item2 { order: 0; } // default
  .item3 { order: -1; } // will appear first
</style>

<div class="container">
  <div class="item item1">1</div>
  <div class="item item2">2</div>
  <div class="item item3">3</div>
</div>

// Key Points:
// - order changes visual placement without altering HTML
// - Negative values appear before items with 0 or positive order
// - Useful for responsive layouts where visual order may differ
*/
