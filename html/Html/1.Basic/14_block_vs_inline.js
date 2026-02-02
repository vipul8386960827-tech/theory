/* 14_block_vs_inline

1. Definition
- **Block-level elements**: Elements that occupy the **full width** of their parent container and start on a **new line**.
- **Inline elements**: Elements that occupy only the **width of their content** and flow **within the same line** as other content.

2. Key points to highlight
- Layout behavior:
  - Block: starts on a new line, height and width can be set.
  - Inline: flows with text, width and height generally ignored.
- Common block-level elements:
  - <div>, <p>, <h1>-<h6>, <section>, <article>, <header>, <footer>, <form>, <ul>, <li>
- Common inline elements:
  - <span>, <a>, <strong>, <em>, <img>, <code>, <abbr>, <label>, <input>
- CSS display property can override:
  - `display: block` → make inline element behave like block.
  - `display: inline` → make block element behave like inline.
- Nesting rules:
  - Block elements can contain block and inline elements.
  - Inline elements should only contain inline elements (no block elements inside).

3. Example usage
<!-- Block elements -->
<div>
  <h1>Block Element Example</h1>
  <p>This paragraph is a block element.</p>
</div>

<!-- Inline elements -->
<p>This is a <span style="color:red;">red text</span> inside a paragraph with <a href="#">a link</a>.</p>

4. Key differences summary
| Feature                | Block                | Inline               |
|------------------------|--------------------|--------------------|
| Line behavior          | New line            | Same line           |
| Width                  | Full width          | Width of content    |
| Height                 | Can set height      | Cannot set height easily |
| Common tags            | <div>, <p>, <h1>   | <span>, <a>, <strong> |
| Nesting                | Can contain both    | Only inline         |

5. Follow-up interview questions
Q: Can inline elements be made block using CSS?  
A: Yes, with `display: block`.

Q: Can block elements be made inline using CSS?  
A: Yes, with `display: inline`.

Q: Why is it important to know block vs inline?  
A: Helps in layout design, controlling spacing, and proper styling.

Q: Can inline elements contain block elements?  
A: No, it is invalid in HTML.

Q: Are semantic elements block or inline by default?  
A: Most semantic elements (<section>, <article>, <header>, <footer>) are block-level by default.
*/
