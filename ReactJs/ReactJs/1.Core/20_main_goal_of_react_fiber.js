/* 20_main_goal_of_react_fiber.js */
/*
Main Goal of React Fiber – Interview-Ready Answer:

"The main goal of React Fiber is to make React applications more **responsive and efficient** 
by enabling incremental rendering, prioritized updates, and interruptible work.  

Before Fiber, React's rendering engine was synchronous: rendering a large component tree 
could block the main thread, causing input lag, slow animations, or frozen UI. Fiber 
rearchitected the reconciler so that React can pause, resume, and prioritize rendering work.

Key Points:

1️⃣ Incremental Rendering:
- React can break rendering work into small units (Fibers) and spread it over multiple frames.  
- This avoids blocking the browser’s main thread for long periods.

2️⃣ Prioritized Updates:
- High-priority updates like user interactions (typing, clicking) are processed before 
  low-priority updates (e.g., background data loading or animations).

3️⃣ Interruptible Work:
- Fiber allows React to pause ongoing work, handle urgent updates, and resume later without 
  losing progress.

4️⃣ Time-Slicing Support:
- Enables React to schedule work across multiple frames for smoother UI.

Real-life Analogies:

- Global Analogy: Multi-tasking worker prioritizes urgent tasks first and completes less urgent 
  tasks later.
- India-specific Analogy: Traffic police letting ambulances pass first while normal traffic waits.
- Web Analogy: Typing in an input feels responsive even if a large list is rendering in the background.

Follow-Up Questions & Answers:

Q1: Did Fiber change React's public API?  
A1: No, APIs like setState, hooks, and JSX remain the same; Fiber is an internal engine change.

Q2: How does Fiber improve app performance?  
A2: By allowing incremental rendering, prioritization, and interruptible updates, it improves 
   responsiveness and perceived performance.

Q3: Can Fiber make a slow component fast?  
A3: Fiber improves UI responsiveness, but heavy computations still need optimization.

Q4: Is Fiber required for Concurrent Mode?  
A4: Yes, Concurrent Mode relies on Fiber’s scheduling and time-slicing capabilities.

Q5: What is the difference between Fiber and the old reconciler?  
A5: Old reconciler was synchronous and blocking; Fiber is incremental, interruptible, and 
   prioritized.

Coding Analogy:

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

// With Fiber: typing in the input remains responsive even if the list is very large, because 
// React prioritizes the input update over background rendering work.
*/
