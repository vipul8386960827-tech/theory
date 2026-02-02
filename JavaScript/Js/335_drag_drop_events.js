/* 335_drag_drop_events.js

=====================================================
Drag and Drop Events in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Drag and drop events allow users to move elements within the browser by dragging 
  them with the mouse and dropping them on a target element."

Key Points to Highlight:
- Common drag-and-drop events:
  - dragstart → when drag begins
  - drag → while dragging
  - dragend → when drag ends
  - dragenter → when dragged item enters a drop target
  - dragover → while item is over drop target
  - dragleave → when item leaves drop target
  - drop → when item is dropped on target
- draggable attribute must be set on elements to make them draggable
- Must prevent default on dragover to allow drop

Examples:

// HTML: <div id="dragItem" draggable="true">Drag me</div>
// HTML: <div id="dropZone">Drop here</div>

const dragItem = document.getElementById('dragItem');
const dropZone = document.getElementById('dropZone');

dragItem.addEventListener('dragstart', (e) => {
  e.dataTransfer.setData('text/plain', 'This is a dragged item');
});

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault(); // Necessary to allow drop
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const data = e.dataTransfer.getData('text/plain');
  dropZone.textContent = data;
});

Code Explanation:
- dragstart sets the data to transfer
- dragover prevents default to allow dropping
- drop retrieves data and updates target content

Real-Life Analogy:
- Like moving a physical sticky note from one place to another on a board

Example / Usage:

// Highlight drop target
dropZone.addEventListener('dragenter', () => dropZone.style.backgroundColor = 'lightgreen');
dropZone.addEventListener('dragleave', () => dropZone.style.backgroundColor = '');

Follow-Up Interview Questions:
- Q1: What attribute makes an element draggable?
  A1: draggable="true"
- Q2: Why call preventDefault on dragover?
  A2: By default, drop is not allowed; preventDefault enables it.
- Q3: How to transfer complex data?
  A3: Use JSON.stringify on dragstart and parse on drop.
- Q4: Difference between drag and dragstart?
  A4: drag fires continuously while moving; dragstart fires once at beginning.
- Q5: Can touch devices use drag and drop?
  A5: Native drag/drop limited; use touch events or libraries for mobile support.
*/
