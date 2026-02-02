/* 460_perf_hooks_node.js

=====================================================
Performance Hooks in Node.js
=====================================================

Definition (What I should say in the interview):
- "The `perf_hooks` module in Node.js provides APIs to **measure the performance of applications**. 
   It allows developers to track execution time, create custom performance marks and measures, and monitor performance bottlenecks in both synchronous and asynchronous code."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **performance object**
   - `performance.now()` → Returns a high-resolution timestamp (in milliseconds) relative to an arbitrary point.
   - `performance.mark(name)` → Creates a named timestamp.
   - `performance.measure(name, startMark, endMark)` → Measures duration between marks.

2. **PerformanceEntry**
   - Represents a single performance measurement.
   - Properties: `name`, `entryType`, `startTime`, `duration`.

3. **PerformanceObserver**
   - Observes performance entry events in real-time.
   - Can subscribe to `measure`, `mark`, or `gc` events.
   - Useful for logging and automated monitoring.

4. **Garbage Collection Tracking**
   - `perf_hooks.constants.NODE_PERFORMANCE_GC_*` → Track GC events like minor, major, incremental, and weak collections.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const { performance, PerformanceObserver } = require('perf_hooks');

const obs = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach(entry => console.log(`${entry.name}: ${entry.duration}ms`));
});

obs.observe({ entryTypes: ['measure'], buffered: true });

performance.mark('startTask');

for (let i = 0; i < 1e6; i++) {} // Simulated task

performance.mark('endTask');

performance.measure('taskDuration', 'startTask', 'endTask');

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Measuring execution time of Node.js functions and blocks.
- Profiling CPU-intensive operations or asynchronous flows.
- Tracking performance of API requests in web servers.
- Monitoring garbage collection events for optimization.
- Debugging and benchmarking application performance.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. `performance.now()` is more precise than `Date.now()`.
2. Performance marks and measures can be observed in real-time using `PerformanceObserver`.
3. GC tracking helps identify memory-related bottlenecks.
4. Can be used in combination with async operations for profiling.
5. Supports both synchronous and asynchronous code measurement.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of Node.js perf_hooks as a **high-precision stopwatch and logger**:
  - You can mark start/end points, measure duration, and observe performance metrics in real-time.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between performance.now() and Date.now()?  
A1: `performance.now()` is high-resolution, more precise, and monotonic, while `Date.now()` is less precise and affected by system clock changes.

Q2: How do you measure custom code performance?  
A2: Use `performance.mark()` to set start/end points and `performance.measure()` to calculate duration.

Q3: What is PerformanceObserver used for?  
A3: Observing performance entry events (marks, measures, GC events) in real-time.

Q4: Can perf_hooks track garbage collection events?  
A4: Yes, using performance constants and PerformanceObserver.

Q5: How is perf_hooks useful in asynchronous Node.js applications?  
A5: Allows precise measurement of async task durations and monitoring of performance bottlenecks across event loop cycles.
*/
