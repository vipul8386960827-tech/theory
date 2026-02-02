/* 455_performance_measure.js

=====================================================
Performance Measure in JavaScript
=====================================================

Definition (What I should say in the interview):
- "Performance measures are part of the Performance API that allow developers to **calculate the duration between two performance marks** or timestamps. 
   They are used for profiling, monitoring, and optimizing web application performance by measuring specific code execution times."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **performance.measure(name, startMark, endMark)**
   - Creates a measurement entry representing the duration between `startMark` and `endMark`.
   - `name` → Identifier for the measurement.
   - `startMark` → Name of the starting mark or numeric timestamp (optional, defaults to navigationStart).
   - `endMark` → Name of the ending mark or numeric timestamp (optional, defaults to now).

2. **Retrieving Measures**
   - `performance.getEntriesByType('measure')` → Retrieves all measure entries.
   - `performance.getEntriesByName('measureName')` → Retrieves specific measure entries.
   - `performance.clearMeasures(name)` → Clears measures by name.

3. **Integration with Marks**
   - Often used with `performance.mark()` for start and end points.
   - Allows precise measurement of custom code execution or component rendering.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
performance.mark('startTask');

// Code execution simulation
for (let i = 0; i < 1e6; i++) {}

performance.mark('endTask');

performance.measure('taskDuration', 'startTask', 'endTask');

const measures = performance.getEntriesByType('measure');
measures.forEach(m => console.log(`${m.name}: ${m.duration}ms`));
// Logs: taskDuration: <duration>ms

// Clear measures
performance.clearMeasures('taskDuration');

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Profiling JavaScript function or block execution times.
- Measuring React or Next.js component render durations.
- Comparing performance before and after code optimization.
- Tracking API request durations in web apps.
- Monitoring animations or rendering updates for performance tuning.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. If `startMark` or `endMark` are not provided, defaults are `navigationStart` and `performance.now()`.
2. Measures are stored in the performance entry buffer and can be retrieved via `getEntriesByType`.
3. Clearing measures prevents memory accumulation in long-running applications.
4. Measures are precise and suitable for performance-critical profiling.
5. Can be combined with `PerformanceObserver` for automated monitoring.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of performance measure as a **lap timer**:
  - You mark the start and end of a code section and then calculate how long that "lap" took.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between performance.mark() and performance.measure()?  
A1: `mark()` creates a timestamp; `measure()` calculates the duration between two marks.

Q2: Can you use numeric timestamps instead of marks in performance.measure()?  
A2: Yes, you can provide numeric timestamps for start and end.

Q3: How do you retrieve specific performance measures?  
A3: Use `performance.getEntriesByName('measureName')`.

Q4: How is this useful in React or Next.js?  
A4: To measure component render times, API call durations, or code block execution for optimization.

Q5: How do you clean up performance measures?  
A5: Use `performance.clearMeasures(name)` to remove specific measures.
*/
