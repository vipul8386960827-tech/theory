/*
====================================
LATEST HTML FEATURES / UPDATES
====================================

NOTE:
HTML doesn’t version like JS (ES6, ES2023 etc.)
It evolves continuously (HTML5 → living standard)

====================================

1. SEMANTIC TAGS (HTML5 CORE)
-----------------------------
- More meaningful structure

Tags:
<header>
<nav>
<main>
<section>
<article>
<footer>
<aside>

Benefits:
- Better SEO
- Better accessibility
- Cleaner code


2. <dialog> (MODAL BUILT-IN)
-----------------------------
- Native modal/dialog box (no JS library needed)

Example:
<dialog id="myDialog">
  Hello World
</dialog>

myDialog.showModal();

Benefits:
- Built-in modal support
- No custom popup logic needed


3. <details> & <summary>
------------------------
- Create collapsible sections

Example:
<details>
  <summary>Click me</summary>
  <p>Hidden content</p>
</details>

Benefits:
- No JS needed for toggle UI


4. LAZY LOADING (IMAGES & IFRAME)
---------------------------------
- Load content only when needed

Example:
<img src="image.jpg" loading="lazy" />

Benefits:
- Faster page load
- Better performance


5. <input> TYPES (ENHANCED FORMS)
---------------------------------
New useful types:
- email
- url
- number
- date
- range
- color

Example:
<input type="email" required />

Benefits:
- Built-in validation
- Better mobile UX


6. BUILT-IN FORM VALIDATION
---------------------------
- No JS needed for basic validation

Attributes:
- required
- minlength
- maxlength
- pattern

Example:
<input type="text" required minlength="3" />


7. <template> TAG
-----------------
- Store reusable HTML (not rendered initially)

Example:
<template id="card">
  <div>Card</div>
</template>

Benefits:
- Useful for dynamic rendering via JS


8. <slot> (WEB COMPONENTS)
--------------------------
- Used in custom components

Benefits:
- Component-based architecture (like React but native)


9. CONTENTEDITABLE
------------------
- Make any element editable

Example:
<div contenteditable="true">Edit me</div>

Benefits:
- Quick inline editing UI


10. DATA ATTRIBUTES
-------------------
- Store custom data in HTML

Example:
<div data-user-id="123"></div>

Access in JS:
element.dataset.userId


11. <picture> (RESPONSIVE IMAGES)
---------------------------------
- Load different images based on screen size

Example:
<picture>
  <source media="(max-width: 600px)" srcset="small.jpg">
  <img src="large.jpg">
</picture>

Benefits:
- Better responsive design


12. <progress> & <meter>
------------------------
- Built-in UI components

Example:
<progress value="70" max="100"></progress>

<meter value="0.6"></meter>


13. <mark>
----------
- Highlight text

Example:
<p>This is <mark>important</mark></p>


14. AUTOCOMPLETE & AUTOFILL
---------------------------
- Helps users fill forms faster

Example:
<input type="email" autocomplete="email" />


15. ACCESSIBILITY IMPROVEMENTS
------------------------------
- ARIA attributes

Example:
<button aria-label="Close"></button>

Benefits:
- Better support for screen readers


====================================
INTERVIEW SUMMARY (SHORT)
====================================
- HTML improvements focus on:
    1. Semantic structure
    2. Built-in UI components (<dialog>, <details>)
    3. Better forms & validation
    4. Performance (lazy loading)
    5. Accessibility & SEO

*/
