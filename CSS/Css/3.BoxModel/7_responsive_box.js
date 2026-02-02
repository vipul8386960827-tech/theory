/* 
7. Responsive Box in CSS:

Definition:
- A responsive box adjusts its size and layout automatically based on **screen size or container size**.
- Use **relative units**, **media queries**, or modern layout systems like **Flexbox/Grid**.

Methods:

1. **Using Percentage Width**

Example:

<style>
  .responsive-box {
    width: 50%;          // 50% of parent container
    padding: 20px;
    border: 2px solid black;
    box-sizing: border-box; // include padding & border in width
  }
</style>

<div class="responsive-box">Responsive Box</div>

2. **Using Viewport Units (vw, vh)**

Example:

<style>
  .viewport-box {
    width: 80vw;         // 80% of viewport width
    height: 30vh;        // 30% of viewport height
    border: 2px solid red;
  }
</style>

<div class="viewport-box">Viewport Responsive Box</div>

3. **Using Flexbox**

Example:

<style>
  .flex-container {
    display: flex;
    flex-wrap: wrap;     // wrap items on small screens
  }
  .flex-item {
    flex: 1 1 200px;     // grow, shrink, basis
    margin: 10px;
    border: 2px solid green;
  }
</style>

<div class="flex-container">
  <div class="flex-item">Item 1</div>
  <div class="flex-item">Item 2</div>
  <div class="flex-item">Item 3</div>
</div>

4. **Using Media Queries**

Example:

<style>
  .box {
    width: 400px;
    padding: 20px;
    border: 2px solid black;
  }

  @media (max-width: 600px) {
    .box {
      width: 100%;       // adapt to small screens
    }
  }
</style>

<div class="box">Responsive Box with Media Query</div>

// Key Points:
// - Use relative units (%, vw, vh) for responsive sizing.
// - Flexbox/Grid makes layout flexible and adaptive.
// - Media queries adjust styling based on screen width or device type.
*/
