/*
Virtual DOM in React – Detailed Explanation:

1️⃣ What is Virtual DOM?
- The Virtual DOM (VDOM) is a lightweight, in-memory representation of the real DOM.
- It is a JavaScript object tree that mirrors the structure of the real DOM.
- React maintains the VDOM to optimize updates and improve performance.

2️⃣ How it works – Step by Step:

Step 1: Initial Render
- When a React component renders for the first time, React creates a Virtual DOM tree from JSX.
- This tree represents the current UI state.

Step 2: State or Props Update
- When component state or props change, React generates a **new Virtual DOM tree** reflecting the updated UI.
- The old Virtual DOM tree is still available for comparison.

Step 3: Diffing Algorithm (Reconciliation)
- React compares the **new VDOM** with the **previous VDOM** using a diffing algorithm.
- It identifies the minimal set of changes needed.
- Only the nodes that changed are marked for update.

Step 4: Updating the Real DOM
- React batches the changes and updates only the affected parts of the real DOM.
- This avoids unnecessary re-rendering of unchanged elements, improving performance.

Step 5: Repeating the Cycle
- Every subsequent state/prop change triggers the same cycle:
  1. New VDOM creation
  2. Diffing with old VDOM
  3. Updating only the necessary parts of the real DOM

---

3️⃣ Real-life Analogies:

- **Global Analogy (Blueprint vs Building):**
  Instead of rebuilding the entire building for small changes, first update the blueprint (VDOM), then apply only the necessary changes to the actual building (DOM).

- **India-specific Analogy (Metro Train Seating Plan):**
  Updating the seating plan on paper first before moving actual passengers ensures minimal disruption.

- **Web Analogy:**
  A counter button:
    - Click triggers state update.
    - VDOM updates with the new count.
    - React diffs old vs new VDOM.
    - Only the number inside the button changes in the real DOM.

---

4️⃣ Key Points:

- Virtual DOM is **faster** because it minimizes direct DOM operations.
- React uses a **diffing algorithm** (reconciliation) to detect changes efficiently.
- **Keys** in lists help VDOM identify which elements have changed.
- Updates are **batched** to further reduce real DOM manipulation.
- VDOM works for class components, function components, and React.memo.

---

5️⃣ Possible Follow-Up Questions & Answers:

Q1: Why is Virtual DOM better than direct DOM manipulation?  
A1: Direct DOM updates are expensive; VDOM allows batching and minimal updates, improving performance.

Q2: How does React know which DOM elements to update?  
A2: Using the diffing algorithm comparing old and new VDOM trees; only changed nodes are updated.

Q3: Can Virtual DOM handle large applications efficiently?  
A3: Yes, the diffing algorithm and batching make React efficient even for complex UIs.

Q4: Are there cases where VDOM does not improve performance?  
A4: Heavy computations inside render or unnecessary state updates can still slow things down; VDOM optimizes only DOM updates.

Q5: Is VDOM a React-only concept?  
A5: VDOM is primarily a React concept, but other frameworks (like Vue) implement similar strategies.

---

6️⃣ Coding Example:

function Counter() {
    const [count, setCount] = React.useState(0);
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}

// Workflow when "Increment" is clicked:
// 1. setCount updates state.
// 2. React creates a new VDOM with updated count.
// 3. Diffing algorithm compares old vs new VDOM.
// 4. Only the <p> element's text is updated in the real DOM.
*/
