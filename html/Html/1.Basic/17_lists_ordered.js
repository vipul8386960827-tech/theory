/* 17_lists_ordered

1. Definition
Ordered lists in HTML are created using the <ol> tag.  
They display items in a **specific sequence**, usually numbered automatically by the browser.

2. Key points to highlight
- <ol> is a **block-level container**.
- Contains list items using the <li> tag.
- Default numbering is decimal (1, 2, 3…).
- Types of numbering can be changed using the `type` attribute:
  - type="1" → numbers (default)
  - type="A" → uppercase letters
  - type="a" → lowercase letters
  - type="I" → uppercase Roman numerals
  - type="i" → lowercase Roman numerals
- Nested <ol> is allowed for sublists.
- CSS can also be used to customize numbering style.

3. Example usage
<!-- Basic ordered list -->
<ol>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ol>

<!-- Ordered list with letters -->
<ol type="A">
  <li>Option A</li>
  <li>Option B</li>
</ol>

<!-- Nested ordered list -->
<ol>
  <li>Item 1
    <ol type="i">
      <li>Subitem i</li>
      <li>Subitem ii</li>
    </ol>
  </li>
  <li>Item 2</li>
</ol>

4. XHTML version (differences)
- All <li> tags must be properly closed.
- Attributes must be quoted.
- Example:
<ol type="1">
  <li>First</li>
  <li>Second</li>
</ol>

5. Best practices
- Use ordered lists only when sequence matters.
- Avoid using <ol> for non-sequential items — use <ul> instead.
- Keep list items concise and meaningful.
- For accessibility, screen readers announce the order automatically.

6. Follow-up interview questions
Q: Can <ol> contain other <ol> lists?  
A: Yes, nested lists are allowed.

Q: What happens if you skip the type attribute?  
A: Default numbering is decimal (1, 2, 3…).

Q: Can <ol> contain block-level elements inside <li>?  
A: Yes, <li> can contain block-level content like <p>, <div>, <section>.

Q: How does <ol> improve accessibility?  
A: Screen readers announce the sequence of items, helping users understand order.

Q: How can CSS customize list numbering?  
A: Using properties like `list-style-type`, `counter-increment`, and `counter-reset`.
*/
