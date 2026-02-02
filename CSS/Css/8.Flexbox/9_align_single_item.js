/* 
9. Align Single Item in Flexbox

Definition:
- The `align-self` property allows **overriding the cross-axis alignment** for a single flex item.
- It only affects the specific item and does not change others.

Values:
- auto      // default, inherits from align-items
- flex-start
- flex-end
- center
- baseline
- stretch

// Example: align a single item differently
<style>
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;  // default alignment for all items
    height: 150px;
    gap: 10px;
    background: #eee;
    padding: 20px;
  }

  .item {
    width: 50px;
    height: 50px;
    background: lightblue;
  }

  .item-special {
    align-self: flex-end; // override cross-axis alignment
    background: coral;
  }
</style>

<div class="container">
  <div class="item"></div>
  <div class="item-special"></div>
  <div class="item"></div>
</div>

// Key Points:
// - align-self overrides align-items for a single item
// - Useful for special positioning of individual flex items
*/
