/* 162_change_html_style.js

=====================================================
Changing HTML Element Styles in JavaScript
=====================================================

Definition:
- You can modify the visual appearance of HTML elements
  by changing their CSS styles using JavaScript.

-----------------------------------------------------
Common Scenarios:
-----------------------------------------------------

1. Using `style` Property
   - Access inline styles directly.
   - Example:
     const elem = document.getElementById("myDiv");
     elem.style.color = "red";
     elem.style.backgroundColor = "yellow";

2. Using `classList`
   - Add, remove, or toggle CSS classes.
   - Example:
     const elem = document.getElementById("myDiv");
     elem.classList.add("active");
     elem.classList.remove("hidden");
     elem.classList.toggle("highlight");

3. Using `setAttribute`
   - Modify the `style` attribute as a string.
   - Example:
     const elem = document.getElementById("myDiv");
     elem.setAttribute("style", "color: blue; font-size: 20px;");

4. Changing Multiple Styles Dynamically
   - Example:
     const elem = document.getElementById("myDiv");
     const styles = { color: "green", fontWeight: "bold" };
     Object.assign(elem.style, styles);

-----------------------------------------------------
Analogy:
-----------------------------------------------------
- Changing styles is like **painting or decorating a room**:
  - You can change colors, add furniture (classes), or modify layout dynamically.

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between `style` and `classList`?
A1: `style` changes inline styles directly; `classList` changes CSS classes for better maintainability.

Q2: Can you change pseudo-elements using JavaScript?
A2: Not directly; you can modify their styles via CSS rules or style sheets.

Q3: Difference between `setAttribute("style", ...)` and `style.property`?
A3: `setAttribute` replaces the entire inline style; `style.property` changes specific styles.

Q4: Can you animate styles using JavaScript?
A4: Yes, using `element.style` with transitions or using libraries like GSAP.

Q5: Is `classList.toggle` useful for UI interactions?
A5: Yes, it allows adding/removing classes for effects like menus, modals, and highlights.
*/
