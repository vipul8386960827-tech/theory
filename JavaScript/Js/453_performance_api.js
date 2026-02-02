/* 453_performance_api.js

=====================================================
Performance API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "The Performance API provides a set of high-resolution, accurate **timing methods** to measure the performance of web applications. 
   It allows developers to analyze how long operations take, measure navigation, resource loading, and custom code execution, 
   helping to optimize speed and responsiveness."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **performance.now()**
   - Returns a timestamp in milliseconds with **sub-millisecond precision** relative to page load.
   - Useful for measuring execution time of specific code blocks.

2. **Performance Marks and Measures**
   - `performance.mark(name)` → Creates a timestamp mark.
   - `performance.measure(name, startMark, endMark)` → Measures duration between two marks.
   - `performance.getEntriesByType('measure')` → Retrieves measured entries.

3. **Navigation and Resource Timing**
   - `performance.timing` → Deprecated; use `PerformanceNavigationTiming`.
   - `performance.getEntriesByType('resource')` → Get detailed resource load timings.
   - Helps identify slow-loading assets or bottlenecks.

4. **PerformanceObserver**
   - Observe performance events asynchronously (e.g., long tasks, resource timing, frame rendering).

-----------------------------------------------------
Basic Example
-----------------------------------------------------
// Using performance.now()
const start = performance.now();
for (let i = 0; i < 1e6; i++) {}
const end = performance.now();
console.log(`Loop took ${end - start} milliseconds.`);

// Using marks and measures
performance.mark('startTask');
// ... code execution ...
performance.mark('endTask');
performance.measure('taskDuration', 'startTask', 'endTask');

const measures = performance.getEntriesByType('measure');
measures.forEach(m => console.log(`${m.name}: ${m.duration}ms`));

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Measuring execution time of JavaScript functions or blocks.
- Monitoring page load, resource fetch, and rendering performance.
- Profiling long tasks or animations.
- Detecting bottlenecks in web applications.
- Integrating with analytics to improve user experience.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. `performance.now()` is more accurate than `Date.now()` for measuring short intervals.
2. Performance API does not affect performance significantly and is safe for production.
3. Supports custom markers and measures for detailed profiling.
4. Can observe multiple types of performance entries via `PerformanceObserver`.
5. Useful in React, Next.js, or other frameworks to optimize component rendering and network requests.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of Performance API as a **high-precision stopwatch**:
  - You can measure exactly how long every operation or resource takes to execute or load.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between performance.now() and Date.now()?  
A1: `performance.now()` provides sub-millisecond precision relative to page load; `Date.now()` has lower precision and is relative to epoch.

Q2: How do you measure custom code execution time?  
A2: Use `performance.mark()` and `performance.measure()` to mark start and end points and calculate duration.

Q3: Can Performance API help optimize page load?  
A3: Yes, it provides detailed insights into resource loading and code execution times.

Q4: What is PerformanceObserver used for?  
A4: It asynchronously monitors performance-related events like long tasks, resource timings, or frame rendering.

Q5: Is the Performance API synchronous or asynchronous?  
A5: Methods like `performance.now()` and `mark()` are synchronous; `PerformanceObserver` events are asynchronous.
*/
