/* 
10. Grid Layout

Definition:
CSS Grid is a 2D layout system that allows you to create layouts using rows AND columns simultaneously.
It gives full control over how elements are placed inside a grid container.

Basic Syntax:
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; // 3 equal columns
  grid-template-rows: auto auto;      // 2 rows
  gap: 10px;                          // space between items
}

Key Features:
// - Two-dimensional control (rows + columns)
// - Precise placement of items
// - Easy layout building (like tables but more powerful)
// - Responsive layouts with simple changes
// - Supports line numbers, named areas, and auto-placement

Common Properties:
1. display: grid;                     // activates CSS Grid
2. grid-template-columns             // defines number & width of columns
3. grid-template-rows                // defines number & height of rows
4. gap                                // space between grid items
5. grid-row, grid-column              // manual placement of items
6. grid-template-areas               // name areas for complex layouts
7. justify-items / align-items        // align items inside cells

Example:
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  gap: 10px;
}

.item { background: lightblue; }

Use Case Examples:
// - Full page layouts
// - Dashboards
// - Photo galleries
// - Complex card layouts
// - Header + Sidebar + Content + Footer structures

Grid = 2D system
Flexbox = 1D system
*/
