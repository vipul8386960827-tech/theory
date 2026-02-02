/* 275_constraint_validation_dom_methods.js

=====================================================
Constraint Validation DOM Methods – Interview-Ready Answer
=====================================================

Definition:
- "Constraint validation DOM methods are built-in JavaScript methods 
  and properties that allow programmatic access to HTML5 form validation, 
  enabling developers to check validity, show custom messages, and control form submission."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Enhance HTML5 form validation using JavaScript.  
   - Programmatically check if inputs are valid or invalid.  
   - Display custom validation messages and control submission.

2. **Common Methods & Properties**  
   - `checkValidity()` → Returns `true` if element passes all constraints.  
   - `reportValidity()` → Checks validity and shows browser's validation message.  
   - `setCustomValidity(message)` → Sets a custom validation message for the element.  
   - `validity` → Returns a `ValidityState` object with properties like `valueMissing`, `typeMismatch`, `patternMismatch`.

-----------------------------------------------------
Examples:

// HTML Form
/*
<form id="signupForm">
  <input type="text" id="username" required minlength="3" placeholder="Username">
  <input type="email" id="email" required placeholder="Email">
  <button type="submit">Sign Up</button>
</form>

const form = document.getElementById('signupForm');
const username = document.getElementById('username');
const email = document.getElementById('email');

form.addEventListener('submit', function(event) {
  if(!username.checkValidity()) {
    username.setCustomValidity('Username must be at least 3 characters');
    username.reportValidity();
    event.preventDefault();
  } else {
    username.setCustomValidity(''); // reset custom message
  }

  if(!email.checkValidity()) {
    email.reportValidity();
    event.preventDefault();
  }
});

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- `checkValidity()` returns boolean based on input constraints.  
- `reportValidity()` triggers the browser’s tooltip for invalid input.  
- `setCustomValidity()` allows custom error messages.  
- Combining these methods gives fine-grained control over form validation.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Like a teacher checking each field of a student form and marking errors with custom notes before submission.

-----------------------------------------------------
Example / Usage:

// Inline validation on input
username.addEventListener('input', () => {
  if(username.value.length < 3) {
    username.setCustomValidity('Must be at least 3 characters');
  } else {
    username.setCustomValidity('');
  }
});

// Checking form before submit
if(!form.checkValidity()) {
  form.reportValidity();
}

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: Difference between `checkValidity()` and `reportValidity()`?  
A1: `checkValidity()` only returns true/false, `reportValidity()` also shows messages.

Q2: Can `setCustomValidity()` override default HTML5 messages?  
A2: Yes, any non-empty string sets a custom message.

Q3: What is `ValidityState` object?  
A3: Provides detailed validation state (valueMissing, typeMismatch, etc.) for each input.

Q4: Can these methods be used for all input types?  
A4: Yes, most standard HTML5 input types support constraint validation.

Q5: Do these methods work in older browsers?  
A5: Only modern browsers fully support HTML5 constraint validation.
*/
