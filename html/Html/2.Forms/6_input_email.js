/* 6_input_email

1. Definition
The <input type="email"> element in HTML is used to create a field for **email addresses**.  
It provides built-in validation to ensure the input matches the email format.

2. Key points to highlight
- Browsers validate the input to follow the pattern `user@example.com`.
- Common attributes:
  - name → identifies the field for form submission.
  - id → for label association and JavaScript.
  - placeholder → hint text inside the field.
  - required → marks the field as mandatory.
  - value → default value.
  - multiple → allows entering multiple comma-separated emails.
  - maxlength → limits the number of characters.
  - readonly / disabled → prevents editing or submission.
- Can be styled with CSS.
- Should be inside a <form> for submission.

3. Example usage
<form action="/submit" method="post">
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" placeholder="Enter your email" required><br><br>

  <label for="emails">Multiple Emails:</label>
  <input type="email" id="emails" name="emails" placeholder="Enter emails" multiple><br><br>

  <input type="submit" value="Submit">
</form>

4. XHTML version (differences)
- Input elements must be self-closed:
  <input type="email" name="email" required />
- Attribute values must be quoted.

5. Best practices
- Always use labels for accessibility.
- Use required for mandatory email fields.
- Use multiple attribute if accepting more than one email.
- Combine with server-side validation for security.
- Use proper placeholder text to guide users.

6. Follow-up interview questions
Q: How does input type="email" validate the data?  
A: Browser checks if the input matches the email format (e.g., contains @ and domain).

Q: Can multiple emails be entered in one input?  
A: Yes, using the multiple attribute.

Q: Difference between input type="text" and type="email"?  
A: type="email" validates email format; type="text" accepts any text.

Q: How to make an email field mandatory?  
A: Use the required attribute.

Q: Is client-side validation enough for email input?  
A: No, server-side validation is also required for security.
*/
