/* 
4. Margin vs Padding in CSS:

Definition:
- Both margin and padding create **space around elements**, but in different ways.

1. **Margin**:
  // - Space **outside the element's border**.
  // - Separates element from other elements.
  // - Does not affect the element's content area.
  // - Example: margin: 20px;

2. **Padding**:
  // - Space **inside the element's border**, between content and border.
  // - Increases the element's visible size.
  // - Example: padding: 10px;

Visual Representation:
// [ Margin ] -> outside spacing
// [ Border ]
// [ Padding ] -> inside spacing
// [ Content ]

Example:

<style>
  div {
    width: 150px;
    height: 100px;
    padding: 20px;       // space inside
    border: 5px solid black;
    margin: 30px;        // space outside
    background-color: lightblue;
  }
</style>

<div>Margin vs Padding Example</div>

// Key Points:
// - Margin pushes elements away from each other.
// - Padding creates space **inside** the element, around the content.
// - Margins can collapse vertically, padding does not.
// - Use padding for inner spacing, margin for outer spacing.
*/
