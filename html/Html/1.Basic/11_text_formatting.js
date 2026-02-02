/* 11_text_formatting

DEFINITION:
Text formatting tags in HTML are used to style or emphasize inline text within a document. 
These tags change the appearance or meaning of the text.

COMMON TEXT FORMATTING TAGS:

1. <b>...</b>  
   - Makes text bold (visual only, no semantic meaning).

2. <strong>...</strong>  
   - Strong importance (bold + semantic meaning for screen readers).

3. <i>...</i>  
   - Italic text (visual only).

4. <em>...</em>  
   - Emphasized text (italic + semantic meaning).

5. <u>...</u>  
   - Underlined text.

6. <mark>...</mark>  
   - Highlights text (yellow background by default).

7. <small>...</small>  
   - Renders text smaller.

8. <sub>...</sub>  
   - Subscript text (e.g., H₂O).

9. <sup>...</sup>  
   - Superscript text (e.g., E = mc²).

10. <del>...</del>  
    - Displays deleted text with a strikethrough.

11. <ins>...</ins>  
    - Displays inserted text with underline.

12. <code>...</code>  
    - Renders text in monospace font for code fragments.

KEY POINTS:
- `<strong>` and `<em>` should be preferred over `<b>` and `<i>` for accessibility.
- These tags are inline elements.
- They should be used when styling is meaningful to the content.
- For general styling, CSS is preferred rather than excessive formatting tags.

EXAMPLE:
<p>This is <strong>important</strong> and this is <em>emphasized</em>.</p>
<p>CO<sub>2</sub> + H<sub>2</sub>O → O<sup>2</sup></p>
<p>Here is some <code>inline code</code>.</p>

FOLLOW-UP QUESTIONS:
1. What is the difference between semantic and non-semantic formatting?
2. Should we use `<b>` or `<strong>` in modern HTML?
3. Are formatting tags block-level or inline-level?
4. Why do developers prefer CSS for styling instead of HTML formatting tags?
*/
