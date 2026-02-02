/* 
3. Cross Axis in Flexbox

Definition:
- The cross axis in Flexbox is perpendicular to the main axis.
- It is used to align items in the opposite direction of the main axis.

How It Works:
- If main axis is horizontal (row), cross axis is vertical.
- If main axis is vertical (column), cross axis is horizontal.

Main Properties Along Cross Axis:
- align-items: Aligns all flex items along the cross axis (flex-start, flex-end, center, stretch, baseline)
- align-self: Aligns a single flex item along the cross axis (overrides align-items for that item)

// Example with cross axis alignment
<style>
  .container {
    display: flex;
    flex-direction: row;       /* main axis horizontal 
    align-items: center;       /* center items vertically (cross axis) 
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

Key Points:
- Cross axis is perpendicular to the main axis.
- Use align-items for all items, align-self for a single item.
*/
