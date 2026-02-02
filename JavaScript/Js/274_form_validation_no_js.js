/* 274_form_validation_no_js.js

=====================================================
Form Validation Without JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Form validation without JavaScript leverages HTML5 built-in attributes 
  to ensure correct user input before form submission, providing basic client-side validation."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Validate input using browser-native functionality.  
   - Improve user experience without writing JavaScript.  
   - Reduces server-side invalid submissions but should still complement server validation.

2. **HTML5 Validation Attributes**  
   - `required` → Field must be filled.  
   - `type` → Enforces input type (email, number, url, etc.).  
   - `pattern` → Regex pattern for custom validation.  
   - `min` / `max` → Numeric range validation.  
   - `minlength` / `maxlength` → Text length constraints.  
   - `step` → Numeric increment validation.

-----------------------------------------------------
Examples:

<form id="signupForm">
  <input type="text" name="username" required minlength="3" placeholder="Username">
  <input type="email" name="email" required placeholder="Email">
  <input type="password" name="password" required minlength="6" placeholder="Password">
  <input type="number" name="age" min="18" max="100" placeholder="Age">
  <button type="submit">Sign Up</button>
</form>

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- `required` prevents empty fields.  
- `type="email"` validates correct email format.  
- `minlength`, `maxlength`, `min`, `max` provide additional constraints.  
- Browser automatically blocks invalid submissions and shows feedback.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Like a form with checkboxes and constraints already built into the paper form, 
  preventing incorrect entries before submitting.

-----------------------------------------------------
Example / Usage:

// Email validation
<input type="email" name="userEmail" required placeholder="Enter email">

// Pattern validation
<input type="text" pattern="[A-Za-z]{3,}" required placeholder="Only letters, min 3">

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Can HTML5 validation replace server-side validation?  
A1: No, server-side validation is mandatory for security.

Q2: How do browsers display validation errors?  
A2: Browser shows a tooltip or message near the invalid input.

Q3: Can you customize validation messages?  
A3: Yes, using `title` attribute or `setCustomValidity()` in JS if needed.

Q4: Are all input types supported by all browsers?  
A4: Most modern browsers support common types, but fallback may be needed for older browsers.

Q5: Can CSS style invalid inputs?  
A5: Yes, using `:invalid` and `:valid` pseudo-classes.
*/
