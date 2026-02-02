/*  
===============================================================================
FRONTEND SYSTEM DESIGN — VIRTUALIZED LISTS (react-window)
(INTERVIEW-READY, EVERYTHING IN COMMENTS)
===============================================================================

##########################################
# DEFINITION
##########################################
- Virtualized lists render only the visible portion of a long list in the DOM.
- Components outside the viewport are not mounted, saving memory and improving performance.
- Common libraries: react-window, react-virtualized.

##########################################
# WHY USE VIRTUALIZED LISTS
##########################################
1. Performance Optimization
   - Large lists can have thousands of DOM nodes.
   - Rendering all nodes causes slow initial load and re-renders.
   - Virtualization reduces the number of rendered nodes drastically.

2. Memory Efficiency
   - Only visible items consume memory.
   - Prevents browser crashes for huge lists.

3. Smooth Scrolling
   - Maintains high frame rates even for large datasets.

##########################################
# HOW IT WORKS
##########################################
- Only items in the viewport (plus a small buffer) are rendered.
- As the user scrolls:
  - Old items are unmounted.
  - New items entering the viewport are mounted.
- Uses windowing technique (calculating visible window of items).

##########################################
# EXAMPLE WITH react-window
##########################################
import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }) => (
  <div style={style}>Item {index}</div>
);

const VirtualizedList = () => (
  <List
    height={500}          // height of the list viewport
    itemCount={10000}     // total items
    itemSize={35}         // height of each item
    width={300}           // width of the list
  >
    {Row}
  </List>
);

##########################################
# GOOD LINE FOR INTERVIEW
##########################################
- “Virtualized lists improve performance and memory usage by rendering only visible items. 
  Libraries like react-window provide windowing to handle huge lists efficiently.”

##########################################
# INTERVIEW TIPS
##########################################
- Mention fixed-size vs variable-size lists.
- Explain why not render all items in the DOM.
- Highlight smooth scrolling and performance improvements.

===============================================================================
END
===============================================================================
*/ 
