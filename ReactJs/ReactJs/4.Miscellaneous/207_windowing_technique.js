/* 207_windowing_technique.js

=====================================
Windowing Technique in React
=====================================

Definition:
**Windowing** (or **virtualization**) is a performance optimization technique in React  
where only a **subset of a large list of items** is rendered in the DOM at a time,  
usually the items visible in the viewport. This improves performance for long lists.

-------------------------------------
Key Points:
-------------------------------------
1. Only render visible items + a small buffer for smooth scrolling.  
2. Reduces **DOM node count**, improving rendering and memory efficiency.  
3. Commonly used with libraries like **react-window** and **react-virtualized**.  
4. Essential for **infinite scroll** or **large tables/lists**.

-------------------------------------
Guidelines:
-------------------------------------
- Use windowing when lists exceed **hundreds or thousands of items**.  
- Keep **row heights consistent** if possible to simplify calculations.  
- Use virtualization libraries to handle **scrolling and dynamic heights** efficiently.  

-------------------------------------
Example:
-------------------------------------
import React from "react";
import { FixedSizeList as List } from "react-window";

const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);

function App() {
  return (
    <List
      height={300}         // viewport height
      itemCount={items.length}
      itemSize={35}        // row height
      width={300}
    >
      {({ index, style }) => (
        <div style={style}>{items[index]}</div>
      )}
    </List>
  );
}

-------------------------------------
Analogy:
-------------------------------------
Windowing is like **looking through a small window at a long train**:  
- You only see and process the carriages in your view,  
- Not the entire train at once, saving effort and time.

-------------------------------------
Follow-Up Interview Questions:
-------------------------------------
Q1: What problem does windowing solve?  
A1: Improves performance by limiting the number of DOM nodes for very large lists.  

Q2: Can windowing handle dynamic row heights?  
A2: Yes, libraries like `react-virtualized` support dynamic heights, but it’s more complex.  

Q3: How is windowing different from pagination?  
A3: Pagination loads items in chunks per page, while windowing dynamically renders visible items only.  

Q4: Is windowing compatible with infinite scroll?  
A4: Yes, windowing is often used with infinite scroll to efficiently render large datasets.  

*/
