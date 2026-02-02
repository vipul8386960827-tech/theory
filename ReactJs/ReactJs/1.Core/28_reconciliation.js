/*
Reconciliation Steps in React – Interview-Ready Answer:

"Reconciliation is the process React uses to update the real DOM efficiently by comparing the 
new Virtual DOM with the previous one and applying the minimal set of changes."

Step-by-Step Process:

1️⃣ **Trigger Re-render**
- Any change in component state or props triggers a re-render.
- React generates a new Virtual DOM tree representing the updated UI.

2️⃣ **Create New Virtual DOM**
- React creates an in-memory representation of the new UI (VDOM).

3️⃣ **Diffing (Comparison)**
- React compares the new VDOM tree with the previous VDOM tree.
- The comparison follows these rules:
  a) **Elements of Different Types:** Replace the old element and its subtree entirely.
  b) **Elements of the Same Type:** Update only the changed props.
  c) **Lists of Elements:** Use the `key` prop to identify which items have changed, been added, or removed.
  d) **Text Nodes:** Compare text content; update only if it changed.

4️⃣ **Generate Patch / Update List**
- React calculates a minimal set of changes (patches) needed to update the real DOM.

5️⃣ **Apply Changes to Real DOM**
- Only the necessary DOM nodes are updated, inserted, or removed.
- React reuses existing nodes whenever possible.

6️⃣ **Commit Phase**
- The calculated changes are committed to the browser DOM.
- Lifecycle methods/hooks are invoked:
  - Class components: componentDidMount, componentDidUpdate, componentWillUnmount
  - Functional components: useEffect hooks run after DOM updates

7️⃣ **Fiber Enhancements (React 16+)**
- With React Fiber, the reconciliation is incremental and interruptible.
- High-priority updates (user input) are handled first.
- Low-priority updates (offscreen components) can be paused and resumed later.

8️⃣ **Render Completed**
- The UI in the browser now reflects the latest state with minimal DOM operations.

---

Real-life Analogies:

- Global Analogy: Editing Google Docs – only changed text is synced, not the whole document.
- India-specific Analogy: Railway timetable – only modified train timings are updated in the system.
- Web Analogy: Typing in a large list – only the changed input or new list items are updated.

---

Coding Example:

function TodoList({ todos }) {
    return (
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>{todo.text}</li>
            ))}
        </ul>
    );
}

// Step Illustration:
// 1. `todos` changes → re-render triggered
// 2. New VDOM tree created for <ul> and <li> elements
// 3. Diffing compares old and new VDOM
// 4. Minimal set of changes calculated (patch)
// 5. Apply changes: update only changed <li> items
// 6. Commit phase: DOM updated
// 7. Fiber schedules work if list is large
// 8. UI reflects latest todos efficiently

---

Possible Follow-Up Questions & Answers:

Q1: What is the role of the `key` prop in reconciliation?  
A1: Keys help React efficiently identify which items in a list have changed, preventing unnecessary re-renders.

Q2: What happens if keys are missing or not unique?  
A2: React uses index-based matching, which can lead to incorrect UI updates or loss of state in child components.

Q3: How does Fiber improve reconciliation?  
A3: Fiber allows incremental rendering, prioritization of updates, and interruptible work for smoother UI.

Q4: Is reconciliation synchronous or asynchronous?  
A4: Before Fiber: synchronous; With Fiber: can be asynchronous and interruptible.

Q5: Can reconciliation be optimized further?  
A5: Yes, using React.memo, PureComponent, and proper key assignment to reduce unnecessary updates.
*/
