/* 20_tables_basic

1. Definition
Tables in HTML are created using the <table> tag to display data in **rows and columns**.  
They are used for tabular data, such as spreadsheets, schedules, and comparisons.

2. Key points to highlight
- Core elements:
  - <table> → container for the table
  - <tr> → table row
  - <td> → table cell (data)
  - <th> → table header cell (bold and centered by default)
- Optional elements:
  - <thead> → groups header rows
  - <tbody> → groups body rows
  - <tfoot> → groups footer rows
- Tables should be used for data, not layout.

3. Example usage
<!-- Basic table -->
<table border="1">
  <tr>
    <th>Item</th>
    <th>Quantity</th>
    <th>Price</th>
  </tr>
  <tr>
    <td>Apples</td>
    <td>10</td>
    <td>$5</td>
  </tr>
  <tr>
    <td>Bananas</td>
    <td>6</td>
    <td>$3</td>
  </tr>
</table>

4. XHTML version (differences)
- All tags must be properly closed:
  <table>
    <tr>
      <th>Header</th>
    </tr>
  </table>
- Attribute values must be quoted.
- Example: <td>Data</td>

5. Best practices
- Use <th> for header cells for semantic meaning.
- Use <caption> for table title/description.
- Avoid using tables for layout purposes.
- Use CSS for styling (borders, colors, spacing).

6. Follow-up interview questions
Q: Difference between <td> and <th>?  
A: <th> is a header cell (bold, centered, semantic), <td> is a normal data cell.

Q: What is the purpose of <thead>, <tbody>, <tfoot>?  
A: To group table rows semantically for structure and styling.

Q: Can tables contain other tables?  
A: Yes, nested tables are allowed but should be used carefully.

Q: How do you make a table accessible?  
A: Use <th> for headers, scope attributes, captions, and proper row/column structure.

Q: Should tables be used for page layout?  
A: No, use CSS layout techniques instead.
*/
