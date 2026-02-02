/* 
1. CSS Position Property:

Definition:
- The `position` property specifies **how an element is positioned** in a document.
- It works with `top`, `right`, `bottom`, and `left` properties to move elements.

Values:

1. **static** (default)
  // - Normal flow of the document.
  // - `top`, `right`, `bottom`, `left` have no effect.

2. **relative**
  // - Element is positioned relative to its **normal position**.
  // - Leaves space in the document for its original location.
  // - Can use `top`, `right`, `bottom`, `left` to shift.

3. **absolute**
  // - Element is positioned relative to its **nearest positioned ancestor** (not static).
  // - Removed from normal flow, does not affect other elements.

4. **fixed**
  // - Element is positioned relative to the **viewport**.
  // - Stays fixed when scrolling.
  // - Removed from normal flow.

5. **sticky**
  // - Element is **relative until a scroll threshold**, then becomes fixed.
  // - Combines relative and fixed behavior.

Example:

<style>
  .static-box {
    position: static;
    border: 2px solid black;
  }

  .relative-box {
    position: relative;
    top: 20px;
    left: 20px;
    border: 2px solid blue;
  }

  .absolute-box {
    position: absolute;
    top: 50px;
    left: 50px;
    border: 2px solid red;
  }

  .fixed-box {
    position: fixed;
    top: 10px;
    right: 10px;
    border: 2px solid green;
  }

  .sticky-box {
    position: sticky;
    top: 0;
    border: 2px solid orange;
  }
</style>

<div class="static-box">Static</div>
<div class="relative-box">Relative</div>
<div class="absolute-box">Absolute</div>
<div class="fixed-box">Fixed</div>
<div class="sticky-box">Sticky</div>

// Key Points:
// - `static` → default, normal flow.
// - `relative` → moves relative to original spot.
// - `absolute` → positioned relative to nearest positioned ancestor.
// - `fixed` → stays on screen during scroll.
// - `sticky` → behaves relative until threshold, then fixed.
*/
