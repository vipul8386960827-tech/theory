/* 3_input_password

1. Definition
The <input type="password"> element in HTML is used to create a **single-line text field** where user input is masked (hidden) for security, typically used for passwords.

2. Key points to highlight
- Characters are displayed as dots or asterisks.
- Common attributes:
  - name → identifies the field for form submission.
  - id → for label association and JavaScript.
  - value → default value (not recommended for passwords for security reasons).
  - placeholder → hint text inside the field.
  - required → marks the field as mandatory.
  - maxlength → limits the number of characters.
  - readonly → prevents editing.
  - disabled → prevents editing and submission.
- Should be used inside a <form> for submission.
- Can be styled with CSS for width, borders, font, and color.

3. Example usage
<form action="/submit" method="post">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" required><br><br>

  <label for="password">Password:</label>
  <input type="password" id="password" name="password" placeholder="Enter your password" required maxlength="20"><br><br>

  <input type="submit" value="Login">
</form>

4. XHTML version (differences)
- Input elements must be self-closed:
  <input type="password" name="password" />
- Attribute values must be quoted.

5. Best practices
- Always use HTTPS to submit password fields securely.
- Avoid pre-filling password fields.
- Use required and maxlength attributes for basic validation.
- Use labels for accessibility.
- Combine with server-side validation for security.

6. Follow-up interview questions
Q: What is the difference between input type="text" and type="password"?  
A: type="password" masks the input; type="text" shows plain text.

Q: Can you style the masking character?  
A: No, the browser handles masking; CSS can style the field, not the bullets.

Q: Should password values be prefilled in HTML?  
A: No, for security reasons.

Q: How to make a password field mandatory?  
A: Use the required attribute.

Q: Are password inputs secure on their own?  
A: No, secure transmission (HTTPS) and proper server handling are required.
*/
