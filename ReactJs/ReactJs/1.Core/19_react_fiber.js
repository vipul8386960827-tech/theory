/* 19_react_fiber.js */
/*
React Fiber – Interview-Ready Answer:

"React Fiber is the reimplementation of React’s core rendering engine, introduced in React 16.  
Its main purpose is to improve the rendering performance of complex applications by making 
React capable of incremental rendering and better handling of high-priority updates.

Key Concepts:

1️⃣ Why Fiber Exists:
- Before Fiber, React used a stack-based reconciliation algorithm, which was synchronous.  
  This meant large component trees could block the main thread, causing lag in UI updates.
- Fiber allows React to split rendering work into chunks and prioritize updates based on urgency.

2️⃣ How Fiber Works:
- React represents each element as a **Fiber node** internally.
- Each Fiber node contains information about the component type, props, state, and child nodes.
- React schedules work using these fibers, allowing:
  - **Interruptible rendering**: React can pause low-priority updates (like offscreen updates) 
    and resume later.
  - **Prioritized updates**: User interactions like clicks or typing get higher priority over 
    background tasks.
  - **Concurrency**: Multiple updates can be processed without blocking the main thread.

3️⃣ Real-life Analogies:

- Global Analogy:
  Fiber is like a multi-tasking worker who handles urgent tasks first and comes back to 
  less urgent tasks later, instead of doing everything in one go.

- India-specific Analogy:
  Think of traffic police managing a busy intersection: emergency vehicles (high-priority) 
  pass first, normal traffic waits; no vehicle is stuck indefinitely.

- Web Analogy:
  In React, when you type in an input field while a large list is rendering:
  - Without Fiber: typing may lag because rendering blocks the main thread.
  - With Fiber: React prioritizes the typing update, renders it first, then continues 
    rendering the list.

4️⃣ Key Points:

- Fiber improves **responsiveness** of React apps.
- Supports **time-slicing**: breaks rendering into chunks over multiple frames.
- Works hand-in-hand with **Concurrent Mode** in React.
- Enables React to **pause, resume, and abort work** to optimize performance.

5️⃣ Possible Follow-Up Questions & Answers:

Q1: Is Fiber a new API?  
A1: No, Fiber is an internal architecture change; APIs like setState or hooks remain the same.

Q2: What problems did Fiber solve?  
A2: Large UI tree blocking, unprioritized updates, poor responsiveness in complex apps.

Q3: How does Fiber differ from the old stack reconciler?  
A3: Fiber is incremental and prioritized; the old reconciler was synchronous and could block.

Q4: What is time-slicing?  
A4: Breaking rendering work into small chunks and spreading it over multiple frames to 
   maintain UI responsiveness.

Q5: Does Fiber make React faster?  
A5: It improves responsiveness and prioritization; raw computation speed may not change.

6️⃣ Coding Analogy:

function LargeList({ items }) {
    const [filter, setFilter] = React.useState("");
    const filteredItems = items.filter(item => item.includes(filter));
    return (
        <div>
            <input 
                value={filter} 
                onChange={e => setFilter(e.target.value)} 
                placeholder="Type to filter"
            />
            <ul>
                {filteredItems.map(item => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

// With Fiber: typing in the input feels responsive even if the list is very large, 
// because React prioritizes the input update over the background rendering of the list.
*/
