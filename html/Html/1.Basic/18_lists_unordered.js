/* 18_lists_unordered

1. Definition
Unordered lists in HTML are created using the <ul> tag.  
They display items in **no particular order**, usually with bullets.

2. Key points to highlight
- <ul> is a **block-level container**.
- Contains list items using the <li> tag.
- Default bullet style can be changed with CSS or the `type` attribute (HTML4).
- Nested <ul> lists are allowed to create sublists.
- Commonly used for menus, features lists, or any list where sequence does not matter.

3. Example usage
<!-- Basic unordered list -->
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

<!-- Nested unordered list -->
<ul>
  <li>Fruits
    <ul>
      <li>Apple</li>
      <li>Banana</li>
    </ul>
  </li>
  <li>Vegetables</li>
</ul>

4. Styling with CSS
ul {
  list-style-type: disc; /* disc, circle, square, none 
  padding-left: 20px;
}

li {
  margin-bottom: 5px;
}

5. XHTML version (differences)
- All <li> tags must be properly closed.
- Example:
<ul>
  <li>Item A</li>
  <li>Item B</li>
</ul>

6. Best practices
- Use <ul> for items where order does not matter.
- Avoid using <ul> purely for layout — use CSS instead.
- Keep list items concise and meaningful.
- Accessible lists should have proper semantic structure for screen readers.

7. Follow-up interview questions
Q: Can <ul> contain other <ul> or <ol> inside <li>?  
A: Yes, nested lists are allowed.

Q: Difference between <ul> and <ol>?  
A: <ul> → unordered bullets, <ol> → numbered/sequenced items.

Q: How do you change bullet style?  
A: Using CSS `list-style-type` property (disc, circle, square, none).

Q: Can <ul> contain block-level elements?  
A: Yes, <li> can contain block-level content like <p>, <div>, <section>.

Q: How does <ul> improve accessibility?  
A: Screen readers identify it as a list, helping users navigate content effectively.
*/
