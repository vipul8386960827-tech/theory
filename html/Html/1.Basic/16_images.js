/* 16_images

1. Definition
Images in HTML are displayed using the <img> tag, which embeds pictures into webpages.  
They are important for visual content, illustrations, and enhancing user experience.

2. Key points to highlight
- <img> is a **void element** → does not have a closing tag.
- Required attribute:
  - src → URL/path of the image
- Important attributes:
  - alt → alternative text for accessibility and SEO
  - width, height → set image dimensions
  - title → tooltip on hover
  - loading="lazy" → delays loading offscreen images for performance
- Images should be optimized for web performance (size, format).
- Can be inline or styled as block via CSS.

3. Example usage
<!-- Basic image -->
<img src="logo.png" alt="Company Logo">

<!-- With width, height, and tooltip -->
<img src="photo.jpg" alt="Beautiful landscape" width="600" height="400" title="Landscape Photo">

<!-- Lazy loading -->
<img src="banner.jpg" alt="Website Banner" loading="lazy">

4. XHTML version (differences)
- Must be self-closed: <img src="logo.png" alt="Company Logo" />
- Attribute values must be quoted.
- Lowercase tag names recommended.

5. Best practices
- Always provide descriptive alt text for accessibility.
- Use appropriate image formats (JPEG, PNG, WebP, SVG).
- Avoid inline styles; use CSS for styling.
- Compress images to reduce page load time.
- Use responsive images with srcset for different screen sizes.

6. Follow-up interview questions
Q: Why is alt text important?  
A: Accessibility (screen readers), SEO, and fallback if the image fails to load.

Q: Difference between <img> and background-image in CSS?  
A: <img> is semantic and content-based; background-image is purely decorative.

Q: Can <img> contain other elements?  
A: No, it is a void element.

Q: What is lazy loading?  
A: Deferring image loading until the user scrolls near them, improving performance.

Q: How does responsive image loading work?  
A: Using srcset and sizes attributes to serve different images based on screen size and resolution.
*/
