/* 
10. Responsive Grid Layout

Definition:
- A responsive grid layout adapts to different screen sizes using CSS Grid features like `fr`, `auto-fit`, `auto-fill`, and media queries.
- Allows flexible and dynamic layouts without changing HTML structure.

Techniques:
- Use `fr` units for flexible column widths
- Use `minmax()` for minimum and maximum size constraints
- Use `auto-fit` or `auto-fill` with `repeat()` to automatically fill available space

// Example: responsive grid layout
<style>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); // responsive columns
    gap: 10px;
    padding: 10px;
    background: #eee;
  }

  .grid-item {
    background: #673ab7;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    height: 100px;
  }

  @media (max-width: 500px) {
    .grid-item {
      font-size: 14px;
    }
  }
</style>

<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
  <div class="grid-item">4</div>
  <div class="grid-item">5</div>
  <div class="grid-item">6</div>
</div>

// Key Points:
// - repeat(auto-fit, minmax()) makes grid responsive
// - fr units adapt to available space
// - media queries can adjust item styles for small screens
*/
