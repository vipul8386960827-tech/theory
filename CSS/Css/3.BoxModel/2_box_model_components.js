/* 
2. Box Model Components in CSS:

Definition:
- The CSS box model defines how **space and boundaries** around an element are calculated.
- It consists of four main components: Content, Padding, Border, and Margin.

Components:

1. **Content**:
  // - The actual element content (text, images, etc.).
  // - Width and height properties define this area.

2. **Padding**:
  // - Space between content and border.
  // - Adds internal spacing inside the element.
  // - Transparent and included in element's visual size (unless box-sizing: border-box is used).

3. **Border**:
  // - Surrounds padding and content.
  // - Can have style, width, and color.
  // - Example: border: 2px solid black;

4. **Margin**:
  // - Space **outside the border**, separates the element from other elements.
  // - Transparent and does not affect content area.
  // - Example: margin: 15px;

Example:

<style>
  div {
    width: 150px;              // content width
    padding: 10px;             // inside spacing
    border: 5px solid black;   // border thickness
    margin: 20px;              // outside spacing
  }
</style>

<div>Box Model Components</div>

// Key Points:
// - Total width = content + padding + border + margin.
// - Total height = content height + padding + border + margin.
// - Understanding components helps in precise layout and spacing control.
*/
