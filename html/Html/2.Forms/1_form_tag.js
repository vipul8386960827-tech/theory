/* 1_form_tag

1. Definition
The <form> tag in HTML is used to create a form for **user input** that can be sent to a server for processing.  
Forms can include text fields, checkboxes, radio buttons, submit buttons, and more.

2. Key points to highlight
- The <form> element acts as a container for input elements.
- Common attributes:
  - action → URL to which the form data is sent.
  - method → HTTP method for sending data: "get" or "post".
  - enctype → encoding type for the data ("application/x-www-form-urlencoded", "multipart/form-data", "text/plain").
  - target → specifies where to display the response (e.g., _blank, _self).
- Forms can be styled with CSS and validated with JavaScript.
- Input elements must have name attributes to send data.

3. Example usage
<!-- Basic form -->
<form action="/submit" method="post">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" required><br><br>

  <label for="email">Email:</label>
  <input type="email" id="email" name="email"><br><br>

  <input type="submit" value="Submit">
</form>

4. XHTML version (differences)
- All input elements must be properly closed:
  <input type="text" name="username" />
- Attribute values must be quoted.
- Example:
<form action="/submit" method="post">
  <input type="text" name="username" />
</form>

5. Best practices
- Always use labels with form inputs for accessibility.
- Use the `required` attribute for mandatory fields.
- Use proper input types (email, number, password, etc.) for validation.
- Avoid using forms for layout purposes.
- Sanitize and validate form data on the server side.

6. Follow-up interview questions
Q: Difference between GET and POST in forms?  
A: GET appends data to URL, limited size, not secure. POST sends data in request body, larger and secure.

Q: Why use labels with input fields?  
A: Improves accessibility; clicking the label focuses the input.

Q: What does enctype="multipart/form-data" do?  
A: Allows file uploads via <input type="file">.

Q: Can forms be nested?  
A: No, nested forms are invalid in HTML.

Q: How do you prevent default form submission in JavaScript?  
A: Use event.preventDefault() in the submit event handler.
*/
