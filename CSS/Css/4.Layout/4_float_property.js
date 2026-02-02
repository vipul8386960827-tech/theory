/* 
4. Float Property in CSS:

Definition:
- The `float` property is used to **place an element to the left or right** of its container, 
allowing other content to wrap around it.

Values:
1. **left** → element floats to the left.
2. **right** → element floats to the right.
3. **none** → default, element does not float.
4. **inherit** → element inherits float value from parent.

Example:

<style>
  .image {
    float: left;          // float image to the left
    width: 100px;
    height: 100px;
    margin: 10px;
    background-color: lightblue;
  }
</style>

<div>
  <div class="image"></div>
  <p>This text will wrap around the floated element. Float allows inline content to flow beside the element rather than starting on a new line.</p>
</div>

Clear Float:
- Use `clear: left | right | both` on an element to prevent it from wrapping around floated elements.
- Example: <div style="clear: both;"></div>

// Key Points:
// - Float is commonly used for images or layouts before Flexbox/Grid.
// - Floated elements are removed from normal flow, so parent containers may collapse unless cleared.
*/
