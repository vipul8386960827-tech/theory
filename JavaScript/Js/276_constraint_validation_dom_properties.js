/* 276_constraint_validation_dom_properties.js

=====================================================
Constraint Validation DOM Properties – Interview-Ready Answer
=====================================================

Definition:
- "Constraint validation DOM properties are built-in properties on form elements 
  that provide information about the validity state of the element, enabling 
  developers to programmatically check and respond to form validation constraints."

-----------------------------------------------------
Key Points to Highlight:
-----------------------------------------------------
1. **Purpose**  
   - Access validity information of form elements.  
   - Customize form behavior based on input validity.  
   - Combine with methods like `checkValidity()` and `reportValidity()` for full control.

2. **Common Properties**  
   - `validity` → Returns a `ValidityState` object with boolean flags:  
     - `valueMissing` → true if required field is empty  
     - `typeMismatch` → true if type (email, url) is incorrect  
     - `patternMismatch` → true if input doesn't match `pattern`  
     - `tooLong` / `tooShort` → input exceeds limits  
     - `rangeUnderflow` / `rangeOverflow` → number outside `min`/`max`  
     - `stepMismatch` → number doesn't match step value  
     - `badInput` → wrong input type (e.g., text in number field)  
     - `valid` → true if element passes all constraints  
   - `willValidate` → true if element is subject to validation

-----------------------------------------------------
Examples:

// HTML Form
/*
<form id="signupForm">
  <input type="text" id="username" required minlength="3" placeholder="Username">
  <input type="email" id="email" required placeholder="Email">
  <button type="submit">Sign Up</button>
</form>

const username = document.getElementById('username');
const email = document.getElementById('email');

console.log(username.validity.valueMissing); // true if empty
console.log(email.validity.typeMismatch);    // true if invalid email
console.log(username.validity.valid);        // true if passes all constraints

// Check if element will be validated
console.log(username.willValidate); // true

-----------------------------------------------------
Code Explanation:
-----------------------------------------------------
- `validity` gives detailed state for each input constraint.  
- `willValidate` checks if input participates in form validation.  
- Can be combined with `checkValidity()` to handle form submission dynamically.

-----------------------------------------------------
Real-Life Analogy:
-----------------------------------------------------
- Like a checklist for each field: each property tells if a specific rule is violated.

-----------------------------------------------------
Example / Usage:

// Conditional styling based on validity
username.addEventListener('input', () => {
  if(!username.validity.valid) {
    username.style.borderColor = 'red';
  } else {
    username.style.borderColor = 'green';
  }
});

// Programmatically prevent submission if invalid
const form = document.getElementById('signupForm');
form.addEventListener('submit', (e) => {
  if(!username.validity.valid || !email.validity.valid) {
    e.preventDefault();
    alert('Please fix errors before submitting.');
  }
});

-----------------------------------------------------
Follow-Up Interview Questions:
-----------------------------------------------------
Q1: What is the difference between `checkValidity()` and `validity`?  
A1: `checkValidity()` returns a boolean for all constraints; `validity` provides detailed flags.

Q2: Can `willValidate` ever be false?  
A2: Yes, for disabled inputs, inputs with `novalidate`, or type `hidden`.

Q3: How do you combine `validity` with custom messages?  
A3: Use `setCustomValidity()` based on specific `validity` flags.

Q4: Are `validity` properties read-only?  
A4: Yes, they reflect current state and cannot be modified directly.

Q5: Can `validity` handle pattern-based validation?  
A5: Yes, `patternMismatch` indicates if the input doesn't match the `pattern` attribute.
*/
