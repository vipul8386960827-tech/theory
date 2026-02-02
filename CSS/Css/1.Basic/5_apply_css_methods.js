/* 
5. Methods to Apply CSS to HTML:

There are **three main methods** to apply CSS to HTML elements:

1. **Inline CSS**:
   - Applied directly to the HTML element using the `style` attribute.
   - Syntax: <tag style="property: value; property: value;">
   - Example:
     <p style="color: red; font-size: 16px;">Hello World</p>
   - **Pros**: Quick, specific to the element.
   - **Cons**: Hard to maintain, not reusable, mixes content with style.

2. **Internal CSS (Embedded CSS)**:
   - Written inside a `<style>` tag within the `<head>` section of HTML.
   - Syntax:
     <head>
       <style>
         selector {
           property: value;
         }
       </style>
     </head>
   - Example:
     <style>
       p { color: blue; font-size: 18px; }
     </style>
   - **Pros**: Works for single pages, easy for page-specific styles.
   - **Cons**: Cannot be reused across multiple pages, can clutter HTML file.

3. **External CSS**:
   - CSS written in a separate `.css` file and linked using the `<link>` tag.
   - Syntax:
     <head>
       <link rel="stylesheet" href="styles.css">
     </head>
   - `styles.css`:
       p { color: green; font-size: 20px; }
   - **Pros**: Reusable across multiple pages, keeps HTML clean, allows caching.
   - **Cons**: Requires extra HTTP request (usually negligible).

**Summary**:
- **Inline** → use sparingly for specific overrides.
- **Internal** → use for single-page styling.
- **External** → best practice for multi-page projects and maintainable code.
*/
