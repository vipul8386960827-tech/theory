/*
=====================================
Using <label> Element in React
=====================================

Definition:
In React, the <label> element is used to provide accessible labels 
for form inputs. Associating a label with an input improves usability 
and accessibility, especially for screen readers.

-------------------------------------
Key Points:
-------------------------------------
- Use the `htmlFor` attribute in React instead of `for` (since `for` 
  is a reserved keyword in JavaScript).  
- Clicking on the label focuses the associated input.  
- Enhances accessibility by connecting the label to the input field.  
- Works with text inputs, checkboxes, radios, and other form elements.

-------------------------------------
Example 1: Text Input Label
-------------------------------------
function TextInput() {
  return (
    <div>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" name="username" />
    </div>
  );
}

-------------------------------------
Example 2: Checkbox with Label
-------------------------------------
function AcceptTerms() {
  return (
    <div>
      <input type="checkbox" id="terms" />
      <label htmlFor="terms">I accept the terms and conditions</label>
    </div>
  );
}

-------------------------------------
Example 3: Wrapping Input Inside Label
-------------------------------------
function EmailInput() {
  return (
    <label>
      Email:
      <input type="email" name="email" />
    </label>
  );
}
// Note: Wrapping input inside label removes the need for htmlFor.

-------------------------------------
Real-Life Analogy:
-------------------------------------
Using <label> is like putting a name tag 🏷️ on a form field — it tells 
users and assistive technologies what the field represents.

-------------------------------------
Possible Follow-Up Q&A:
-------------------------------------
Q1: Why use htmlFor instead of for in React?
A1: `for` is a reserved JavaScript keyword; React uses `htmlFor` to avoid conflicts.

Q2: Can you wrap input inside <label> instead of using htmlFor?
A2: Yes, this automatically associates the label with the input.

Q3: Does label improve accessibility?
A3: Yes, screen readers read the label when the user focuses on the input.

Q4: Can <label> be used with custom components?
A4: It can, but the custom component must correctly forward the ref to the actual input.

Q5: What happens if you forget htmlFor and don’t wrap the input?
A5: The label won’t be associated with the input; clicking the label won’t focus the input.
*/
