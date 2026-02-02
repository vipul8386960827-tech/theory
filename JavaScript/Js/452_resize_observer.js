/* 452_resize_observer.js

=====================================================
ResizeObserver API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "The ResizeObserver API allows you to **observe changes in the size of elements**. 
   It is particularly useful for responsive layouts, dynamic components, or monitoring element resizing without relying on window resize events, enabling efficient and reactive UI adjustments."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **ResizeObserver Constructor**
   - `new ResizeObserver(callback)` → Creates an observer.
   - `callback(entries, observer)` → Called when observed elements are resized.
   - `entries` is an array of `ResizeObserverEntry` objects containing `contentRect` with size info.

2. **observe(target, options)**
   - Starts observing the specified element.
   - `options` is currently rarely used; target element is the primary parameter.

3. **unobserve(target)**
   - Stops observing a specific element.

4. **disconnect()**
   - Stops observing all elements.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const box = document.getElementById('myBox');

const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    const { width, height } = entry.contentRect;
    console.log(`Element resized: ${width}px x ${height}px`);
  }
});

resizeObserver.observe(box);

// To stop observing
// resizeObserver.unobserve(box);
// resizeObserver.disconnect();

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- Responsive component layout adjustments.
- Dynamic resizing of charts, canvases, or video elements.
- Detecting size changes for animations or UI updates.
- Replacing manual polling of element sizes.
- Useful in React, Next.js, or other frameworks for auto-adjusting components.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. ResizeObserver is more efficient than listening to window resize events for individual elements.
2. Observes content box size, not margins or borders.
3. Call `disconnect()` to free resources when observer is no longer needed.
4. Multiple elements can be observed with the same observer instance.
5. Observes asynchronously and batches resize notifications for performance.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of ResizeObserver as a **smart ruler** attached to elements:
  - It alerts you whenever the element changes size, so your UI can adapt automatically.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between ResizeObserver and window resize events?  
A1: ResizeObserver observes individual elements efficiently; window resize events only detect viewport changes and may require additional calculations.

Q2: Can ResizeObserver observe multiple elements?  
A2: Yes, call `observe()` on multiple targets.

Q3: What property gives the element’s size?  
A3: `entry.contentRect` contains `width` and `height`.

Q4: Is ResizeObserver synchronous?  
A4: No, it notifies asynchronously and batches updates for performance.

Q5: Where is ResizeObserver commonly used?  
A5: Responsive design, dynamic components, charts, canvases, and layout monitoring in modern web applications.
*/
