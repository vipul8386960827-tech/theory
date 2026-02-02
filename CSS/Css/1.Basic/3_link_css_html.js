/* 
3. How to Link CSS to HTML:

There are **three ways** to apply CSS to HTML:

1. **Inline CSS**:
   - CSS is applied directly inside the HTML element using the `style` attribute.
   - Example:
     <p style="color: red; font-size: 16px;">Hello World</p>
   - **Use Case**: Quick testing or very specific overrides.
   - **Drawback**: Hard to maintain, not reusable.

2. **Internal CSS (Embedded)**:
   - CSS is written inside a `<style>` tag within the `<head>` section of the HTML.
   - Example:
     <head>
       <style>
         p { color: blue; font-size: 18px; }
       </style>
     </head>
   - **Use Case**: Single-page styling, testing, or unique page-specific styles.
   - **Drawback**: Styles not reusable across multiple pages.

3. **External CSS**:
   - CSS is written in a separate `.css` file and linked using the `<link>` tag.
   - Example:
     <head>
       <link rel="stylesheet" href="styles.css">
     </head>
   - In `styles.css`:
       p { color: green; font-size: 20px; }
   - **Use Case**: Best practice for multiple pages, maintainability, and caching.
   - **Drawback**: Requires an additional HTTP request (though usually negligible).

Summary:
- **Best Practice**: Use external CSS for most styling.
- Inline and internal CSS are only for testing or page-specific tweaks.
*/
