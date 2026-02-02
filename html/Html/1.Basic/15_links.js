/* 15_links

1. Definition
Links in HTML are created using the <a> (anchor) tag and allow users to navigate to another page, resource, or location within the same page.

2. Key points to highlight
- Syntax: <a href="URL">Link Text</a>
- The href attribute defines the target URL.
- Links can be:
  - Absolute: full URL (e.g., https://example.com)
  - Relative: relative to current location (e.g., page2.html)
  - Anchor: link to a section within the same page (e.g., #section1)
  - Email: mailto link (e.g., mailto:info@example.com)
- Optional attributes:
  - target="_blank" → opens in a new tab/window
  - rel="noopener noreferrer" → recommended when using target="_blank"
  - title="Description" → tooltip for accessibility
  - download → downloads the linked file
- Accessible links should have meaningful text; avoid "click here".
- Links can contain inline elements like <span>, <strong>, <em>, or images.

3. Example usage
<!-- Absolute URL -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Visit Example</a>

<!-- Relative URL -->
<a href="about.html">About Us</a>

<!-- Anchor link -->
<a href="#contact">Go to Contact Section</a>

<!-- Email link -->
<a href="mailto:info@example.com">Email Us</a>

<!-- Download link -->
<a href="files/report.pdf" download>Download Report</a>

4. XHTML version (differences)
- Must close the <a> tag properly.
- Attribute values must be quoted.
- Example: <a href="about.html">About Us</a>

5. Follow-up interview questions
Q: What is the difference between absolute and relative URLs?  
A: Absolute URLs specify the full path (domain + path); relative URLs are relative to the current page location.

Q: Why use rel="noopener noreferrer" with target="_blank"?  
A: To prevent security risks and performance issues from the new tab accessing the opener page.

Q: Can links contain block elements?  
A: No, only inline elements or phrasing content.

Q: How to make links accessible?  
A: Use descriptive text, ARIA labels if needed, and avoid vague text like "click here".

Q: How does SEO benefit from proper links?  
A: Search engines crawl and index pages better when links are meaningful and structured correctly.
*/
