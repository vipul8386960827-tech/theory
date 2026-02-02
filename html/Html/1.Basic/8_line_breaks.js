/* 8_line_breaks

1. Definition
Line breaks in HTML are created using the <br> tag.  
They force text to continue on the next line without creating a new paragraph.

2. Key points to highlight
- <br> is an inline, void element (no closing tag in HTML).
- Creates a simple line break inside the same paragraph or block.
- Unlike <p>, <br> does NOT add vertical spacing.
- Should NOT be overused for layout — use CSS (margin/padding) instead.
- Commonly used in:
  - Addresses
  - Poems/lyrics
  - Controlled text formatting
  - Form fields and labels

3. Example usage
<p>This is line one.<br>This is line two after a line break.</p>

4. Multiple line breaks
- Possible:
  <p>Line 1<br><br>Line 2</p>
- But discouraged → use CSS instead:
  p { margin-bottom: 20px; }

5. When to avoid <br>
- For layout spacing → use CSS.
- For separating content sections → use <p>, <div>, <section>.
- Avoid stacking <br> tags for visual gaps.

6. XHTML version (differences)
- Must be written as:
  <br />
- Must follow XML syntax rules (self-closing).

7. Follow-up interview questions
Q: Is <br> a block-level or inline element?  
A: Inline.

Q: When should you use <br> instead of <p>?  
A: Use <br> only when you want a line break within the same paragraph.

Q: Is <br> semantic?  
A: No — it is presentational only.

Q: In XHTML, why must <br> be written as <br />?  
A: XHTML follows XML rules, so empty elements must be explicitly closed.

Q: Why is using <br><br><br> bad practice?  
A: Because spacing should be controlled with CSS for cleaner, scalable layouts.

*/
