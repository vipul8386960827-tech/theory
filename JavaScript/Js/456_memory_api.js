/* 456_memory_api.js

=====================================================
Memory API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "The Memory API provides **information about the memory usage** of a JavaScript environment, primarily in browsers. 
   It helps developers understand heap usage, JavaScript object allocation, and memory pressure, which is useful for performance optimization and avoiding memory leaks."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **performance.memory** (Chrome-specific)
   - Provides memory usage metrics.
   - Properties include:
     - `jsHeapSizeLimit` → Maximum heap size allocated for JS.
     - `totalJSHeapSize` → Total allocated heap size.
     - `usedJSHeapSize` → Currently used heap size.

2. **Monitoring memory usage**
   - Can be used to detect memory leaks during development.
   - Useful for applications with large datasets, complex UI, or long-running processes.

3. **Browser Support**
   - Mostly supported in Chrome-based browsers.
   - Not standardized across all browsers.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
if (performance.memory) {
  console.log('JS Heap Size Limit:', performance.memory.jsHeapSizeLimit);
  console.log('Total JS Heap Size:', performance.memory.totalJSHeapSize);
  console.log('Used JS Heap Size:', performance.memory.usedJSHeapSize);
} else {
  console.log('Memory API not supported in this browser.');
}

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Detecting memory leaks in web applications.
- Monitoring memory consumption of React or Next.js components.
- Optimizing performance for single-page applications.
- Profiling memory-heavy operations like large array manipulations or canvas rendering.
- Debugging memory usage in browser development tools.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. `performance.memory` is **not standard**; mainly available in Chrome and Chromium-based browsers.
2. Values are approximations and may vary due to garbage collection.
3. Should be used primarily for development and debugging.
4. No direct way to manipulate memory via this API.
5. Helps in understanding JS heap usage and potential optimization areas.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of the Memory API as a **fuel gauge for JavaScript memory**:
  - It shows how much memory your application is using and how close it is to the maximum available.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Can you rely on performance.memory in all browsers?  
A1: No, it is primarily supported in Chrome and Chromium-based browsers.

Q2: What does usedJSHeapSize indicate?  
A2: The current amount of memory used by JavaScript objects.

Q3: Can you manipulate memory using this API?  
A3: No, it only provides metrics, not control.

Q4: How is this useful in React or Next.js?  
A4: Helps detect memory leaks in components and optimize heavy computations or data processing.

Q5: What is jsHeapSizeLimit?  
A5: Maximum allowed heap size for JavaScript execution in the current browser environment.
*/
