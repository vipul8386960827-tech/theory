/* 
5. Centering an Element Horizontally in CSS:

There are several ways to horizontally center elements depending on the type (block or inline) and layout method.

1. **Using margin: auto (for block elements with fixed width)**

Example:

<style>
  div {
    width: 300px;        // fixed width required
    margin: 0 auto;      // top-bottom: 0, left-right: auto
    border: 2px solid black;
    text-align: center;  // centers text inside the div
  }
</style>

<div>Horizontally Centered Block</div>

Explanation:
- `margin-left` and `margin-right` auto distributes space equally on both sides, centering the element.

2. **Using Flexbox (modern approach)**

Example:

<style>
  .container {
    display: flex;
    justify-content: center; // centers child elements horizontally
  }
</style>

<div class="container">
  <div>Centered with Flexbox</div>
</div>

3. **Using Text Alignment (for inline or inline-block elements)**

Example:

<style>
  .container {
    text-align: center; // centers inline/inline-block elements
  }
  span {
    display: inline-block;
  }
</style>

<div class="container">
  <span>Centered Inline Element</span>
</div>

// Key Points:
// - `margin: 0 auto` → works for block elements with fixed width.
// - Flexbox → versatile, works for multiple elements.
// - Text-align → works for inline or inline-block elements inside a container.
*/
