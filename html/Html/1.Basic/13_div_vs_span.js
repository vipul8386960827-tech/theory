/* 13_div_vs_span

1. Definition
- <div>: A **block-level** container used to group content or elements. Primarily for layout and styling purposes.
- <span>: An **inline-level** container used to group text or inline elements for styling or scripting.

2. Key points to highlight
- Display behavior:
  - <div>: block → takes full width by default, starts on a new line.
  - <span>: inline → only takes width of content, flows within the line.
- Semantic meaning:
  - Neither <div> nor <span> has inherent semantic meaning.
  - Used mainly for styling (CSS) or scripting (JS hooks).
- Nesting rules:
  - <div> can contain block and inline elements.
  - <span> should only contain inline elements.
- Common use cases:
  - <div>: page sections, wrappers, layout containers.
  - <span>: styling parts of text, highlighting, inline scripts.

3. Example usage
<!-- Using <div> -->
<div class="container">
  <div class="header">Header Content</div>
  <div class="main">
    <p>Main content goes here</p>
  </div>
  <div class="footer">Footer Content</div>
</div>

<!-- Using <span> -->
<p>This is a <span style="color:red;">red text</span> inside a paragraph.</p>

4. Key differences summary
| Feature           | <div>             | <span>           |
|------------------|-----------------|----------------|
| Display          | Block            | Inline         |
| Default Width    | Full width       | Width of content |
| Semantic Meaning | None             | None           |
| Nesting          | Inline + Block   | Inline only    |
| Common Use       | Layout/sections  | Styling inline text |

5. XHTML notes
- Both <div> and <span> are required to be properly closed:
  <div>Content</div>
  <span>Text</span>

6. Follow-up interview questions
Q: Can you put a <div> inside a <span>?  
A: No, it's invalid — <span> can only contain inline elements.

Q: Can <span> be styled with CSS?  
A: Yes, commonly used for inline styling.

Q: Why choose <div> over <span>?  
A: When you need a block-level container or layout wrapper.

Q: Can <div> be used multiple times on a page?  
A: Yes, as many as needed for layout purposes.

Q: Are <div> and <span> semantic?  
A: No, use semantic tags like <section>, <article>, <header> when possible.
*/
