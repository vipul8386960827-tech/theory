/* 273_form_validation_js.js

=====================================================
JavaScript Form Validation – Interview-Ready Answer
=====================================================

Definition:
- "Form validation in JavaScript is the process of checking user input 
  in HTML forms before submitting it to the server, ensuring data integrity, 
  correctness, and providing immediate feedback."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Prevent invalid or incomplete data from being submitted.  
   - Improve user experience by providing real-time feedback.  
   - Reduce server-side errors and unnecessary server requests.

2. **Types of Validation**  
   - **Client-Side Validation** → Using JavaScript before form submission.  
   - **Server-Side Validation** → Performed on the server for security.  
   - Client-side validation improves UX but should never replace server-side validation.

3. **Common Checks**  
   - Required fields (`not empty`)  
   - Correct format (email, phone, URL)  
   - Minimum/maximum length  
   - Matching passwords or confirmation fields  
   - Numeric ranges

-----------------------------------------------------
Examples:

// HTML Form
/*
<form id="signupForm">
  <input type="text" id="username" placeholder="Username">
  <input type="email" id="email" placeholder="Email">
  <input type="password" id="password" placeholder="Password">
  <button type="submit">Sign Up</button>
</form>

// JavaScript Validation
const form = document.getElementById('signupForm');

form.addEventListener('submit', function(event) {
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  
  let errors = [];

  if(username === '') errors.push('Username is required');
  if(email === '') errors.push('Email is required');
  else if(!/^\S+@\S+\.\S+$/.test(email)) errors.push('Email is invalid');
  if(password.length < 6) errors.push('Password must be at least 6 characters');

  if(errors.length > 0) {
    alert(errors.join('\n'));
    event.preventDefault(); // Prevent form submission
  }
});

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- Uses event listener for `submit`.  
- Validates each field with simple checks and regex for email.  
- Prevents submission using `event.preventDefault()` if errors exist.  
- Provides immediate feedback via alert (can be enhanced with inline messages).

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Like a receptionist checking forms before sending them to management to ensure all required fields are completed and correctly filled.

-----------------------------------------------------
Example / Usage:

// Inline feedback instead of alert
if(errors.length > 0){
  const errorDiv = document.getElementById('errors');
  errorDiv.innerHTML = errors.join('<br>');
  event.preventDefault();
}

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Should client-side validation replace server-side validation?  
A1: No, server-side validation is necessary for security.

Q2: What are common validation techniques in JS?  
A2: Required fields, regex patterns, length checks, matching fields.

Q3: How can you validate email in JS?  
A3: Using regex like `/^\S+@\S+\.\S+$/`.

Q4: How to handle real-time validation?  
A4: Using `input` or `change` event listeners for each field.

Q5: What is HTML5 built-in validation?  
A5: Using `required`, `pattern`, `min`, `max`, `type` attributes on input elements.
*/
