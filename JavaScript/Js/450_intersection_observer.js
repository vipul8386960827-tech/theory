/* 450_intersection_observer.js

=====================================================
IntersectionObserver API in JavaScript
=====================================================

Definition (What I should say in the interview):
- "The IntersectionObserver API allows you to **observe changes in the intersection of a target element with an ancestor element or viewport**. 
   It enables efficient lazy-loading of images, infinite scrolling, animations, and other behaviors based on element visibility without constantly polling or using scroll events."

-----------------------------------------------------
Key Features
-----------------------------------------------------
1. **IntersectionObserver Constructor**
   - `new IntersectionObserver(callback, options)` → Creates an observer.
   - `callback(entries, observer)` → Called when target visibility changes.
   - `options` → Object with properties:
     - `root` → The element used as viewport (default: `null` = browser viewport).
     - `rootMargin` → Margin around root (like CSS margin, e.g., "0px 0px 100px 0px").
     - `threshold` → Number or array (0–1) indicating percentage of target visibility to trigger callback.

2. **observe(target)**
   - Starts observing a target element.

3. **unobserve(target)**
   - Stops observing a target element.

4. **disconnect()**
   - Stops observing all targets.

-----------------------------------------------------
Basic Example
-----------------------------------------------------
const target = document.querySelector('#myElement');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Element is visible!');
      // Optionally stop observing
      observer.unobserve(entry.target);
    }
  });
}, {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
});

observer.observe(target);

-----------------------------------------------------
Use Cases
-----------------------------------------------------
- **Lazy-loading images/videos** when they enter the viewport.
- Triggering **animations** when elements become visible.
- **Infinite scrolling** by loading new content as user scrolls.
- Ad tracking or measuring **element visibility** in analytics.
- Optimizing performance by avoiding heavy scroll event listeners.

-----------------------------------------------------
Important Notes
-----------------------------------------------------
1. `isIntersecting` property indicates whether the target is visible in the root.
2. `intersectionRatio` shows percentage of target visible.
3. Efficient alternative to scroll events and polling.
4. Works with multiple targets observed by the same observer.
5. Can observe elements inside nested scrolling containers using `root`.

-----------------------------------------------------
Analogy
-----------------------------------------------------
- Think of IntersectionObserver as a **watcher on a window**:
  - You can see when objects (elements) enter your view and trigger actions without constantly checking manually.

-----------------------------------------------------
Follow-Up Interview Questions
-----------------------------------------------------
Q1: Difference between IntersectionObserver and scroll events?  
A1: IntersectionObserver is more efficient, event-driven, and avoids continuous polling like scroll events.

Q2: Can you observe multiple elements with one observer?  
A2: Yes, call `observe()` on multiple targets.

Q3: What does threshold 0.5 mean?  
A3: Callback triggers when 50% of the target is visible.

Q4: Can IntersectionObserver work with nested scrollable containers?  
A4: Yes, set the container as `root` in options.

Q5: How do you stop observing an element?  
A5: Use `unobserve(target)` or `disconnect()` to stop all observations.
*/
