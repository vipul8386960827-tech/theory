/* 
6. Display Property in CSS

Definition:
- The `display` property controls **how an element behaves in the layout** — 
   whether it starts on a new line, stays inline, becomes a flex container, grid, etc.

Common Values:
1. **block**
   // Starts on a new line
   // Takes full width available
   // You can set width/height
   Example: <div>, <p>, <section>

2. **inline**
   // Does NOT start on a new line
   // Only takes up content width
   // Cannot set width/height
   Example: <span>, <a>

3. **inline-block**
   // Behaves inline BUT allows width/height
   // Best of both worlds

4. **none**
   // Completely removes the element from layout
   // Not visible and takes no space

5. **flex**
   // Turns the element into a flex container

6. **grid**
   // Turns the element into a grid container

7. **inline-flex**
   // A flex container but inline

8. **inline-grid**
   // A grid container but inline

Small Example:

<style>
  .box1 {
    display: block;
    background: lightblue;
    margin-bottom: 10px;
  }

  .box2 {
    display: inline;
    background: pink;
  }

  .box3 {
    display: inline-block;
    width: 100px;
    height: 50px;
    background: lightgreen;
  }
</style>

<div class="box1">Block Element</div>
<span class="box2">Inline Element</span>
<div class="box3">Inline-block</div>

// Key Points:
// - block → full width + new line
// - inline → no new line + no width/height
// - inline-block → inline + width/height allowed
// - flex/grid → used for modern layouts
// - none → hide element completely
*/
