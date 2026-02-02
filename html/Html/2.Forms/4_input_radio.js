/* 4_input_radio

1. Definition
The <input type="radio"> element in HTML is used to create **radio buttons**, which allow users to select **one option** from a group of choices.

2. Key points to highlight
- Radio buttons with the **same name attribute** are grouped together.
- Only one button in a group can be selected at a time.
- Common attributes:
  - name → groups radio buttons together.
  - value → the value submitted if selected.
  - id → for label association.
  - checked → makes a radio button selected by default.
  - disabled → prevents selection.
- Must be inside a <form> for submission.
- Labels improve accessibility and make the clickable area larger.

3. Example usage
<form action="/submit" method="post">
  <p>Select your gender:</p>
  <input type="radio" id="male" name="gender" value="male">
  <label for="male">Male</label><br>

  <input type="radio" id="female" name="gender" value="female">
  <label for="female">Female</label><br>

  <input type="radio" id="other" name="gender" value="other" checked>
  <label for="other">Other</label><br><br>

  <input type="submit" value="Submit">
</form>

4. XHTML version (differences)
- Input elements must be self-closed:
  <input type="radio" name="gender" value="male" />
- Attribute values must be quoted.

5. Best practices
- Always use labels with radio buttons for accessibility.
- Use the same name attribute to group related options.
- Provide a default selection using checked when appropriate.
- Avoid using too many radio buttons in a group to prevent clutter.
- Combine with server-side validation to ensure proper data handling.

6. Follow-up interview questions
Q: Can multiple radio buttons with the same name be selected?  
A: No, only one can be selected at a time.

Q: What is the difference between radio and checkbox inputs?  
A: Radio → single selection per group; Checkbox → multiple selections allowed.

Q: Why should radio buttons have labels?  
A: Improves accessibility and usability.

Q: Can radio buttons exist outside a form?  
A: Yes, but they won’t be submitted without a form.

Q: How to pre-select a radio button?  
A: Use the checked attribute on the desired radio input.
*/
