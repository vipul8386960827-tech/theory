/* 
2. Main Axis in Flexbox

Definition:
- In Flexbox, the **main axis** is the primary axis along which flex items are laid out.
- It depends on the `flex-direction` property.

flex-direction values and main axis:

1. row (default)
   // Main axis: horizontal (left → right)
2. row-reverse
   // Main axis: horizontal (right → left)
3. column
   // Main axis: vertical (top → bottom)
4. column-reverse
   // Main axis: vertical (bottom → top)

Main Properties Along Main Axis:
- justify-content
  // Aligns flex items along the main axis
  Values: flex-start, flex-end, center, space-between, space-around, space-evenly

Example:

<style>
.container {
  display: flex;
  flex-direction: row;         /* main axis horizontal
  justify-content: center;     /* center items horizontally
  gap: 10px;
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

// Key Points:
// - Main axis = direction of flex items
// - `justify-content` aligns items along main axis
// - Changing `flex-direction` changes main axis orientation
*/
