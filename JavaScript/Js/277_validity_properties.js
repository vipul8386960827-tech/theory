/* 277_validity_properties.js

=====================================================
Validity Properties in JavaScript – Interview-Ready Answer
=====================================================

Definition:
- "Validity properties are built-in read-only properties of form elements 
  that provide detailed information about whether the element's value 
  meets HTML5 constraint validation rules."

Key Points to Highlight:
- Purpose: Check specific validation rules programmatically. Customize behavior 
  and messages based on which constraint failed. Combine with checkValidity() 
  and reportValidity() for enhanced validation.
- Common Validity Properties (from ValidityState object):
  - valueMissing → true if required field is empty
  - typeMismatch → true if type is incorrect (email, URL, etc.)
  - patternMismatch → true if value does not match pattern
  - tooLong / tooShort → string length outside constraints
  - rangeUnderflow / rangeOverflow → numeric value outside min/max
  - stepMismatch → numeric value not matching step
  - badInput → value cannot be parsed correctly
  - customError → true if a custom validity message is set
  - valid → true if the element passes all constraints

Examples:

// HTML Form
// <form id="signupForm">
//   <input type="text" id="username" required minlength="3" placeholder="Username">
//   <input type="email" id="email" required placeholder="Email">
//   <button type="submit">Sign Up</button>
// </form>

// JavaScript
const username = document.getElementById('username');
const email = document.getElementById('email');

console.log(username.validity.valueMissing); // true if empty
console.log(email.validity.typeMismatch);    // true if invalid email
console.log(username.validity.valid);        // true if passes all constraints

Code Explanation:
- Each input has a validity property returning a ValidityState object.
- Properties allow fine-grained checks for different constraint violations.
- Can be used with setCustomValidity() for custom messages.

Real-Life Analogy:
- Like a checklist with multiple criteria; each property tells if a specific rule failed.

Example / Usage:

// Custom feedback based on validity
username.addEventListener('input', () => {
  if(username.validity.valueMissing) {
    username.setCustomValidity('Username cannot be empty');
  } else if(username.validity.tooShort) {
    username.setCustomValidity('Username too short');
  } else {
    username.setCustomValidity('');
  }
});

// Form submission check
const form = document.getElementById('signupForm');
form.addEventListener('submit', (e) => {
  if(!username.validity.valid || !email.validity.valid) {
    e.preventDefault();
    alert('Fix errors before submitting!');
  }
});

Follow-Up Interview Questions:
- Q1: Difference between valid and other validity properties?
  A1: valid is true only if all other constraints are satisfied.
- Q2: How to detect custom validation errors?
  A2: Using customError property.
- Q3: Are these properties writable?
  A3: No, they are read-only; use setCustomValidity() for custom messages.
- Q4: Can these be used with all input types?
  A4: Yes, all HTML5 input types support validity properties.
- Q5: How do they integrate with checkValidity()?
  A5: checkValidity() returns true if valid is true; otherwise false.
*/
