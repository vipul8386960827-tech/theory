/* 19_lists_description

1. Definition
Description lists in HTML are created using the <dl> (description list) tag.  
They are used to display a list of **terms and their descriptions**, like glossaries or FAQ lists.

2. Key points to highlight
- <dl> contains pairs of <dt> (definition term) and <dd> (definition description) tags.
- Each <dt> represents a term.
- Each <dd> represents the description/details for the preceding <dt>.
- Nested <dl> structures are allowed for complex definitions.
- Useful for key-value pairs, glossaries, questions and answers.

3. Example usage
<!-- Basic description list -->
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language, used for structuring web pages.</dd>

  <dt>CSS</dt>
  <dd>Cascading Style Sheets, used for styling web pages.</dd>

  <dt>JavaScript</dt>
  <dd>Programming language for dynamic and interactive web content.</dd>
</dl>

<!-- Nested description list -->
<dl>
  <dt>Fruits</dt>
  <dd>
    <dl>
      <dt>Apple</dt>
      <dd>Red or green sweet fruit.</dd>
      <dt>Banana</dt>
      <dd>Yellow elongated fruit.</dd>
    </dl>
  </dd>
</dl>

4. XHTML version (differences)
- All <dl>, <dt>, and <dd> tags must be properly closed.
- Example:
<dl>
  <dt>Term</dt>
  <dd>Definition</dd>
</dl>

5. Best practices
- Use <dl> when representing **term-description pairs**.
- Keep <dt> concise and meaningful.
- Avoid using <dl> for regular lists — use <ul> or <ol> instead.
- Use CSS for styling instead of using tables for key-value layouts.

6. Follow-up interview questions
Q: Can a <dt> have multiple <dd> elements?  
A: Yes, multiple descriptions can be associated with a single term.

Q: Can <dl> contain <li>?  
A: No, <dl> uses <dt> and <dd>, not <li>.

Q: When should we use <dl> over <ul> or <ol>?  
A: When displaying definitions, terms with explanations, or key-value pairs.

Q: Are <dl>, <dt>, and <dd> block-level elements?  
A: Yes, they are block-level by default.

Q: How does <dl> improve accessibility?  
A: Screen readers can announce term-description pairs clearly, helping users understand structured data.
*/
