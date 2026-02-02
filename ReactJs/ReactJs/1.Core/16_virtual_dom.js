/*
In React, the Virtual DOM (VDOM) is an in-memory representation of the real DOM.  
React uses it to optimize updates: when state or props change, React first updates the VDOM,  
then compares it with the previous version (diffing), and finally updates only the changed parts in the real DOM.  
This makes UI updates fast and efficient.

---

Real-life Examples:

- Global analogy (Blueprint vs Building):
  The Virtual DOM is like updating a blueprint first instead of rebuilding the entire building.  
  Only the changed parts are applied to the real building.

- India-specific analogy (Metro train seating plan):
  Updating a seating plan on paper (VDOM) before changing the actual seats ensures minimal disruption.

- Web analogy:
  When a button displaying a counter is clicked, React updates the VDOM first, calculates minimal changes,  
  and updates only the button text in the real DOM.

---

Possible Follow-Up Questions & Answers:

Q1: Why does React use Virtual DOM?  
A1: To improve performance by minimizing direct manipulations of the real DOM.

Q2: How does diffing work in Virtual DOM?  
A2: React compares the new VDOM with the previous one and updates only the parts that changed.

Q3: Can you directly manipulate the real DOM in React?  
A3: Yes, but it’s discouraged because it bypasses the VDOM optimizations.

Q4: Does Virtual DOM improve all performance aspects?  
A4: It mainly improves UI rendering; heavy computations or large arrays still need optimization.

Q5: Is Virtual DOM part of JavaScript or React?  
A5: It’s a concept implemented within React using JavaScript objects to represent DOM elements.

---

Coding Example:

function Counter() {
    const [count, setCount] = React.useState(0);
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}

// Clicking 'Increment':
// 1. Updates VDOM with new count.
// 2. React diffs old vs new VDOM.
// 3. Only <p> text updates in the real DOM.
*/
