/* 278_rangeoverflow_example.js

=====================================================
rangeOverflow Validity Property – Interview-Ready Answer
=====================================================

Definition:
- "The `rangeOverflow` property of the `ValidityState` object is true 
  when the value of a form input exceeds the maximum allowed value specified 
  by the `max` attribute."

Key Points to Highlight:
- Purpose: Detect when a numeric input is larger than its `max` constraint.
- Applicable to: `<input type="number">`, `<input type="range">`
- Read-only property, part of the `validity` object.

Examples:

// HTML Form
// <input type="number" id="age" max="100" placeholder="Enter age">

const ageInput = document.getElementById('age');

ageInput.addEventListener('input', () => {
  if(ageInput.validity.rangeOverflow) {
    console.log('Value exceeds maximum allowed!');
    ageInput.setCustomValidity('Maximum allowed age is 100');
  } else {
    ageInput.setCustomValidity('');
  }
});

Code Explanation:
- `ageInput.validity.rangeOverflow` returns true if input > max.
- `setCustomValidity()` sets a custom validation message.

Real-Life Analogy:
- Like filling a glass that can only hold 100ml; pouring more triggers an alert.

Example / Usage:

// Check validity on form submission
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  if(ageInput.validity.rangeOverflow) {
    e.preventDefault();
    alert('Please enter a valid age (<=100).');
  }
});

Follow-Up Interview Questions:
- Q1: What triggers rangeOverflow?
  A1: Input value > max attribute.
- Q2: Is rangeOverflow true for non-numeric inputs?
  A2: No, only numeric or range types.
- Q3: Can you programmatically set rangeOverflow?
  A3: No, it’s read-only; you can set max attribute or use setCustomValidity.
- Q4: Difference between rangeOverflow and tooLong?
  A4: rangeOverflow → numeric value too high; tooLong → string length exceeds maxlength.
- Q5: How to handle both underflow and overflow?
  A5: Check validity.rangeUnderflow and validity.rangeOverflow together.
*/
