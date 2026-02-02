/* 9_horizontal_rule

1. Definition
The horizontal rule element <hr> is used to create a thematic break (a visual divider) between sections of content.  
It renders a horizontal line across the page and indicates a shift in topic or section.

2. Key points to highlight
- <hr> is a **void element** (no closing tag).
- Represents a **semantic break**, not just a decorative line.
- Browsers render it as a horizontal line, but styling can change its appearance.
- Common use cases:
  - Separating article sections
  - Dividing content blocks
  - Creating a visual break in long text

3. Default behavior
- <hr> spans the width of its container.
- Typically has some margin above and below.
- Has a thin, grey line by default (browser-dependent).

4. Example usage
<p>Section 1 content...</p>
<hr>
<p>Section 2 content...</p>

5. Styling with CSS
hr {
  border: none;
  border-top: 2px solid black;
  width: 50%;
  margin: 20px auto;
}

6. What to remember
- DO NOT use <hr> as a layout tool → use CSS borders/divs for custom designs.
- <hr> is a semantic element → indicates a topic or section shift.
- Avoid excessive use, or it makes pages look cluttered.

7. XHTML version (differences)
- Must be written as:
  <hr />
- Must follow XML syntax.
- Same meaning and rendering as HTML.

8. Follow-up interview questions
Q: Is <hr> a block-level or inline element?  
A: Block-level.

Q: Is <hr> semantic or decorative?  
A: Semantic — it indicates a thematic break in content.

Q: Can <hr> be styled?  
A: Yes, with CSS (borders, color, width, thickness, margins).

Q: Should we use <hr> to create thick colored lines or dividers?  
A: Not recommended — use a styled <div> for full design control.

Q: What happens if we use <hr/> in HTML5?  
A: It works the same — HTML5 accepts both <hr> and <hr/> for compatibility.

*/
