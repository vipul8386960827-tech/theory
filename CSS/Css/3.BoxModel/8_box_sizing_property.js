/* 
8. Box-Sizing Property in CSS:

Definition:
- The `box-sizing` property determines **how the width and height of an element are calculated**.
- It controls whether padding and border are included in the element's total size.

Values:

1. **content-box** (default)
  // - width and height apply only to the content.
  // - padding and border are added outside the content size.
  // - Total element size = content + padding + border.

Example:

<style>
  .content-box {
    width: 200px;
    padding: 20px;
    border: 5px solid black;
    box-sizing: content-box;
    background-color: lightblue;
  }
</style>

<div class="content-box">Content-box Example</div>

2. **border-box**
  // - width and height **include content + padding + border**.
  // - Makes layout easier because total size remains constant.
  // - Total element size = specified width/height.

Example:

<style>
  .border-box {
    width: 200px;
    padding: 20px;
    border: 5px solid black;
    box-sizing: border-box;
    background-color: lightgreen;
  }
</style>

<div class="border-box">Border-box Example</div>

// Key Points:
// - `content-box` → padding & border increase total element size.
// - `border-box` → total element size stays as defined, easier for responsive layouts.
// - Common practice: `* { box-sizing: border-box; }` to simplify sizing across all elements.
*/
