/* 173_window_size_properties.js

=====================================================
Window Size Properties in JavaScript
=====================================================

Definition:
- JavaScript provides properties to get the size of the browser window.
- Useful for responsive layouts, dynamic UI adjustments, or canvas sizing.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Using `window.innerWidth` and `window.innerHeight`
   - Gives viewport size including scrollbars.
   - Example:
     console.log("Width:", window.innerWidth);
     console.log("Height:", window.innerHeight);

2. Using `document.documentElement.clientWidth` and `clientHeight`
   - Gives viewport size excluding scrollbars.
   - Example:
     const width = document.documentElement.clientWidth;
     const height = document.documentElement.clientHeight;
     console.log("Width:", width, "Height:", height);

3. Listening to Resize Events
   - Example:
     window.addEventListener("resize", () => {
         console.log("Resized to:", window.innerWidth, window.innerHeight);
     });

4. Using `screen.width` and `screen.height`
   - Gives total screen dimensions, not just browser window.
   - Example:
     console.log("Screen Width:", screen.width);
     console.log("Screen Height:", screen.height);

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Window size properties are like **measuring a picture frame**:
  - You know exactly how much space you have to fit your content.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between `innerWidth` and `clientWidth`?
A1: `innerWidth` includes scrollbars; `clientWidth` excludes scrollbars.

Q2: Does `screen.width` change when window resizes?
A2: No, it gives physical screen size, not viewport size.

Q3: How to handle responsive changes dynamically?
A3: Use resize events and adjust UI elements or CSS accordingly.

Q4: Can these properties be affected by zoom level?
A4: `innerWidth` and `clientWidth` may change with zoom; `screen.width` remains the same.

Q5: Are there cross-browser considerations?
A5: Modern browsers mostly agree; older IE may differ slightly.
*/
