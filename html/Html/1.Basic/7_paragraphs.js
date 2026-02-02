/* 7_paragraphs

1. Definition
A paragraph in HTML is represented using the <p> tag and is used to group blocks of text into readable sections.  
It is one of the most commonly used elements for text content on webpages.

2. Key points to highlight
- <p> is a block-level element.
- Automatically adds margin (space) above and below the paragraph.
- Cannot contain other block-level elements inside it (e.g., <div>, <section>).
- Can contain inline elements like <span>, <strong>, <em>, <a>.
- Browsers automatically close a <p> tag if another block element starts.
- Creates semantic structure — important for readability and accessibility.

3. Example usage
<p>This is a paragraph of text on a webpage.</p>

<p>
  You can include <strong>bold text</strong>, 
  <em>italic text</em>, or 
  <a href="#">links</a> inside a paragraph.
</p>

4. Critical behaviors to remember
- Writing multiple lines inside <p> does NOT create multiple paragraphs.
- For line breaks inside the same paragraph, use <br>.
- For spacing, avoid using multiple <br> — use CSS margin or padding instead.
- Nested <p> tags are invalid: <p><p>text</p></p> ❌

5. XHTML version (differences)
- <p> must always be closed:
  <p>This is a paragraph.</p>
- All inline elements inside must follow XML rules.
- <br /> must be self-closed.
- Whitespace handling remains the same.

6. Follow-up interview questions
Q: Can a <p> tag contain another <p> tag?  
A: No, it's invalid HTML — the browser auto-closes the first <p> before starting the second.

Q: What is the difference between <p> and <br>?  
A: <p> creates a new paragraph block; <br> creates a line break within the same paragraph.

Q: Is <p> a semantic element?  
A: Yes, it represents a block of text content.

Q: What replaces <p> in semantic HTML for sections?  
A: Nothing replaces <p>; but <section>, <article>, <aside>, and <main> wrap larger content blocks.

Q: Why shouldn’t we use <br><br> for spacing?  
A: It's bad practice — layout should be handled with CSS margins/padding.

*/
