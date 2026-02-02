/* 
1. CSS Box Model:

Definition:
- Every HTML element is considered a **box** in CSS.
- The box model describes the **structure of this box** and how space is calculated around content.

Components of the Box Model:

1. **Content**:
  // - The actual content of the element (text, image, etc.).
  // - Controlled by properties like width and height.

2. **Padding**:
  // - Space between content and border.
  // - Transparent, increases the element's size visually.
  // - Example: padding: 10px;

3. **Border**:
  // - Surrounds padding and content.
  // - Can have width, style, and color.
  // - Example: border: 2px solid black;

4. **Margin**:
  // - Space **outside the border**, separates element from others.
  // - Transparent, does not affect the element's content area.
  // - Example: margin: 20px;

Visual Representation:

// [ Margin ]
// [ Border ]
// [ Padding ]
// [ Content ]

Example:

<style>
  div {
    width: 200px;            // content width
    padding: 10px;           // space inside
    border: 5px solid black; // border thickness
    margin: 20px;            // space outside
  }
</style>

<div>Box Model Example</div>

// Key Points:
// - Total element size = content + padding + border + margin.
// - box-sizing property can alter how width/height is calculated (content-box vs border-box).
// - Understanding box model is crucial for layout and spacing.
*/
