/* 
6. Create Grid Areas

Definition:
- `grid-template-areas` allows you to **name areas of the grid** and place items accordingly.
- Makes complex layouts more readable and maintainable.

Syntax:
- grid-template-areas: 
    "area1 area2"
    "area3 area4";

// Example: defining grid areas
<style>
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 100px 100px;
    grid-template-areas:
      "header header"
      "sidebar main";
    gap: 10px;
    padding: 10px;
    background: #eee;
  }

  .header {
    grid-area: header;
    background: #3f51b5;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sidebar {
    grid-area: sidebar;
    background: #009688;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main {
    grid-area: main;
    background: #ff5722;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<div class="grid-container">
  <div class="header">Header</div>
  <div class="sidebar">Sidebar</div>
  <div class="main">Main</div>
</div>

// Key Points:
// - grid-template-areas uses strings to define layout
// - grid-area assigns an item to a named area
// - Useful for complex layouts like dashboards or web pages
*/
