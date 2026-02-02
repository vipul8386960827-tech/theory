/* 
8. Flexbox Layout

Definition:
- Flexbox (Flexible Box Layout) is a modern CSS layout system used to 
  align, distribute, and space items inside a container — horizontally or vertically.
- It makes layout easier compared to floats, tables, or inline-block hacks.

How to enable Flexbox:
- Apply `display: flex` to a parent container.

Main Concepts:

1. Flex Container
   // The parent element with display: flex

2. Flex Items
   // All direct children of the flex container

Main Axes:
- Main Axis → depends on flex-direction (row or column)
- Cross Axis → perpendicular to main axis

Common Flexbox Properties:

For the Container:
1. display: flex
   // enables flexbox

2. flex-direction: row | row-reverse | column | column-reverse
   // sets the direction of items

3. justify-content: flex-start | center | flex-end | space-between | space-around | space-evenly
   // aligns items along the main axis (left/right or top/bottom)

4. align-items: flex-start | center | flex-end | stretch | baseline
   // aligns items along the cross axis

5. flex-wrap: nowrap | wrap | wrap-reverse
   // controls if items go to next line when space is insufficient

6. gap
   // adds space between items without margins

For the Items:
7. flex-grow
   // how much an item expands relative to others

8. flex-shrink
   // how much an item shrinks when space is limited

9. flex-basis
   // default size of an item

10. flex (shorthand)
   // flex: grow shrink basis;

11. align-self
   // override align-items for a specific item

Small Example:

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    background: #eee;
    gap: 10px;
  }

  .box {
    width: 50px;
    height: 50px;
    background: lightblue;
  }
</style>

<div class="container">
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>

// Key Points:
// - Flexbox is best for **1D layouts** (row OR column).
// - Grid is used for **2D layouts** (rows AND columns).
// - Makes alignment and spacing easy.
*/
