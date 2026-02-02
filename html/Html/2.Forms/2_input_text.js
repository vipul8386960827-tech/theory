/* 2_input_text

1. Definition
The <input type="text"> element in HTML is used to create a **single-line text field** where users can enter text input.

2. Key points to highlight
- It is an inline element and must be inside a <form> for submission.
- Common attributes:
  - name → identifies the field for form submission.
  - id → for label association and JavaScript.
  - value → sets default text.
  - placeholder → displays hint text inside the field.
  - required → marks the field as mandatory.
  - maxlength → limits the number of characters.
  - readonly → prevents editing.
  - disabled → prevents editing and submission.
- Can be styled with CSS for width, borders, font, and color.

3. Example usage
<form action="/submit" method="post">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" placeholder="Enter your username" required maxlength="20"><br><br>

  <label for="email">Email:</label>
  <input type="text" id="email" name="email" placeholder="Enter your email"><br><br>

  <input type="submit" value="Submit">
</form>

4. XHTML version (differences)
- Input elements must be self-closed:
  <input type="text" name="username" />
- Attribute values must be quoted.

5. Best practices
- Use proper placeholder text to guide users.
- Validate user input using HTML attributes or JavaScript.
- Avoid long default values that may confuse users.
- Use labels for accessibility.
- Prefer specific input types (email, number) instead of generic text for better validation.

6. Follow-up interview questions
Q: Difference between placeholder and value attributes?  
A: Placeholder shows hint text when empty; value sets the default actual value of the field.

Q: Can input type="text" have a maximum length?  
A: Yes, using the maxlength attribute.

Q: How to make a text field mandatory?  
A: Use the required attribute.

Q: Difference between readonly and disabled?  
A: readonly → cannot edit but can submit; disabled → cannot edit and will not be submitted.

Q: How can you style a text input?  
A: Using CSS properties like width, padding, border, font-size, color, background-color, etc.
*/
