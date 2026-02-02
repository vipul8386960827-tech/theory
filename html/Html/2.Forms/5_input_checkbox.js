/* 5_input_checkbox

1. Definition
The <input type="checkbox"> element in HTML is used to create **checkboxes**, which allow users to select **one or more options** from a set.

2. Key points to highlight
- Checkboxes can be selected independently; multiple checkboxes in the same group can be checked simultaneously.
- Common attributes:
  - name → groups checkboxes for form submission.
  - value → the value submitted if checked.
  - id → for associating labels.
  - checked → pre-selects a checkbox.
  - disabled → prevents selection.
- Labels improve accessibility and make the clickable area larger.
- Must be inside a <form> to submit data.

3. Example usage
<form action="/submit" method="post">
  <p>Select your hobbies:</p>
  <input type="checkbox" id="reading" name="hobbies" value="reading">
  <label for="reading">Reading</label><br>

  <input type="checkbox" id="traveling" name="hobbies" value="traveling" checked>
  <label for="traveling">Traveling</label><br>

  <input type="checkbox" id="gaming" name="hobbies" value="gaming">
  <label for="gaming">Gaming</label><br><br>

  <input type="submit" value="Submit">
</form>

4. XHTML version (differences)
- Input elements must be self-closed:
  <input type="checkbox" name="hobbies" value="reading" />
- Attribute values must be quoted.

5. Best practices
- Always use labels for checkboxes for accessibility.
- Use the same name for related checkboxes if submitting as an array.
- Avoid too many checkboxes to prevent clutter.
- Use the checked attribute for default selections.
- Validate selected options server-side for security.

6. Follow-up interview questions
Q: Can multiple checkboxes with the same name be selected?  
A: Yes, all checkboxes can be selected independently.

Q: Difference between checkbox and radio inputs?  
A: Checkbox allows multiple selections; radio allows only one per group.

Q: How to pre-select a checkbox?  
A: Use the checked attribute.

Q: How to group checkboxes semantically?  
A: Use <fieldset> and <legend> tags.

Q: Can checkboxes exist outside a form?  
A: Yes, but their values won’t be submitted without a form.
*/
