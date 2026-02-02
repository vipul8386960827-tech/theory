/* 
5. Clear Floats in CSS:

Definition:
- When elements are floated, parent containers may **collapse** because floated elements are removed from normal flow.
- The `clear` property is used to **prevent elements from wrapping around floated elements**.

Values:
1. **left** → element moves below any left-floated elements.
2. **right** → element moves below any right-floated elements.
3. **both** → element moves below all floated elements.
4. **none** → default, element does not clear floats.

Example:

<style>
  .box-left {
    float: left;
    width: 100px;
    height: 100px;
    background-color: lightblue;
    margin: 10px;
  }

  .box-right {
    float: right;
    width: 100px;
    height: 100px;
    background-color: lightgreen;
    margin: 10px;
  }

  .clear-both {
    clear: both;
    background-color: lightgray;
    padding: 10px;
  }
</style>

<div class="box-left"></div>
<div class="box-right"></div>
<div class="clear-both">This div clears both floated boxes and appears below them.</div>

// Key Points:
// - Use `clear` to prevent wrapping around floated elements.
// - Commonly used with layouts and floated images.
// - `clear: both` is most used to ensure next element starts below all floats.
*/
