/*
89_submit_form.js – Interview-Ready Answer

"In JavaScript, submitting a form can be handled either by the default HTML 
behavior or by using JavaScript to intercept and process the submission 
programmatically."

Key Points:

1️⃣ Definition:
- HTML form submission: browser sends form data to server and reloads page.
- JavaScript form handling: prevents default behavior to process data via AJAX or other logic.
- Commonly used with addEventListener('submit', callback) and event.preventDefault().

2️⃣ Syntax Example:

// HTML
<form id="myForm">
    <input type="text" name="username" placeholder="Enter username" />
    <button type="submit">Submit</button>
</form>

// JavaScript
const form = document.getElementById('myForm');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent page reload
    const username = form.username.value;
    console.log('Form submitted. Username:', username);
    // process data via fetch/AJAX here
});

3️⃣ Real-Life Analogies:

Global Analogy: Filling a paper form but handing it to a digital assistant instead of posting it physically.
India-specific Analogy: Filling an Aadhaar update form online and submitting without visiting the office.
Web Analogy: Intercepting a contact form submission to send data via API without page reload.

4️⃣ Code Explanation:

- event.preventDefault() stops default browser submission.
- Access form fields via form.elements or directly via name.
- Allows validation, async processing, or dynamic feedback before sending data.

5️⃣ Example / Usage:

// Validate form before sending
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = form.username.value.trim();
    if (!username) {
        alert('Username cannot be empty!');
        return;
    }
    console.log('Valid submission:', username);
    // send data via fetch/AJAX
});

6️⃣ Follow-Up Interview Questions:

Q1: Difference between form submit with and without JavaScript?  
A1: Without JS, browser reloads page; with JS, you can process data asynchronously.

Q2: What does event.preventDefault() do?  
A2: Prevents default browser behavior (like page reload on form submission).

Q3: How to submit a form programmatically?  
A3: Use form.submit() method, bypassing submit event listeners.

Q4: Can you attach multiple submit listeners?  
A4: Yes, all listeners will execute in order unless stopPropagation is used.

Q5: Why handle form submission in JS?  
A5: For validation, AJAX submission, dynamic user feedback, and SPA behavior.
*/
