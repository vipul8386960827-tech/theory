/* 454_performance_mark.js

=====================================================
Performance Marks in JavaScript
=====================================================

Definition (What I should say in the interview):
- "Performance marks are part of the Performance API that allow developers to **create named timestamps** at specific points in code execution. 
   They help in measuring the duration of operations, monitoring performance, and profiling web applications efficiently."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **performance.mark(name)**
   - Creates a named timestamp in the browser's performance entry buffer.
   - `name` is a string identifying the mark.

2. **performance.measure(name, startMark, endMark)**
   - Measures the time between two marks.
   - `name` → Identifier for the measurement.
   - `startMark` and `endMark` → Names of previously created marks.

3. **Retrieving Performance Entries**
   - `performance.getEntriesByType('mark')` → Retrieves all marks.
   - `performance.getEntriesByType('measure')` → Retrieves all measures.
   - `performance.clearMarks(name)` / `performance.clearMeasures(name)` → Clears entries.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
performance.mark('startTask');

// Simulate code execution
for (let i = 0; i < 1e6; i++) {}

performance.mark('endTask');

performance.measure('taskDuration', 'startTask', 'endTask');

const measures = performance.getEntriesByType('measure');
measures.forEach(m => console.log(`${m.name}: ${m.duration}ms`));
// Logs: taskDuration: <duration>ms

// Clear marks and measures
performance.clearMarks('startTask');
performance.clearMarks('endTask');
performance.clearMeasures('taskDuration');

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Measuring execution time of specific code blocks or functions.
- Profiling performance in React or Next.js components.
- Tracking durations of animations or API calls.
- Analyzing long-running tasks in applications.
- Comparing performance before and after optimization changes.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. Marks are lightweight and do not affect performance significantly.
2. `performance.measure()` requires marks created with `performance.mark()`.
3. Measures are automatically timestamped based on mark positions.
4. Clearing marks and measures helps prevent memory buildup in long-running applications.
5. Can be combined with `PerformanceObserver` for real-time monitoring.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of performance marks as **bookmarks in a stopwatch**:
  - You mark start and end points in your code and then measure the time taken between them.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between performance.mark() and performance.now()?  
A1: `performance.mark()` creates a named timestamp; `performance.now()` returns a numeric timestamp relative to page load.

Q2: Can you measure multiple operations using marks?  
A2: Yes, create multiple start and end marks and use `performance.measure()` for each.

Q3: How do you clear performance marks and measures?  
A3: Use `performance.clearMarks(name)` and `performance.clearMeasures(name)`.

Q4: Can marks and measures be used in production?  
A4: Yes, they are lightweight and safe to use in production environments.

Q5: How is this useful in React or Next.js?  
A5: To profile component render times, API call durations, or layout updates for optimization.
*/
